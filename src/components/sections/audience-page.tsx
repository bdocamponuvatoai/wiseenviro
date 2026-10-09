import Link from "next/link";
import type { Route } from "next";

import { Container } from "@/components/layout/container";
import { PhoneLink } from "@/components/layout/phone-link";
import { Button } from "@/components/ui/button";
import type { ContentImage, Service } from "@/content/services";
import { breadcrumbJsonLd } from "@/lib/structured-data";

import { CtaBand } from "./cta-band";
import { JsonLd } from "./json-ld";
import { PageHero } from "./page-hero";
import { ServicesGrid } from "./service-card";

interface AudiencePageProps {
  title: string;
  /** Heading above the service cards. */
  servicesHeading: string;
  path: Route;
  lead: string;
  body: string[];
  image: ContentImage;
  services: Service[];
}

/** Shared layout for the Residential and Commercial landing pages. */
export function AudiencePage({
  title,
  servicesHeading,
  path,
  lead,
  body,
  image,
  services,
}: AudiencePageProps) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: title, path },
        ])}
      />
      <PageHero
        eyebrow="We are here for you"
        title={title}
        lead={lead}
        image={image}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: title, href: path },
        ]}
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/contact">Request Service</Link>
            </Button>
            <PhoneLink variant="outline-media" size="lg" />
          </>
        }
      />
      <section aria-labelledby="audience-services" className="py-16 md:py-24">
        <Container>
          <div className="text-lead text-muted-foreground max-w-(--container-prose) space-y-4">
            {body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <h2 id="audience-services" className="text-h2 mt-14 font-bold">
            {servicesHeading}
          </h2>
          <div className="mt-8">
            <ServicesGrid services={services} />
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
