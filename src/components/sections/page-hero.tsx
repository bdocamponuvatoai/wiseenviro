import { ArrowDown } from "lucide-react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import type { ContentImage } from "@/content/services";
import type { AppRoute } from "@/lib/routes";

import { Container } from "../layout/container";

interface Crumb {
  name: string;
  href: AppRoute;
}

interface PageHeroProps {
  title: string;
  titleAccent?: string;
  eyebrow?: string;
  lead?: string;
  image?: ContentImage;
  /** Portrait crop for small screens (home hero only). */
  mobileImage?: ContentImage;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  /** "home" is the full-height landing hero. */
  size?: "home" | "page";
}

/**
 * Page header. With an image it renders a full-bleed photo under a scrim with the title
 * at the bottom; without one it renders a plain band (legal pages, contact).
 */
export function PageHero({
  title,
  titleAccent,
  eyebrow,
  lead,
  image,
  mobileImage,
  breadcrumbs,
  actions,
  size = "page",
}: PageHeroProps) {
  if (size === "home" && image) {
    return (
      <HomeHero
        title={title}
        titleAccent={titleAccent}
        eyebrow={eyebrow}
        lead={lead}
        image={image}
        mobileImage={mobileImage ?? image}
        actions={actions}
      />
    );
  }

  if (image) {
    return (
      <ImagePageHero
        title={title}
        titleAccent={titleAccent}
        eyebrow={eyebrow}
        lead={lead}
        image={image}
        breadcrumbs={breadcrumbs}
        actions={actions}
      />
    );
  }

  return (
    <section
      aria-labelledby="page-title"
      className="bg-band text-band-foreground relative grid overflow-clip"
    >
      <div className="relative z-10 flex flex-col justify-center px-4 pt-32 pb-14 sm:px-6 lg:min-h-[32rem] lg:px-[max(2rem,calc((100vw-var(--container-content))/2+2rem))] lg:py-32">
        {breadcrumbs ? <BandBreadcrumbs crumbs={breadcrumbs} /> : null}
        {eyebrow ? <p className="eyebrow-line text-band-highlight">{eyebrow}</p> : null}
        <div className={eyebrow ? "mt-7" : undefined}>
          <h1 id="page-title" className="text-h1 font-bold tracking-[-0.04em] uppercase">
            <TitleLines
              title={title}
              titleAccent={titleAccent}
              accentClassName="text-band-highlight italic"
            />
          </h1>
        </div>
        {lead ? <p className="text-band-muted-foreground mt-7 max-w-xl text-lg">{lead}</p> : null}
        {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}

function TitleLines({
  title,
  titleAccent,
  accentClassName,
}: {
  title: string;
  titleAccent?: string;
  accentClassName?: string;
}) {
  if (!titleAccent) return title;
  const [before, after] = title.split(titleAccent);
  return (
    <>
      <span className="block">{before}</span>
      <span className={accentClassName ? `block ${accentClassName}` : "block"}>{titleAccent}</span>
      {after ? <span className="block">{after}</span> : null}
    </>
  );
}

function BandBreadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="text-band-muted-foreground flex flex-wrap items-center gap-x-2">
        {crumbs.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center gap-x-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className="text-band-foreground">
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const scrimGradient =
  "absolute inset-0 bg-linear-to-b from-scrim/10 via-scrim/38 via-55% to-scrim/88";

function ImagePageHero({
  title,
  titleAccent,
  eyebrow,
  lead,
  image,
  breadcrumbs,
  actions,
}: Required<Pick<PageHeroProps, "title" | "image">> &
  Pick<PageHeroProps, "titleAccent" | "eyebrow" | "lead" | "breadcrumbs" | "actions">) {
  return (
    <section
      aria-labelledby="page-title"
      className="on-media bg-foreground text-on-media relative isolate min-h-[43rem] overflow-clip lg:min-h-[48rem]"
    >
      <div className="absolute inset-0 overflow-clip">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className={scrimGradient} />
      </div>

      <Container className="relative z-10 flex min-h-[43rem] flex-col justify-end pt-32 pb-10 lg:min-h-[48rem] lg:pb-12">
        {breadcrumbs ? (
          <nav
            aria-label="Breadcrumb"
            className="bg-scrim/75 mb-5 w-fit rounded-full px-4 text-xs font-semibold tracking-[0.14em] uppercase"
          >
            <ol className="text-on-media/85 flex flex-wrap items-center gap-x-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-x-2">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="text-primary">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:text-on-media inline-flex min-h-11 items-center"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : eyebrow ? (
          <p className="eyebrow-line text-primary mb-5">{eyebrow}</p>
        ) : null}

        <div className="border-on-media/45 grid gap-7 border-t pt-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)] lg:items-end lg:gap-16">
          <h1
            id="page-title"
            className="text-shadow-hero text-[clamp(2.6rem,5vw,5.5rem)] leading-[0.92] font-medium tracking-[-0.05em] uppercase"
          >
            <TitleLines title={title} titleAccent={titleAccent} />
          </h1>
          {lead || actions ? (
            <div className="hero-copy-glass border-on-media/55 border-t pt-5 lg:mb-1">
              {lead ? <p className="text-on-media/88 leading-relaxed">{lead}</p> : null}
              {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

function HomeHero({
  title,
  titleAccent,
  eyebrow,
  lead,
  image,
  mobileImage,
  actions,
}: Required<Pick<PageHeroProps, "title" | "image" | "mobileImage">> &
  Pick<PageHeroProps, "titleAccent" | "eyebrow" | "lead" | "actions">) {
  // Art direction: landscape crop from 1024px up, portrait crop below. Both are full-bleed.
  // This is the LCP image, so it loads eagerly with high priority (no lazy loading).
  const sizes = "100vw";
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ src: image.src, alt: image.alt, sizes });
  const { props: mobileProps } = getImageProps({
    src: mobileImage.src,
    alt: mobileImage.alt,
    sizes,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <section
      aria-labelledby="page-title"
      className="on-media bg-foreground relative isolate min-h-[58rem] overflow-clip sm:min-h-[60rem] lg:min-h-[100svh]"
    >
      <div className="absolute inset-0 overflow-clip">
        <picture>
          <source media="(min-width: 1024px)" srcSet={desktopSrcSet} sizes={sizes} />
          <img
            {...mobileProps}
            alt={mobileImage.alt}
            className="absolute inset-0 size-full object-cover object-center"
          />
        </picture>
        <div aria-hidden="true" className={scrimGradient} />
      </div>

      <Container className="text-on-media relative z-10 flex min-h-[58rem] flex-col justify-end pt-32 pb-9 sm:min-h-[60rem] lg:min-h-[100svh] lg:pb-12">
        {eyebrow ? <p className="eyebrow-line text-primary mb-5">{eyebrow}</p> : null}
        <div className="border-on-media/45 grid gap-7 border-t pt-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.55fr)] lg:items-end lg:gap-16">
          <h1
            id="page-title"
            className="text-shadow-hero text-[clamp(2.55rem,5vw,5.5rem)] leading-[0.92] font-medium tracking-[-0.055em] uppercase"
          >
            <TitleLines title={title} titleAccent={titleAccent} />
          </h1>

          <div className="hero-copy-glass border-on-media/55 border-t pt-5 lg:mb-1">
            {lead ? (
              <p className="text-on-media/88 max-w-xl text-base leading-relaxed">{lead}</p>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {actions}
              <a
                href="#services-title"
                className="hover:text-primary inline-flex min-h-12 items-center gap-2 px-2 text-xs font-bold tracking-[0.14em] uppercase transition-colors"
              >
                Explore services <ArrowDown aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
