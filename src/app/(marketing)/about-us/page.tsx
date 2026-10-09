import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/sections/json-ld";
import { MediaSplit } from "@/components/sections/media-split";
import { PageHero } from "@/components/sections/page-hero";
import { aboutContent } from "@/content/company";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About Us",
  description: `${siteConfig.legalName} has delivered waste collection and resource recovery in Alabama for over ${siteConfig.yearsExperience} years, with offices in Oxford and Birmingham.`,
  alternates: { canonical: "/about-us" },
};

export default function AboutPage() {
  const a = aboutContent;
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about-us" },
        ])}
      />
      <PageHero
        title={a.title}
        lead={a.lead}
        image={a.image}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About Us", href: "/about-us" },
        ]}
      />
      <MediaSplit id="mission-title" title={a.mission.heading}>
        {a.mission.body.map((p) => (
          <p key={p} className="text-muted-foreground">
            {p}
          </p>
        ))}
      </MediaSplit>

      <section
        aria-labelledby="pillars-title"
        className="bg-band text-band-foreground py-16 md:py-24"
      >
        <Container>
          <h2 id="pillars-title" className="text-h2 font-bold">
            What guides our work
          </h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {a.pillars.map((pillar) => (
              <li key={pillar.title} className="reveal border-band-rule border-t pt-6">
                <h3 className="text-h3 font-semibold">{pillar.title}</h3>
                <p className="text-band-muted-foreground mt-2">{pillar.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <MediaSplit id="story-title" title={a.story.heading} image={a.story.image} reverse>
        {a.story.body.map((p) => (
          <p key={p} className="text-muted-foreground">
            {p}
          </p>
        ))}
      </MediaSplit>
      <CtaBand />
    </>
  );
}
