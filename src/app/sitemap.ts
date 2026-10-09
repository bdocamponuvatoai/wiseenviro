import type { MetadataRoute } from "next";

import { services } from "@/content/services";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/residential-services", priority: 0.9 },
    { path: "/commercial-services", priority: 0.9 },
    { path: "/services", priority: 0.8 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    { path: "/contact", priority: 0.8 },
    { path: "/about-us", priority: 0.6 },
    { path: "/careers", priority: 0.5 },
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  return pages.map(({ path, priority }) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
