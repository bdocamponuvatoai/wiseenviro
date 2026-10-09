import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn, toTelHref } from "@/lib/utils";

import type { VariantProps } from "class-variance-authority";

interface PhoneLinkProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  /** Show the "24/7" prefix like the original header button. */
  showHours?: boolean;
  label?: string;
}

export function PhoneLink({
  className,
  variant = "primary",
  size,
  showHours = false,
  label,
}: PhoneLinkProps) {
  const iconOnly = size === "icon";
  const hours = showHours && !iconOnly;
  // The accessible name starts with the visible text (WCAG 2.5.3 Label in Name).
  const ariaLabel = label
    ? undefined
    : iconOnly
      ? `Call ${siteConfig.name} 24/7 at ${siteConfig.phoneDisplay}`
      : `${hours ? "24/7 " : ""}${siteConfig.phoneDisplay}, call ${siteConfig.name}`;
  return (
    <a
      href={toTelHref(siteConfig.phone)}
      className={cn(buttonVariants({ variant, size }), className)}
      aria-label={ariaLabel}
    >
      {hours ? <span aria-hidden="true">24/7</span> : null}
      <Phone aria-hidden="true" />
      {iconOnly ? null : (label ?? <span aria-hidden="true">{siteConfig.phoneDisplay}</span>)}
    </a>
  );
}
