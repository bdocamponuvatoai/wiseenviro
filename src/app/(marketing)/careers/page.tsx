import type { Metadata } from "next";

import { CareersForm } from "@/components/forms/careers-form";
import { Container } from "@/components/layout/container";
import { CheckList } from "@/components/sections/check-list";
import { JsonLd } from "@/components/sections/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { careersContent } from "@/content/company";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Wise Environmental in Oxford and Birmingham, AL. Technician, office and management opportunities with competitive pay, benefits and room to grow.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  const c = careersContent;
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <PageHero
        title={c.title}
        lead={c.lead}
        image={c.image}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Careers", href: "/careers" },
        ]}
      />
      <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <section aria-labelledby="why-title" className="space-y-10">
          <div className="text-muted-foreground space-y-4 text-lg">
            {c.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div>
            <h2 id="why-title" className="text-h3 font-semibold">
              Roles we hire for
            </h2>
            <CheckList items={c.roles} className="mt-4" />
          </div>
          <div>
            <h2 className="text-h3 font-semibold">What you can expect</h2>
            <CheckList items={c.benefits} className="mt-4" />
          </div>
          <p className="border-highlight text-muted-foreground border-l-4 pl-4">{c.note}</p>
        </section>
        <section
          aria-labelledby="apply-title"
          className="border-border bg-surface shadow-card rounded-xl border p-6 sm:p-10"
        >
          <h2 id="apply-title" className="text-h2 font-bold">
            Job interest form
          </h2>
          <p className="text-muted-foreground mt-2 mb-8">
            Tell us about yourself and the work you&apos;re looking for.
          </p>
          <CareersForm />
        </section>
      </Container>
    </>
  );
}
