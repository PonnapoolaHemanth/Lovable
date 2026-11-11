import { Link, useNavigate } from "@tanstack/react-router";
import { LogIn, LogOut, ShoppingBag } from "lucide-react";

import { signOut, useSession } from "@/lib/auth";
import { useCartCount } from "@/lib/cart";
import { Button } from "@/components/ui/button";

const navLink =
  "rounded-md px-2.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground sm:px-3";

export function SiteHeader() {
  const session = useSession();
  const cartCount = useCartCount();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Link to="/products" className="flex items-center gap-2" aria-label="Kinetic home">
          <span className="grid size-8 place-items-center rounded-md bg-ink font-display text-lg font-bold text-ink-foreground">
            K
          </span>
          <span className="hidden font-display text-xl font-bold uppercase tracking-wide sm:inline">
            Kinetic
          </span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-0.5 sm:gap-1">
          <Link
            to="/products"
            className={navLink}
            activeProps={{ className: "text-foreground" }}
          >
            Products
          </Link>
          <Link to="/account" className={navLink} activeProps={{ className: "text-foreground" }}>
            Account
          </Link>

          <span
            className="relative mx-1 grid size-9 place-items-center rounded-md text-muted-foreground"
            aria-label={`Cart: ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
            role="status"
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-4 text-primary-foreground">
                {cartCount}
              </span>
            )}
          </span>

          {session ? (
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut />
              <span>Log out</span>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link to="/">
                <LogIn />
                <span>Log in</span>
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
