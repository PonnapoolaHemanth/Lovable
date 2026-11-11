import { beforeEach, describe, expect, it } from "vitest";

import { getSession, loginSchema, nameFromEmail, signIn, signOut } from "@/lib/auth";
import { canAddToCart, formatPrice, products, stockLabel } from "@/lib/products";

describe("login validation", () => {
  it("requires an email", () => {
    const r = loginSchema.safeParse({ email: "", password: "secret" });
    expect(r.success).toBe(false);
  });
  it("rejects a malformed email", () => {
    const r = loginSchema.safeParse({ email: "runner@", password: "secret" });
    expect(r.success).toBe(false);
  });
  it("requires a password", () => {
    const r = loginSchema.safeParse({ email: "runner@example.com", password: "" });
    expect(r.success).toBe(false);
  });
  it("accepts a valid email and password", () => {
    const r = loginSchema.safeParse({ email: "runner@example.com", password: "secret" });
    expect(r.success).toBe(true);
  });
});

describe("placeholder session", () => {
  beforeEach(() => window.localStorage.clear());
  it("stores the signed-in state and clears it on log out", () => {
    signIn({ email: "alex.morgan@example.com", password: "x" });
    expect(getSession()?.email).toBe("alex.morgan@example.com");
    signOut();
    expect(getSession()).toBeNull();
  });
  it("derives a display name from the email", () => {
    expect(nameFromEmail("alex.morgan@example.com")).toBe("Alex Morgan");
  });
});

describe("catalogue rules", () => {
  it("lists exactly 10 products", () => {
    expect(products).toHaveLength(10);
  });
  it("has at least one product out of stock", () => {
    expect(products.some((p) => p.stock === 0)).toBe(true);
  });
  it("shows 'Out of stock' at zero units and the unit count otherwise", () => {
    expect(stockLabel(0)).toBe("Out of stock");
    expect(stockLabel(12)).toBe("12 units available");
  });
  it("blocks add to cart only when stock is zero", () => {
    expect(canAddToCart({ stock: 0 })).toBe(false);
    expect(canAddToCart({ stock: 1 })).toBe(true);
  });
  it("formats prices as rupees", () => {
    expect(formatPrice(7499)).toBe("₹7,499");
  });
});
