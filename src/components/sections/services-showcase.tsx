import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Service } from "@/content/services";
import { serviceHref } from "@/lib/routes";

/** Image sizes matching the rail layout in globals.css: 1 col, 2 cols at lg, a 6/3/3/4/4/4 grid at xl. */
function panelSizes(index: number) {
  const xl = index === 0 ? "43rem" : index < 3 ? "22rem" : "29rem";
  return `(min-width: 1280px) ${xl}, (min-width: 1024px) 50vw, 100vw`;
}

export function ServicesShowcase({ services }: { services: Service[] }) {
  return (
    <ol className="services-rail mt-12">
      {services.map((service, index) => (
        <li key={service.slug} className="service-panel interactive-card group">
          <article className="on-media text-on-media relative isolate flex h-full min-h-[25rem] flex-col justify-end overflow-clip rounded-xl p-6 sm:min-h-[30rem] sm:p-8 lg:min-h-0">
            <Image
              src={service.cardImage.src}
              alt={service.cardImage.alt}
              fill
              placeholder="blur"
              sizes={panelSizes(index)}
              className="-z-20 object-cover transition-[scale] duration-700 ease-(--ease-standard) group-focus-within:scale-[1.035] group-hover:scale-[1.035]"
            />
            <div
              aria-hidden="true"
              className="from-scrim/80 via-scrim/45 absolute inset-0 -z-10 bg-linear-to-t to-transparent"
            />

            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="service-panel-title font-display mt-2 text-[1.65rem] leading-[1.02] font-semibold uppercase sm:text-4xl">
                  <Link
                    href={serviceHref(service.slug)}
                    className="rounded-sm after:absolute after:inset-0 after:content-['']"
                  >
                    {service.cardTitle}
                  </Link>
                </h3>
              </div>
              <span className="text-primary mt-1 inline-flex size-8 shrink-0 items-center justify-end">
                <ArrowRight aria-hidden="true" className="arrow-hop size-6" />
              </span>
            </div>

            <div>
              <p className="text-on-media/82 mt-5 max-w-md text-sm leading-relaxed sm:text-base">
                {service.summary}
              </p>
              <p
                aria-hidden="true"
                className="text-primary mt-5 text-xs font-bold tracking-[0.15em] uppercase"
              >
                Explore service
              </p>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
