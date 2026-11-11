import { useSyncExternalStore } from "react";
import { z } from "zod";

/**
 * Placeholder authentication: any well-formed email + password signs in.
 * The session lives in localStorage so it survives reloads in this browser.
 */
export type Session = { name: string; email: string; signedInAt: string };

const STORAGE_KEY = "kinetic.session";
const listeners = new Set<() => void>();
let cached: Session | null | undefined;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Please enter your email address." })
    .max(255, { message: "Email must be under 255 characters." })
    .email({ message: "That doesn't look like a valid email — try name@example.com." }),
  password: z
    .string()
    .min(1, { message: "Please enter your password." })
    .max(128, { message: "Password must be under 128 characters." }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const words = local
    .split(/[._\-+]+/)
    .filter(Boolean)
    .map((w) => w.replace(/\d+/g, ""))
    .filter(Boolean);
  if (words.length === 0) return "Athlete";
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

function read(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    return parsed && typeof parsed.email === "string" ? parsed : null;
  } catch {
    return null;
  }
}

export function getSession(): Session | null {
  if (cached === undefined) cached = read();
  return cached;
}

function emit() {
  cached = undefined;
  listeners.forEach((l) => l());
}

export function signIn(input: LoginInput, name?: string): Session {
  const email = input.email.trim().toLowerCase();
  const session: Session = {
    email,
    name: name?.trim() || nameFromEmail(email),
    signedInAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  emit();
  return session;
}

export function signOut() {
  window.localStorage.removeItem(STORAGE_KEY);
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Server render and first client render both see "signed out", then the real state. */
export function useSession(): Session | null {
  return useSyncExternalStore(subscribe, getSession, () => null);
}
