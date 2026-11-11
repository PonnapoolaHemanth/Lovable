import { stockLabel, stockState } from "@/lib/products";
import { cn } from "@/lib/utils";

const tone = {
  in: "text-success",
  low: "text-warning",
  out: "text-destructive",
} as const;

export function StockStatus({ stock, className }: { stock: number; className?: string }) {
  const state = stockState(stock);
  return (
    <p className={cn("flex items-center gap-2 text-sm font-semibold", tone[state], className)}>
      <span className="size-2 rounded-full bg-current" aria-hidden />
      {stockLabel(stock)}
      {state === "low" && <span className="font-normal text-muted-foreground">— low stock</span>}
    </p>
  );
}
