import { useSyncExternalStore } from "react";

export type CartLine = { productId: string; colour: string; quantity: number };

const STORAGE_KEY = "kinetic.cart";
const listeners = new Set<() => void>();
let cached: CartLine[] | undefined;
const EMPTY: CartLine[] = [];

function read(): CartLine[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getCart(): CartLine[] {
  if (cached === undefined) cached = read();
  return cached;
}

function write(lines: CartLine[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  cached = undefined;
  listeners.forEach((l) => l());
}

export function addToCart(productId: string, colour: string) {
  const lines = [...getCart()];
  const existing = lines.find((l) => l.productId === productId && l.colour === colour);
  if (existing) existing.quantity += 1;
  else lines.push({ productId, colour, quantity: 1 });
  write(lines.map((l) => ({ ...l })));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useCartCount(): number {
  const lines = useSyncExternalStore(subscribe, getCart, () => EMPTY);
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}
