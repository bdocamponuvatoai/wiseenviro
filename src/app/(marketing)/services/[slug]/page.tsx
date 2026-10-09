import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { PhoneLink } from "@/components/layout/phone-link";
import { Button } from "@/components/ui/button";
import { CheckList } from "@/components/sections/check-list";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/sections/json-ld";
import { MediaSplit } from "@/components/sections/media-split";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServicesGrid } from "@/components/sections/service-card";
import { getService, services } from "@/content/services";
import { serviceHref } from "@/lib/routes";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.title,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const primaryAudience = service.audience[0];
  const parent =
    primaryAudience === "residential"
      ? ({ name: "Residential", href: "/residential-services" } as const)
      : ({ name: "Commercial", href: "/commercial-services" } as const);
  const related = services
    .filter((s) => s.slug !== service.slug && s.audience.some((a) => service.audience.includes(a)))
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(service),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: parent.name, path: parent.href },
            { name: service.cardTitle, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <PageHero
        title={service.title}
        lead={service.intro[0]}
        image={service.heroImage}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: parent.name, href: parent.href },
          { name: service.cardTitle, href: serviceHref(service.slug) },
        ]}
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/contact">Get Started</Link>
            </Button>
            <PhoneLink variant="outline-media" size="lg" />
          </>
        }
      />

      {service.intro.length > 1 ? (
        <Container className="py-12 md:py-16">
          <div className="text-lead text-muted-foreground max-w-(--container-prose) space-y-4">
            {service.intro.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      ) : null}

      {service.sections.map((section, i) => (
        <MediaSplit
          key={section.heading}
          id={`section-${i}`}
          title={section.heading}
          image={section.image}
          reverse={i % 2 === 1}
          tone={i % 2 === 1 ? "muted" : "default"}
        >
          {section.body?.map((p) => (
            <p key={p} className="text-muted-foreground">
              {p}
            </p>
          ))}
          {section.list ? (
            <CheckList items={section.list} columns={section.list.length > 6 ? 2 : 1} />
          ) : null}
        </MediaSplit>
      ))}

      {service.variants ? (
        <section
          aria-labelledby="variants-title"
          className="bg-band text-band-foreground py-16 md:py-24"
        >
          <Container>
            <h2 id="variants-title" className="text-h2 font-bold">
              {service.variantsHeading}
            </h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
              {service.variants.map((variant) => (
                <li
                  key={variant.name}
                  className="reveal bg-surface text-surface-foreground shadow-lift flex flex-col overflow-hidden rounded-lg"
                >
                  {variant.image ? (
                    <div className="relative aspect-[3/2]">
                      <Image
                        src={variant.image.src}
                        alt={variant.image.alt}
                        fill
                        placeholder="blur"
                        sizes="(min-width: 1280px) 26rem, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="border-highlight flex-1 border-t-4 p-6">
                    <p className="text-link text-sm font-bold tracking-[0.18em] uppercase">
                      {variant.eyebrow}
                    </p>
                    <h3 className="text-h3 mt-2 font-semibold">{variant.name}</h3>
                    <CheckList items={variant.features} className="mt-5 text-[0.9375rem]" />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="/contact">Get a quote</Link>
              </Button>
            </div>
          </Container>
        </section>
      ) : null}

      <FaqSection faqs={service.faqs} title={`${service.cardTitle} questions`} />

      {related.length > 0 ? (
        <section aria-labelledby="related-title" className="bg-muted py-16 md:py-24">
          <Container>
            <SectionHeading
              id="related-title"
              eyebrow="Related services"
              title="You might also need"
            />
            <div className="mt-10">
              <ServicesGrid services={related} />
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
