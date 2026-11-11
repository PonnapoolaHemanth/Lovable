import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, ShoppingBag, Truck, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { canAddToCart, formatPrice, getProduct } from "@/lib/products";
import { addToCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/store/ProductImage";
import { Rating } from "@/components/store/Rating";
import { StockStatus } from "@/components/store/StockStatus";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Kinetic Sports" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} — Kinetic Sports`;
    return {
      meta: [
        { title },
        { name: "description", content: product.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: product.summary },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="text-4xl font-bold">Product not found</h1>
      <p className="mt-2 text-muted-foreground">That item isn't in our sports collection.</p>
      <Button asChild className="mt-6">
        <Link to="/products">Back to products</Link>
      </Button>
    </div>
  ),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const [colour, setColour] = useState(product.colours[0]?.name ?? "");
  const available = canAddToCart(product);

  function handleAdd() {
    if (!available) return;
    addToCart(product.id, colour);
    toast.success(`${product.name} added to cart`, { description: `Colour: ${colour}` });
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All products
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* 1. Item image */}
        <div className="overflow-hidden rounded-xl border shadow-card lg:sticky lg:top-24 lg:self-start">
          <ProductImage src={product.image} alt={product.name} eager />
        </div>

        <div className="flex flex-col animate-rise">
          <p className="eyebrow text-primary">{product.sport}</p>
          {/* 2. Item name */}
          <h1 className="mt-1 text-4xl font-bold leading-none sm:text-5xl">{product.name}</h1>

          {/* 3. Price */}
          <p className="mt-5 font-display text-4xl font-bold" aria-label={`Price ${formatPrice(product.price)}`}>
            {formatPrice(product.price)}
          </p>
          <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>

          {/* 4. Rating */}
          <div className="mt-5">
            <Rating value={product.rating} reviewCount={product.reviewCount} size="lg" />
          </div>

          {/* 5. Stock status */}
          <StockStatus stock={product.stock} className="mt-4 text-base" />

          {/* 6. Colours available */}
          <fieldset className="mt-7">
            <legend className="text-sm font-semibold">
              Colour: <span className="font-normal text-muted-foreground">{colour}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colours.map((c) => {
                const selected = c.name === colour;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColour(c.name)}
                    aria-pressed={selected}
                    className={cn(
                      "flex items-center gap-2 rounded-full border bg-card py-1.5 pl-1.5 pr-4 text-sm font-medium transition-all",
                      selected
                        ? "border-foreground ring-1 ring-foreground"
                        : "hover:border-foreground/40",
                    )}
                  >
                    <span
                      className="relative grid size-7 place-items-center rounded-full border border-foreground/10"
                      style={{ backgroundColor: c.swatch }}
                      aria-hidden
                    >
                      {selected && (
                        <Check className="size-3.5 rounded-full bg-background p-0.5 text-foreground" />
                      )}
                    </span>
                    {c.name}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <Button
            size="lg"
            className="mt-7 h-12 w-full text-base sm:w-auto sm:px-10"
            onClick={handleAdd}
            disabled={!available}
          >
            <ShoppingBag />
            {available ? "Add to cart" : "Out of stock"}
          </Button>

          <div className="mt-6 grid gap-3 rounded-lg bg-muted p-4 text-sm sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <Truck className="size-4 text-primary" /> Free delivery over ₹2,999
            </p>
            <p className="flex items-center gap-2">
              <RotateCcw className="size-4 text-primary" /> 30-day easy returns
            </p>
          </div>

          {/* 7. Item details */}
          <section className="mt-9 border-t pt-7" aria-labelledby="details-heading">
            <h2 id="details-heading" className="text-2xl font-bold uppercase">
              Item details
            </h2>
            <p className="mt-3 font-medium">{product.summary}</p>
            <div className="mt-3 space-y-3 text-muted-foreground">
              {product.details.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
