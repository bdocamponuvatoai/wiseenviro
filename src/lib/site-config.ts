import type { StaticImageData } from "next/image";

import { serviceHref, type AppRoute } from "./routes";

import cmmc from "@/assets/brand/credentials/cred1.png";
import dfars from "@/assets/brand/credentials/cred2.png";
import wosb from "@/assets/brand/credentials/cred-01.png";
import wbenc from "@/assets/brand/credentials/cred-02.png";
import bia from "@/assets/brand/credentials/cred-03.png";

export interface NavLink {
  label: string;
  href: AppRoute;
}

export interface NavGroup {
  label: string;
  href: AppRoute;
  description: string;
  children: NavLink[];
}

interface Office {
  name: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
}

export const siteConfig = {
  name: "Wise Environmental",
  legalName: "Wise Environmental Solutions, Inc.",
  tagline: "w.e. are making a difference",
  description:
    "Alabama waste collection and resource recovery for over 25 years: dumpsters and roll-offs, portable toilets, restroom and shower trailers, septic pumping and commercial waste management. Answering 24/7.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.wiseenviro.com",
  phone: "(256) 832-7867",
  phoneDisplay: "256-832-7867",
  serviceArea: "Alabama",
  yearsExperience: 25,
  offices: [
    {
      name: "Oxford",
      street: "2345 Alabama Hwy 21",
      city: "Oxford",
      region: "AL",
      postalCode: "36203",
    },
    {
      name: "Birmingham",
      street: "1500 Minor Parkway",
      city: "Birmingham",
      region: "AL",
      postalCode: "35224",
    },
  ] satisfies Office[],
  credentials: [
    { image: wosb, alt: "WOSB: Women-Owned Small Business certified" },
    { image: wbenc, alt: "WBENC: Certified Women's Business Enterprise" },
    { image: bia, alt: "BIA member" },
    { image: cmmc, alt: "CMMC: Cybersecurity Maturity Model Certification" },
    { image: dfars, alt: "DFARS compliant, Department of Defense" },
  ] satisfies { image: StaticImageData; alt: string }[],
} as const;

export const mainNav: (NavGroup | NavLink)[] = [
  {
    label: "Residential",
    href: "/residential-services",
    description:
      "Dumpsters, portable toilets, restroom trailers and septic service for homeowners.",
    children: [
      { label: "Septic", href: serviceHref("septic") },
      { label: "Restroom Trailers", href: serviceHref("restroom-trailers") },
      { label: "Portable Toilets", href: serviceHref("portable-toilets") },
      { label: "Dumpster", href: serviceHref("dumpster") },
    ],
  },
  {
    label: "Commercial",
    href: "/commercial-services",
    description:
      "Flexible waste management, sanitation and trailers for job sites, events and businesses.",
    children: [
      { label: "Dumpster", href: serviceHref("dumpster") },
      { label: "Portable Toilets", href: serviceHref("portable-toilets") },
      { label: "Restroom Trailers", href: serviceHref("restroom-trailers") },
      { label: "Shower Trailers", href: serviceHref("shower-trailers") },
      { label: "Commercial Waste Management", href: serviceHref("commercial-waste-management") },
    ],
  },
  { label: "About Us", href: "/about-us" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Dumpster & Roll-Off", href: serviceHref("dumpster") },
      { label: "Portable Toilets", href: serviceHref("portable-toilets") },
      { label: "Restroom Trailers", href: serviceHref("restroom-trailers") },
      { label: "Shower Trailers", href: serviceHref("shower-trailers") },
      { label: "Septic", href: serviceHref("septic") },
      { label: "Commercial Waste Management", href: serviceHref("commercial-waste-management") },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Residential", href: "/residential-services" },
      { label: "Commercial", href: "/commercial-services" },
      { label: "About Us", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
];

export function isNavGroup(item: NavGroup | NavLink): item is NavGroup {
  return "children" in item;
}
