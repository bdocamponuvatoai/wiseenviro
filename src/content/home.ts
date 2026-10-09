import adaExterior from "@/assets/images/ada-wise-exterior.webp";
import adaInterior from "@/assets/images/ada-wise-interior.webp";
import citywalkPortable from "@/assets/images/citywalk-portable.jpg";
import crewFestival from "@/assets/images/crew-festival.jpg";
import fleetYard from "@/assets/images/fleet-yard.jpg";
import heroDesktop from "@/assets/images/hero-wise-environmental-desktop.webp";
import heroMobile from "@/assets/images/hero-wise-environmental-mobile.webp";
import portableFestivalLine from "@/assets/images/portable-festival-line.jpeg";
import portableOverpass from "@/assets/images/portable-overpass.jpeg";
import processDesktop from "@/assets/images/process-wise-environmental-desktop.webp";
import processMobile from "@/assets/images/process-wise-environmental-mobile.webp";
import pumpTrucks from "@/assets/images/pump-trucks.jpg";
import restroomEvent from "@/assets/images/restroom-trailer-event.jpeg";
import { siteConfig } from "@/lib/site-config";

import type { ContentImage } from "./services";

export const homeContent = {
  hero: {
    eyebrow: "Alabama waste collection & resource recovery",
    title: "Your Partner in Responsible Waste Solutions",
    lead: `With over ${siteConfig.yearsExperience} years of experience, we're committed to superior customer service, innovative solutions and protecting human and natural resources.`,
    image: {
      src: heroDesktop,
      alt: "White Wise Environmental collection truck lifting a lime-green commercial dumpster",
    } satisfies ContentImage,
    mobileImage: {
      src: heroMobile,
      alt: "Wise Environmental front-load truck raising a lime-green commercial dumpster in its service yard",
    } satisfies ContentImage,
  },
  stats: [
    { value: `${siteConfig.yearsExperience}+`, label: "Years serving Alabama" },
    { value: "24/7", label: "Phones answered" },
    { value: "2", label: "Offices: Oxford & Birmingham" },
    { value: "6", label: "Core service lines" },
  ],
  values: {
    headings: ["Exceeding Expectations.", "Building Trust.", "Delivering Value."],
    body: [
      "Wise Environmental Solutions, Inc. is a leading force in Alabama waste collection and resource recovery. Our experienced team handles large-scale projects, including national emergencies, and smaller residential jobs with the same personal care.",
      "We put your objectives first, with a focus on trust, exceptional value and 100% satisfaction.",
    ],
    images: [
      {
        src: restroomEvent,
        alt: "VIP restroom trailer with accessible signage at a jazz festival",
      },
      {
        src: pumpTrucks,
        alt: "Vacuum tanker trucks and pumps set up on a large-scale job",
      },
      {
        src: citywalkPortable,
        alt: "Row of Wise Environmental portable toilets at a downtown event",
      },
    ] satisfies ContentImage[],
  },
  services: {
    eyebrow: "Tailored waste solutions",
    title: "Comprehensive services throughout Alabama",
    lead: "From a single roll-off for a weekend remodel to sanitation for a citywide festival, we size the service to the job.",
  },
  audiences: [
    {
      title: "Residential",
      href: "/residential-services",
      body: "Dumpsters for remodels and cleanouts, portable toilets and restroom trailers for celebrations, and septic pumping on your schedule.",
      image: { src: fleetYard, alt: "Wise Enviro roll-off truck with a 30-yard container" },
    },
    {
      title: "Commercial",
      href: "/commercial-services",
      body: "Front-load collection, recycling, special and medical waste, job-site sanitation and shower trailers for crews and events.",
      image: {
        src: portableOverpass,
        alt: "Dozens of green portable toilets staged under a highway overpass for a large event",
      },
    },
  ] as const,
  process: {
    eyebrow: "How it works",
    title: "From first call to final pickup",
    image: {
      src: processDesktop,
      alt: "Wise Environmental coordinator planning service beside a collection truck and lime-green dumpster",
    } satisfies ContentImage,
    mobileImage: {
      src: processMobile,
      alt: "Wise Environmental field coordinator with a tablet beside a collection truck",
    } satisfies ContentImage,
    steps: [
      {
        title: "Call or send a request",
        body: "Reach us 24/7 by phone, or tell us about the job with the online request form.",
      },
      {
        title: "Get an accurate quote",
        body: "We confirm the size, schedule and site details, then give you a clear, accurate quote.",
      },
      {
        title: "We deliver and service",
        body: "Equipment arrives on time and is placed with care, cleaned and serviced as your project needs.",
      },
      {
        title: "Pickup and proper disposal",
        body: "When you're done, we haul it away and handle disposal and recycling responsibly.",
      },
    ],
  },
  feature: {
    eyebrow: "Featured",
    title: "ADA-compliant shower & restroom trailers",
    body: "Our 1-stall ADA combo trailer has a ramp with rails, hold bars throughout, lowered fixtures and a roll-in shower. Larger 8- and 12-stall trailers are available for festivals, crews and emergency response.",
    image: {
      src: adaExterior,
      alt: "Wise Environmental accessible restroom and shower trailer with a gently sloped aluminum ramp and handrails",
    } satisfies ContentImage,
    detailImage: {
      src: adaInterior,
      alt: "Accessible trailer interior with a roll-in shower, grab bars, fold-down seat and lowered sink",
    } satisfies ContentImage,
  },
  gallery: {
    eyebrow: "In the field",
    title: "Built for big events and everyday service",
    items: [
      {
        src: crewFestival,
        alt: "Wise Environmental crew in matching pink shirts in front of a festival stage",
        caption: "Our crew on site at a Birmingham music festival",
      },
      {
        src: portableFestivalLine,
        alt: "Long line of portable toilets with hand-wash stations along a festival fence",
        caption: "Event sanitation, staged and serviced",
      },
      {
        src: fleetYard,
        alt: "Roll-off truck carrying a pink Wise Enviro container",
        caption: "Roll-off delivery from our own fleet",
      },
    ] satisfies (ContentImage & { caption: string })[],
  },
  cta: {
    title: "Ready to upgrade your waste management?",
    body: "Talk with a real person, any time of day. We'll help you choose the right service and give you an accurate quote.",
  },
};
