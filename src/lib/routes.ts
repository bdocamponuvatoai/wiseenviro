import type { Route } from "next";

/** Any `/services/[slug]` path. Plain `Route` only covers static routes. */
export type ServiceRoute = Route<`/services/${string}`>;

/** A link target stored in content or config: a static route or a service page. */
export type AppRoute = Route | ServiceRoute;

/** Typed link to a service detail page. */
export function serviceHref(slug: string): ServiceRoute {
  return `/services/${slug}`;
}
