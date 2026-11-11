import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, ArrowRight } from "lucide-react";

import heroImage from "@/assets/login-athlete.jpg";
import { loginSchema, signIn, signOut, useSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Log in — Kinetic Sports" },
      { name: "description", content: "Log in to Kinetic to shop running, football, tennis and training gear." },
      { property: "og:title", content: "Log in — Kinetic Sports" },
      { property: "og:description", content: "Log in to Kinetic to shop running, football, tennis and training gear." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

type FieldErrors = Partial<Record<"email" | "password", string>>;

function LoginPage() {
  const session = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const next: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    signIn(result.data);
    navigate({ to: "/products" });
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <img
          src={heroImage}
          alt="Runner sprinting on an athletics track at sunrise"
          width={1024}
          height={1408}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/60 to-transparent p-10 pt-32 text-ink-foreground">
          <p className="eyebrow text-primary">Season 2026</p>
          <p className="mt-2 max-w-md font-display text-5xl font-bold uppercase leading-[0.95]">
            Gear up. Show up. Go further.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-sm animate-rise">
          {session ? (
            <div className="space-y-6">
              <div>
                <p className="eyebrow text-primary">Welcome back</p>
                <h1 className="mt-2 text-4xl font-bold">You're signed in</h1>
                <p className="mt-2 text-muted-foreground">
                  Signed in as <span className="font-semibold text-foreground">{session.email}</span>.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg">
                  <Link to="/products">
                    Browse products <ArrowRight />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" onClick={() => signOut()}>
                  Log out
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="eyebrow text-primary">Kinetic Sports</p>
              <h1 className="mt-2 text-4xl font-bold">Log in to your account</h1>
              <p className="mt-2 text-muted-foreground">
                Track orders and shop gear for every sport.
              </p>

              {hasErrors && (
                <div
                  role="alert"
                  className="mt-6 flex gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  <p>Please fix the highlighted fields to continue.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="h-11 bg-card aria-[invalid=true]:border-destructive"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/help" className="text-sm font-medium text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    className="h-11 bg-card aria-[invalid=true]:border-destructive"
                  />
                  {errors.password && (
                    <p id="password-error" className="text-sm text-destructive">
                      {errors.password}
                    </p>
                  )}
                </div>

                <Button type="submit" size="lg" className="h-11 w-full text-base">
                  Log in
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                New to Kinetic?{" "}
                <Link to="/help" className="font-semibold text-primary hover:underline">
                  Create an account
                </Link>
              </p>
              <p className="mt-8 rounded-md bg-muted p-3 text-center text-xs text-muted-foreground">
                Demo store: any valid email and password will sign you in.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
