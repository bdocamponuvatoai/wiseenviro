import { ClipboardCheck, Headphones, Recycle, Truck } from "lucide-react";
import { getImageProps } from "next/image";

import { Container } from "@/components/layout/container";
import type { ContentImage } from "@/content/services";

interface ProcessStep {
  title: string;
  body: string;
}

interface ProcessShowcaseProps {
  eyebrow: string;
  title: string;
  image: ContentImage;
  mobileImage: ContentImage;
  steps: ProcessStep[];
}

const icons = [Headphones, ClipboardCheck, Truck, Recycle] as const;

export function ProcessShowcase({
  eyebrow,
  title,
  image,
  mobileImage,
  steps,
}: ProcessShowcaseProps) {
  const desktopSizes = "(min-width: 1024px) 52vw, 100vw";
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ src: image.src, alt: image.alt, sizes: desktopSizes });
  const { props: mobileProps } = getImageProps({
    src: mobileImage.src,
    alt: mobileImage.alt,
    sizes: "100vw",
  });

  return (
    <section
      aria-labelledby="process-title"
      className="bg-muted overflow-clip py-20 md:py-28 lg:py-36"
    >
      <Container>
        <div className="border-foreground/12 grid items-end gap-7 border-b pb-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow-line text-link">{eyebrow}</p>
            <h2 id="process-title" className="text-h2 mt-5 max-w-4xl font-bold uppercase">
              {title}
            </h2>
          </div>
          <p className="text-lead text-muted-foreground max-w-xl lg:justify-self-end">
            One responsive team guides every job, from choosing the right service through
            responsible final disposal.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:gap-10">
          <figure className="process-visual shadow-lift relative min-h-[34rem] overflow-clip rounded-xl sm:min-h-[42rem] lg:sticky lg:top-24 lg:h-[calc(100svh-8rem)] lg:max-h-[48rem] lg:min-h-[38rem]">
            <picture>
              <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes={desktopSizes} />
              <img
                {...mobileProps}
                alt={mobileImage.alt}
                className="absolute inset-0 size-full object-cover"
              />
            </picture>
            <div
              aria-hidden="true"
              className="from-scrim/80 to-scrim/8 absolute inset-0 bg-linear-to-t via-transparent"
            />
            <figcaption className="text-on-media absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
              <div>
                <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
                  In the field
                </p>
                <p className="font-display mt-2 max-w-sm text-2xl leading-tight font-semibold uppercase sm:text-3xl">
                  Planned carefully. Delivered reliably.
                </p>
              </div>
              <p className="border-on-media/35 bg-scrim/24 rounded-full border px-4 py-2 text-xs font-bold tracking-[0.14em] uppercase backdrop-blur-md">
                Alabama · 24/7
              </p>
            </figcaption>
          </figure>

          <ol className="relative grid gap-4 lg:py-3">
            {steps.map((step, index) => {
              const Icon = icons[index] ?? ClipboardCheck;
              return (
                <li
                  key={step.title}
                  className="process-step border-foreground/10 bg-background shadow-card relative grid min-h-44 grid-cols-[auto_1fr] gap-5 rounded-[1.5rem] border p-6 sm:p-7"
                >
                  <div className="bg-primary text-primary-foreground relative z-10 flex size-12 items-center justify-center rounded-xl shadow-sm">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <div>
                    <p
                      aria-hidden="true"
                      className="text-link text-xs font-bold tracking-[0.18em] uppercase"
                    >
                      Step {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-h3 mt-2 font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground mt-3">{step.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
