import type { Service, ServiceFaq } from "@/content/services";

import { siteConfig } from "./site-config";
import { absoluteUrl } from "./utils";

type JsonLd = Record<string, unknown>;

const orgId = `${siteConfig.url}/#organization`;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.png", siteConfig.url),
    telephone: siteConfig.phone,
    slogan: siteConfig.tagline,
    areaServed: { "@type": "State", name: siteConfig.serviceArea },
    department: siteConfig.offices.map((office) => ({
      "@type": "LocalBusiness",
      name: `${siteConfig.name}, ${office.name}`,
      telephone: siteConfig.phone,
      url: siteConfig.url,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: office.street,
        addressLocality: office.city,
        addressRegion: office.region,
        postalCode: office.postalCode,
        addressCountry: "US",
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, siteConfig.url),
    })),
  };
}

export function serviceJsonLd(service: Service): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    serviceType: service.cardTitle,
    url: absoluteUrl(`/services/${service.slug}`, siteConfig.url),
    provider: { "@id": orgId },
    areaServed: { "@type": "State", name: siteConfig.serviceArea },
  };
}

export function faqPageJsonLd(faqs: ServiceFaq[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
