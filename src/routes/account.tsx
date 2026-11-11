import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { LogOut, MapPin, Package, Trophy } from "lucide-react";

import { getSession, signOut, useSession } from "@/lib/auth";
import { formatPrice, getProduct } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/store/ProductImage";

export const Route = createFileRoute("/account")({
  // The placeholder session lives in the browser, so check it only on the client.
  ssr: false,
  beforeLoad: () => {
    if (!getSession()) throw redirect({ to: "/", replace: true });
  },
  head: () => ({
    meta: [
      { title: "My account — Kinetic Sports" },
      { name: "description", content: "Your Kinetic profile and past sports-equipment orders." },
      { property: "og:title", content: "My account — Kinetic Sports" },
      { property: "og:description", content: "Your Kinetic profile and past sports-equipment orders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

const sampleOrders = [
  {
    id: "KN-24817",
    date: "28 Oct 2026",
    status: "Delivered",
    items: [
      { productId: "velocity-pro-running-shoes", colour: "Ember Orange", qty: 1 },
      { productId: "rapidspin-skipping-rope", colour: "Black / Orange", qty: 1 },
    ],
  },
  {
    id: "KN-23402",
    date: "14 Sep 2026",
    status: "Delivered",
    items: [{ productId: "flowgrip-yoga-mat", colour: "Sage", qty: 1 }],
  },
  {
    id: "KN-21955",
    date: "02 Aug 2026",
    status: "Returned",
    items: [{ productId: "court-king-basketball", colour: "Classic Orange", qty: 2 }],
  },
];

function AccountPage() {
  const session = useSession() ?? getSession();
  const navigate = useNavigate();

  if (!session) return null;

  const initials = session.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const memberSince = new Date(session.signedInAt).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  function handleSignOut() {
    signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <p className="eyebrow text-primary">My account</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Hi, {session.name.split(" ")[0]}</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[22rem_1fr]">
        <aside className="h-fit rounded-xl border bg-card p-6 shadow-card">
          <div className="flex items-center gap-4">
            <span className="grid size-16 place-items-center rounded-full bg-ink font-display text-2xl font-bold text-ink-foreground">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold">{session.name}</p>
              <p className="truncate text-sm text-muted-foreground">{session.email}</p>
            </div>
          </div>

          <dl className="mt-6 space-y-3 border-t pt-5 text-sm">
            <div className="flex items-start gap-3">
              <Trophy className="mt-0.5 size-4 text-primary" />
              <div>
                <dt className="font-semibold">Favourite sports</dt>
                <dd className="text-muted-foreground">Running, Yoga, Basketball</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-primary" />
              <div>
                <dt className="font-semibold">Delivery city</dt>
                <dd className="text-muted-foreground">Kolkata, West Bengal</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="mt-0.5 size-4 text-primary" />
              <div>
                <dt className="font-semibold">Member since</dt>
                <dd className="text-muted-foreground">{memberSince}</dd>
              </div>
            </div>
          </dl>

          <p className="mt-5 rounded-md bg-muted p-3 text-sm text-muted-foreground">
            Weekend runner and court regular, training for a first half marathon this winter.
          </p>

          <Button variant="outline" className="mt-5 w-full" onClick={handleSignOut}>
            <LogOut /> Log out
          </Button>
        </aside>

        <section aria-labelledby="orders-heading">
          <div className="flex items-end justify-between">
            <h2 id="orders-heading" className="text-2xl font-bold uppercase">
              Past orders
            </h2>
            <Link to="/products" className="text-sm font-semibold text-primary hover:underline">
              Shop more gear
            </Link>
          </div>

          <ul className="mt-4 space-y-4">
            {sampleOrders.map((order) => {
              const lines = order.items
                .map((it) => ({ ...it, product: getProduct(it.productId) }))
                .filter((l) => l.product);
              const total = lines.reduce((sum, l) => sum + l.product!.price * l.qty, 0);
              return (
                <li key={order.id} className="overflow-hidden rounded-xl border bg-card shadow-card">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/60 px-5 py-3 text-sm">
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      <span>
                        <span className="text-muted-foreground">Order </span>
                        <span className="font-semibold">{order.id}</span>
                      </span>
                      <span className="text-muted-foreground">{order.date}</span>
                      <span className="font-semibold">{formatPrice(total)}</span>
                    </div>
                    <span
                      className={
                        order.status === "Delivered"
                          ? "rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success"
                          : "rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"
                      }
                    >
                      {order.status}
                    </span>
                  </div>
                  <ul className="divide-y">
                    {lines.map((l) => (
                      <li key={l.productId} className="flex items-center gap-4 px-5 py-3">
                        <div className="w-14 shrink-0 overflow-hidden rounded-md">
                          <ProductImage src={l.product!.image} alt={l.product!.name} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link
                            to="/products/$productId"
                            params={{ productId: l.productId }}
                            className="font-semibold hover:text-primary"
                          >
                            {l.product!.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {l.colour} · Qty {l.qty}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">{formatPrice(l.product!.price * l.qty)}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
