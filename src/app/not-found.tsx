import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PhoneLink } from "@/components/layout/phone-link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { footerNav } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <section className="bg-band text-band-foreground py-20 lg:py-28">
          <Container>
            <p className="font-display text-band-highlight text-7xl font-bold">404</p>
            <h1 className="border-band-rule text-h1 mt-4 border-t pt-6 font-bold">
              We couldn&apos;t find that page
            </h1>
            <p className="text-lead text-band-muted-foreground mt-4 max-w-xl">
              It may have moved when we updated our website. Try one of the links below, or give us
              a call.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/">Back to home</Link>
              </Button>
              <PhoneLink variant="outline-inverse" size="lg" />
            </div>
          </Container>
        </section>
        <Container className="py-16">
          <h2 className="text-h3 font-semibold">Popular pages</h2>
          <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {footerNav
              .flatMap((col) => col.links)
              .map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="text-link inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
