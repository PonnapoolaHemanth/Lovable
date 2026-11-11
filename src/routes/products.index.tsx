import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { products } from "@/lib/products";
import { ProductCard } from "@/components/store/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Shop sports gear — Kinetic Sports" },
      {
        name: "description",
        content: "Running shoes, footballs, yoga mats, tennis rackets, helmets and more sports gear.",
      },
      { property: "og:title", content: "Shop sports gear — Kinetic Sports" },
      {
        property: "og:description",
        content: "Running shoes, footballs, yoga mats, tennis rackets, helmets and more sports gear.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

const ALL = "All sports";

function ProductsPage() {
  const sports = useMemo(() => [ALL, ...Array.from(new Set(products.map((p) => p.sport)))], []);
  const [sport, setSport] = useState(ALL);
  const visible = sport === ALL ? products : products.filter((p) => p.sport === sport);

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="flex flex-col gap-2">
        <p className="eyebrow text-primary">Sports collection</p>
        <h1 className="text-4xl font-bold uppercase sm:text-6xl">Gear for every game</h1>
        <p className="max-w-xl text-muted-foreground">
          Hand-picked kit for running, court, field, pool and trail — tested by athletes, priced for everyone.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by sport">
        {sports.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSport(s)}
            aria-pressed={sport === s}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
              sport === s
                ? "border-ink bg-ink text-ink-foreground"
                : "bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {s}
          </button>
        ))}
        <span className="ml-auto text-sm text-muted-foreground">
          {visible.length} {visible.length === 1 ? "product" : "products"}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((p, i) => (
          <div key={p.id} className="animate-rise" style={{ animationDelay: `${i * 40}ms` }}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
