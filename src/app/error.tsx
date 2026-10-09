"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { toTelHref } from "@/lib/utils";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="bg-band text-band-foreground flex flex-1 items-center px-4 py-24"
    >
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-h1 font-bold">Something went wrong</h1>
        <p className="text-band-muted-foreground mt-4">
          Sorry, this page didn&apos;t load correctly. Please try again, or call us 24/7 at{" "}
          <a
            href={toTelHref(siteConfig.phone)}
            className="text-band-foreground font-semibold underline"
          >
            {siteConfig.phone}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={reset}>
            Try again
          </Button>
          <Button asChild variant="outline-inverse" size="lg">
            <Link href="/">Go to home page</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
