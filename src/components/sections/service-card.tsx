import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Service } from "@/content/services";
import { serviceHref } from "@/lib/routes";
import { cn } from "@/lib/utils";

function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className={cn(
        "interactive-card group border-border bg-surface text-surface-foreground shadow-card relative flex flex-col overflow-hidden rounded-xl border",
        "hover:shadow-lift transition-[translate,box-shadow] duration-(--duration-base) ease-(--ease-standard)",
      )}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={service.cardImage.src}
          alt={service.cardImage.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-[scale] duration-(--duration-slow) ease-(--ease-standard)"
        />
      </div>
      <div className="flex flex-1 flex-col p-7 lg:p-8">
        <h3 className="text-h3 font-semibold">
          {/* Stretched link: the whole card is clickable, with one link in the tab order. */}
          <Link
            href={serviceHref(service.slug)}
            className="rounded-sm after:absolute after:inset-0 after:content-['']"
          >
            {service.cardTitle}
          </Link>
        </h3>
        <p className="text-muted-foreground mt-3 flex-1">{service.summary}</p>
        <p
          aria-hidden="true"
          className="text-link mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase"
        >
          View service
          <ArrowRight className="arrow-hop size-4" />
        </p>
      </div>
    </article>
  );
}

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <li key={service.slug} className="reveal flex">
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>
  );
}
