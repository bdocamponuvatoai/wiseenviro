import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { footerNav, legalNav, siteConfig } from "@/lib/site-config";
import { toTelHref } from "@/lib/utils";

import { Container } from "./container";
import { CopyrightYear } from "./copyright-year";
import { Logo } from "./logo";

const footerLink =
  "inline-flex min-h-11 items-center rounded-sm text-band-muted-foreground transition-colors duration-(--duration-fast) hover:text-band-highlight";

export function SiteFooter() {
  return (
    <footer className="bg-band text-band-foreground">
      <div className="border-band-foreground/15 overflow-hidden border-y py-5" aria-hidden="true">
        <div className="marquee-track font-display text-4xl font-semibold tracking-tight uppercase sm:text-6xl">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-6 pr-6">
              {footerNav[0].links.map((link) => (
                <span key={`${copy}-${link.href}`} className="flex items-center gap-6">
                  {link.label}
                  <span className="text-band-highlight">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo className="w-64" sizes="256px" />
            <p className="text-band-muted-foreground mt-5 max-w-sm">
              Waste collection and resource recovery for Alabama homes and businesses for over{" "}
              {siteConfig.yearsExperience} years.
            </p>
            <a
              href={toTelHref(siteConfig.phone)}
              className="font-display hover:text-band-highlight mt-6 inline-flex min-h-11 items-center gap-3 rounded-sm text-2xl tracking-wide"
            >
              <Phone aria-hidden="true" className="text-band-highlight size-6" />
              <span>
                <span className="sr-only">Call us 24/7 at </span>
                {siteConfig.phone}
              </span>
            </a>
            <p className="text-band-muted-foreground text-sm">
              Answered 24 hours a day, 7 days a week
            </p>
          </div>

          {footerNav.map((column) => (
            <nav key={column.title} aria-label={`Footer ${column.title.toLowerCase()}`}>
              <h2 className="font-display text-band-highlight text-lg tracking-widest uppercase">
                {column.title}
              </h2>
              <ul className="mt-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-display text-band-highlight text-lg tracking-widest uppercase">
              Locations
            </h2>
            <ul className="mt-4 space-y-5">
              {siteConfig.offices.map((office) => (
                <li key={office.name} className="flex gap-3">
                  <MapPin aria-hidden="true" className="text-band-highlight mt-1 size-5 shrink-0" />
                  <address className="text-band-muted-foreground not-italic">
                    <span className="text-band-foreground font-semibold">{office.name}</span>
                    <br />
                    {office.street}
                    <br />
                    {office.city}, {office.region} {office.postalCode}
                  </address>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-band-foreground/15 mt-16 border-t pt-8">
          <h2 className="sr-only">Certifications</h2>
          <ul className="flex flex-wrap items-center gap-3">
            {siteConfig.credentials.map((cred) => (
              <li key={cred.alt} className="bg-paper flex h-20 items-center rounded-md px-3">
                <Image src={cred.image} alt={cred.alt} className="h-14 w-auto" sizes="120px" />
              </li>
            ))}
          </ul>
        </div>

        <p
          aria-hidden="true"
          className="font-display text-band-highlight mt-16 flex items-baseline justify-center gap-[0.16em] overflow-hidden text-center text-[clamp(4rem,12vw,11rem)] leading-[0.75] font-bold tracking-[-0.06em] uppercase"
        >
          <span>Wise</span>
          <span className="text-link text-[0.28em] font-semibold tracking-[-0.025em]">
            Environmental
          </span>
        </p>

        <div className="border-band-foreground/15 text-band-muted-foreground mt-8 flex flex-col gap-4 border-t pt-6 text-sm lg:flex-row lg:items-center lg:justify-between">
          <p>
            © <CopyrightYear /> {siteConfig.legalName} All rights reserved.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <p>
              Website mockups designed by{" "}
              <a
                href="https://nuvato.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link hover:text-band-highlight inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
              >
                Nuvato AI
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
            <ul className="flex flex-wrap gap-x-6">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
