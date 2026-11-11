import { useState } from "react";
import { ImageOff } from "lucide-react";

import { cn } from "@/lib/utils";

export function ProductImage({
  src,
  alt,
  className,
  eager = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} — image coming soon`}
        className={cn(
          "flex aspect-square w-full flex-col items-center justify-center gap-2 bg-surface-image text-muted-foreground",
          className,
        )}
      >
        <ImageOff className="size-8" aria-hidden />
        <span className="eyebrow">Image coming soon</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={1024}
      height={1024}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={cn("aspect-square w-full bg-surface-image object-cover", className)}
    />
  );
}
