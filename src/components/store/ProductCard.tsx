import { Link } from "@tanstack/react-router";

import { formatPrice, type Product } from "@/lib/products";
import { ProductImage } from "./ProductImage";
import { Rating } from "./Rating";
import { StockStatus } from "./StockStatus";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id }}
      className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="eyebrow absolute left-3 top-3 rounded bg-background/90 px-2 py-1 text-[0.68rem] text-foreground">
          {product.sport}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold leading-tight">{product.name}</h3>
        <p className="font-display text-xl font-bold">{formatPrice(product.price)}</p>
        <Rating value={product.rating} reviewCount={product.reviewCount} />
        <StockStatus stock={product.stock} className="mt-auto pt-1" />
      </div>
    </Link>
  );
}
