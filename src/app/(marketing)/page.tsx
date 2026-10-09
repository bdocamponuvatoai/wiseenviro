import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PhoneLink } from "@/components/layout/phone-link";
import { Button } from "@/components/ui/button";
import { CheckList } from "@/components/sections/check-list";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq-section";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessShowcase } from "@/components/sections/process-showcase";
import { Eyebrow, SectionHeading } from "@/components/sections/section-heading";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { generalFaqs } from "@/content/faq";
import { homeContent } from "@/content/home";
import { services } from "@/content/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Alabama Waste Collection & Portable Sanitation` },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const { hero, stats, values, audiences, process, feature, gallery } = homeContent;

  return (
    <>
      <PageHero
        size="home"
        eyebrow={hero.eyebrow}
        title={hero.title}
        titleAccent="Responsible Waste"
        lead={hero.lead}
        image={hero.image}
        mobileImage={hero.mobileImage}
        actions={
          <>
            <PhoneLink size="lg" label="Call Us 24/7" />
            <Button asChild variant="outline-media" size="lg">
              <Link href="/contact">Request Service</Link>
            </Button>
          </>
        }
      />

      {/* Social proof */}
      <section
        aria-label="Wise Environmental at a glance"
        className="bg-primary text-primary-foreground"
      >
        <Container className="grid grid-cols-2 gap-y-8 py-9 lg:grid-cols-4 lg:py-11">
          {stats.map((stat) => (
            <div key={stat.label} className="border-primary-foreground/25 border-l pl-4 lg:pl-6">
              <p className="font-display text-4xl font-bold lg:text-5xl">{stat.value}</p>
              <p className="mt-1 text-xs font-bold tracking-[0.12em] uppercase">{stat.label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Value: Exceeding Expectations / Building Trust / Delivering Value */}
      <section aria-labelledby="values-title" className="py-20 md:py-28 lg:py-40">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="grid grid-cols-2 gap-4">
            <div className="reveal photo-frame shadow-lift relative col-span-2 aspect-[16/10]">
              <Image
                src={values.images[0].src}
                alt={values.images[0].alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover"
              />
            </div>
            {values.images.slice(1).map((image) => (
              <div
                key={image.alt}
                className="reveal photo-frame shadow-card relative aspect-square"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 20rem, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="reveal">
            <Eyebrow>Why Wise Environmental</Eyebrow>
            <h2 id="values-title" className="text-h2 mt-5 font-bold uppercase">
              {values.headings.map((line, i) => (
                <span key={line} className={i === 2 ? "text-link block italic" : "block"}>
                  {line}
                </span>
              ))}
            </h2>
            <div className="text-muted-foreground mt-6 space-y-4 text-lg">
              {values.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Button asChild variant="outline" size="lg" className="mt-8">
              <Link href="/about-us">About Us</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section
        aria-labelledby="services-title"
        className="bg-background text-foreground py-20 md:py-28 lg:py-36"
      >
        <Container>
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(20rem,0.7fr)]">
            <SectionHeading
              id="services-title"
              eyebrow={homeContent.services.eyebrow}
              title={homeContent.services.title}
            />
            <div className="lg:pb-1">
              <p className="text-lead text-muted-foreground max-w-xl">
                {homeContent.services.lead}
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link href="/services">
                  View all services <ArrowRight aria-hidden="true" className="arrow-hop" />
                </Link>
              </Button>
            </div>
          </div>
          <ServicesShowcase services={services} />
        </Container>
      </section>

      {/* Residential / Commercial */}
      <section aria-labelledby="audiences-title" className="bg-primary py-5 md:py-7">
        <Container>
          <h2 id="audiences-title" className="sr-only">
            Residential and commercial services
          </h2>
          <ul className="grid gap-5 lg:grid-cols-2">
            {audiences.map((audience) => (
              <li key={audience.href} className="reveal">
                <article className="on-media interactive-card group text-on-media relative isolate flex min-h-96 flex-col justify-end overflow-hidden rounded-xl p-8 lg:min-h-[32rem] lg:p-12">
                  <Image
                    src={audience.image.src}
                    alt={audience.image.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 40rem, 100vw"
                    className="-z-20 object-cover transition-transform duration-(--duration-slow) ease-(--ease-standard) group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="from-scrim/80 via-scrim/45 absolute inset-0 -z-10 bg-linear-to-t from-35% to-transparent"
                  />
                  <h3 className="text-h2 font-bold uppercase">
                    <Link
                      href={audience.href}
                      className="rounded-sm after:absolute after:inset-0 after:content-['']"
                    >
                      {audience.title}
                    </Link>
                  </h3>
                  <p className="text-on-media/82 mt-3 max-w-md">{audience.body}</p>
                  <p
                    aria-hidden="true"
                    className="text-primary mt-5 inline-flex items-center gap-2 font-semibold"
                  >
                    Explore {audience.title.toLowerCase()} services
                    <ArrowRight className="arrow-hop size-4" />
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ProcessShowcase {...process} />

      {/* Featured: shower trailers */}
      <section
        aria-labelledby="feature-title"
        className="bg-background text-foreground overflow-clip py-20 md:py-28 lg:py-36"
      >
        <Container className="grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="reveal lg:pr-4">
            <Eyebrow>{feature.eyebrow}</Eyebrow>
            <h2 id="feature-title" className="text-h2 mt-5 font-bold uppercase">
              {feature.title}
            </h2>
            <p className="text-muted-foreground mt-5 text-lg">{feature.body}</p>
            <CheckList
              className="mt-7"
              columns={2}
              items={[
                "ADA ramp with rails",
                "Roll-in shower",
                "Heat and air conditioning",
                "8- and 12-stall options",
              ]}
            />
            <Button asChild size="lg" className="mt-8">
              <Link href="/services/shower-trailers">See shower trailers</Link>
            </Button>
          </div>

          <div className="relative pb-20 sm:pb-28 lg:pb-24">
            <div className="reveal photo-frame shadow-lift relative aspect-[16/10] rounded-xl">
              <Image
                src={feature.image.src}
                alt={feature.image.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 58rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="reveal border-background shadow-lift absolute right-4 bottom-0 aspect-[3/4] w-[38%] overflow-hidden rounded-[1.5rem] border-[0.45rem] sm:right-8 sm:rounded-xl lg:right-10">
              <Image
                src={feature.detailImage.src}
                alt={feature.detailImage.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 20rem, 42vw"
                className="object-cover"
              />
            </div>
            <div className="bg-primary text-primary-foreground shadow-card absolute bottom-8 left-4 max-w-52 rounded-2xl px-5 py-4 sm:left-8 lg:bottom-7">
              <p className="text-xs font-bold tracking-[0.15em] uppercase">Designed for access</p>
              <p className="mt-1 text-sm leading-snug">
                Safe entry, generous space and thoughtful fixtures.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Results: in the field */}
      <section aria-labelledby="gallery-title" className="bg-muted py-20 md:py-28">
        <Container>
          <SectionHeading id="gallery-title" eyebrow={gallery.eyebrow} title={gallery.title} />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {gallery.items.map((item) => (
              <li key={item.caption} className="reveal">
                <figure>
                  <div className="photo-frame shadow-card relative aspect-[4/3]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 768px) 26rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="text-muted-foreground mt-3">{item.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FaqSection faqs={generalFaqs} />
      <CtaBand />
    </>
  );
}
