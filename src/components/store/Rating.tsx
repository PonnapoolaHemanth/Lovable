import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function Rating({
  value,
  reviewCount,
  size = "sm",
}: {
  value: number;
  reviewCount?: number;
  size?: "sm" | "lg";
}) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const star = size === "lg" ? "size-5" : "size-4";

  return (
    <div className="flex items-center gap-2">
      <div className="relative inline-flex" role="img" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
        <div className="flex text-star-empty">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={cn(star, "fill-current")} strokeWidth={0} />
          ))}
        </div>
        <div className="absolute inset-0 flex overflow-hidden text-star" style={{ width: `${pct}%` }}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={cn(star, "shrink-0 fill-current")} strokeWidth={0} />
          ))}
        </div>
      </div>
      <span className={cn("font-semibold tabular-nums", size === "lg" ? "text-base" : "text-sm")}>
        {value.toFixed(1)}
        <span className="font-normal text-muted-foreground"> out of 5</span>
      </span>
      {reviewCount !== undefined && (
        <span className={cn("text-muted-foreground", size === "lg" ? "text-sm" : "text-xs")}>
          ({reviewCount.toLocaleString("en-IN")})
        </span>
      )}
    </div>
  );
}
