import { createFileRoute, Link } from "@tanstack/react-router";
import { KeyRound, Mail, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Sign-up & login help — Kinetic Sports" },
      { name: "description", content: "Create a Kinetic account or get help signing in to the sports store." },
      { property: "og:title", content: "Sign-up & login help — Kinetic Sports" },
      { property: "og:description", content: "Create a Kinetic account or get help signing in to the sports store." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HelpPage,
});

const items = [
  {
    icon: UserPlus,
    title: "Create an account",
    body: "This demo store doesn't need a separate sign-up. Enter any email and password on the login page and an account is created for you instantly.",
  },
  {
    icon: KeyRound,
    title: "Forgot your password?",
    body: "Passwords aren't checked in the demo, so you can log in with any password. In the full store, a reset link would be emailed to you.",
  },
  {
    icon: Mail,
    title: "Still stuck?",
    body: "Our athlete support team is on hand every day from 8am to 8pm at support@kinetic.example.",
  },
];

function HelpPage() {
  return (
    <div className="container-page max-w-3xl py-14">
      <p className="eyebrow text-primary">Help centre</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Sign-up & login help</h1>
      <div className="mt-10 space-y-4">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex gap-4 rounded-lg border bg-card p-5 shadow-card">
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
              <Icon className="size-5" />
            </span>
            <div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-1 text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </div>
      <Button asChild size="lg" className="mt-10">
        <Link to="/">Back to login</Link>
      </Button>
    </div>
  );
}
