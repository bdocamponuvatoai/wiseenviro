import crewFestival from "@/assets/images/crew-festival.jpg";
import fleetYard from "@/assets/images/fleet-yard.jpg";
import portableOverpass from "@/assets/images/portable-overpass.jpeg";

import type { ContentImage } from "./services";

export const aboutContent = {
  title: "About Us",
  lead: "Where the customer is always #1.",
  image: {
    src: fleetYard,
    alt: "Wise Enviro roll-off truck carrying a pink 30-yard container",
  } satisfies ContentImage,
  mission: {
    heading: "Our mission",
    body: [
      "Wise Environmental Solutions, Inc. is a leader in waste collection and resource recovery, providing exceptional service through sustainable company initiatives while protecting human and natural resources.",
      "Our pledge is to build lasting relationships with our customers by exceeding their expectations, building trust and delivering exceptional value.",
    ],
  },
  story: {
    heading: "Leading the way in waste collection and recovery",
    image: {
      src: portableOverpass,
      alt: "Long row of Wise Environmental portable toilets under a downtown overpass",
    } satisfies ContentImage,
    body: [
      "With over 25 years of experience, we're committed to superior customer service, innovative solutions and protecting Alabama's human and natural resources. We can take on large-scale projects such as national emergencies while still giving smaller residential projects the personal service they need.",
      "Our core focus is serving clients, protecting vital natural resources and supporting our local community. Our long-term success has been possible only through the relationships we've built over decades and the efforts of our staff.",
      "Our team is continually trained in current industry standards and holds itself to its own professional standards of quality. Every client matters, whatever the project size or type, and we always strive for 100% satisfaction.",
    ],
  },
  pillars: [
    {
      title: "Customers first",
      body: "Client objectives are always our #1 priority, and you can see it in how we work.",
    },
    {
      title: "Protecting resources",
      body: "Sustainable practices, recycling and responsible disposal protect the resources we all depend on.",
    },
    {
      title: "Community roots",
      body: "Offices in Oxford and Birmingham, and a team that cares about the communities we serve.",
    },
  ],
};

export const careersContent = {
  title: "Discover Your Future at Wise Environmental",
  lead: "We're always looking for motivated, dedicated people to join our team and deliver exceptional service to our clients.",
  body: [
    "Wise Environmental Solutions, Inc. is a leader in waste collection and resource recovery. We keep growing and evolving with our clients' needs, which takes a wide range of skills from our staff.",
    "If you have a strong work ethic, care about great service and want a long-term career, tell us about yourself.",
  ],
  image: {
    src: crewFestival,
    alt: "Wise Environmental crew in matching pink shirts on site at a music festival",
  } satisfies ContentImage,
  roles: ["Front and back office personnel", "Technicians", "Management opportunities"],
  benefits: [
    "Long-term opportunities",
    "Competitive compensation packages",
    "Employee benefits",
    "Friendly work environment",
    "Advancement opportunities",
  ],
  note: "Wise Environmental is a drug-free workplace.",
};
