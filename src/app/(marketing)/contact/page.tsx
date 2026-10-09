import { Clock, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/sections/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { toTelHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Request dumpsters, portable toilets, trailers, septic or commercial waste service anywhere in Alabama. Call ${siteConfig.phone} 24/7 or send a request online.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        title="We're Here to Help"
        lead={`Our team is ready to serve you, and we answer our phone 24/7. Call ${siteConfig.phone} or fill out the form and someone will be in touch soon.`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <section
          aria-labelledby="form-title"
          className="border-border bg-surface shadow-card rounded-xl border p-6 sm:p-10"
        >
          <h2 id="form-title" className="text-h2 font-bold">
            Request service
          </h2>
          <p className="text-muted-foreground mt-2 mb-8">
            Tell us what you need and when. We&apos;ll follow up with an accurate quote.
          </p>
          <ContactForm />
        </section>

        <aside aria-labelledby="reach-title" className="space-y-8">
          <h2 id="reach-title" className="sr-only">
            Other ways to reach us
          </h2>
          <div className="bg-band text-band-foreground rounded-xl p-8">
            <Phone aria-hidden="true" className="text-band-highlight size-8" />
            <p className="font-display mt-4 text-xl tracking-wide">Call us 24/7</p>
            <a
              href={toTelHref(siteConfig.phone)}
              className="font-display hover:text-band-highlight mt-1 inline-flex min-h-11 items-center rounded-sm text-3xl font-bold"
            >
              {siteConfig.phone}
            </a>
            <p className="text-band-muted-foreground mt-2 flex items-center gap-2">
              <Clock aria-hidden="true" className="size-4" /> Answered day and night, including
              emergencies
            </p>
          </div>
          <ul className="space-y-6">
            {siteConfig.offices.map((office) => (
              <li key={office.name} className="border-border flex gap-4 rounded-xl border p-6">
                <MapPin aria-hidden="true" className="text-accent mt-1 size-6 shrink-0" />
                <div>
                  <h3 className="font-display text-xl tracking-wide">{office.name} office</h3>
                  <address className="text-muted-foreground mt-1 not-italic">
                    {office.street}
                    <br />
                    {office.city}, {office.region} {office.postalCode}
                  </address>
                  <a
                    className="text-link mt-2 inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${office.street}, ${office.city}, ${office.region} ${office.postalCode}`)}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Get directions
                    <span className="sr-only">
                      {" "}
                      to our {office.name} office (opens in a new tab)
                    </span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </>
  );
}
