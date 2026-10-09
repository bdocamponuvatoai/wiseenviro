import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Digits-only form of a phone number for `tel:` links, with US country code. */
export function toTelHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`;
}

/** Absolute URL for a site path, based on the configured site URL. */
export function absoluteUrl(path: string, base: string) {
  return new URL(path, base).toString();
}
