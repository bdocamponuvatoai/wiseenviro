import type { StaticImageData } from "next/image";

import adaRampDetail from "@/assets/images/ada-ramp-detail.jpg";
import citywalkBank from "@/assets/images/citywalk-bank.jpg";
import citywalkPortable from "@/assets/images/citywalk-portable.jpg";
import commercialCard from "@/assets/images/commercial-card.jpg";
import dumpsterCard from "@/assets/images/dumpster-card.jpg";
import fleetYard from "@/assets/images/fleet-yard.jpg";
import heroFrontLoad from "@/assets/images/hero-front-load-line.jpg";
import portableEvent from "@/assets/images/portable-event.jpeg";
import portableInterior from "@/assets/images/portable-interior.jpeg";
import portableRow from "@/assets/images/portable-row.jpeg";
import portableCard from "@/assets/images/portable-toilets-card.jpg";
import restroomCard from "@/assets/images/restroom-trailer-card.jpg";
import restroomEvent from "@/assets/images/restroom-trailer-event.jpeg";
import restroomWide from "@/assets/images/restroom-trailer-wide.jpg";
import rollOff from "@/assets/images/roll-off.jpg";
import septicCard from "@/assets/images/septic-card.jpg";
import septicTech from "@/assets/images/septic-tech.jpg";
import septicTruck from "@/assets/images/septic-truck.jpg";
import septicWide from "@/assets/images/septic-wide.jpg";
import shower12 from "@/assets/images/shower-12-stall.jpg";
import shower4Festival from "@/assets/images/shower-4-stall-festival.jpg";
import shower8Ext from "@/assets/images/shower-8-stall-ext.jpg";
import shower8Int from "@/assets/images/shower-8-stall-int.jpg";

export type Audience = "residential" | "commercial";

export interface ContentImage {
  src: StaticImageData;
  alt: string;
}

interface ServiceSection {
  heading: string;
  body?: string[];
  list?: string[];
  image?: ContentImage;
}

interface ServiceVariant {
  eyebrow: string;
  name: string;
  features: string[];
  image?: ContentImage;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  /** Short label for nav, cards and the contact form. */
  cardTitle: string;
  audience: Audience[];
  summary: string;
  metaDescription: string;
  intro: string[];
  heroImage: ContentImage;
  cardImage: ContentImage;
  sections: ServiceSection[];
  variantsHeading?: string;
  variants?: ServiceVariant[];
  faqs: ServiceFaq[];
}

export const services: Service[] = [
  {
    slug: "dumpster",
    title: "Dumpster & Roll-Off Rentals",
    cardTitle: "Dumpster",
    audience: ["residential", "commercial"],
    summary:
      "Roll-off containers from 10 to 40 cubic yards for remodels, cleanups, roofing and construction, delivered and picked up on time.",
    metaDescription:
      "Rent a 10, 20, 30 or 40 cubic yard roll-off dumpster in Alabama. Timely delivery, careful placement and pickup from Wise Environmental.",
    intro: [
      "Home remodels, major yard projects and removing large items are just three of the many reasons you may need a dumpster or roll-off container. Tell us about the job and we'll match the right size to it.",
    ],
    heroImage: {
      src: rollOff,
      alt: "Wise Environmental truck hauling a pink roll-off dumpster with more containers stacked behind it",
    },
    cardImage: {
      src: commercialCard,
      alt: "Red roll-off container filled with construction debris",
    },
    sections: [
      {
        heading: "Prompt dumpster solutions for every need",
        list: [
          "Flexible dumpster and roll-off sizes for every project",
          "Timely delivery and pickup",
          "Careful dumpster placement",
          "Superior customer service",
        ],
        image: {
          src: fleetYard,
          alt: "White roll-off truck carrying a pink Wise Enviro 30-yard container",
        },
      },
    ],
    variantsHeading: "Roll-off dumpster sizes",
    variants: [
      {
        eyebrow: "40 cubic yards",
        name: "40-Yard Container",
        features: ["Large home remodels", "Major cleanups", "Construction projects"],
      },
      {
        eyebrow: "30 cubic yards",
        name: "30-Yard Container",
        features: ["Mid-sized remodels or cleanups", "Tree trimming", "Light demolition"],
      },
      {
        eyebrow: "20 cubic yards",
        name: "20-Yard Container",
        features: ["Roofing projects", "Small remodels", "Spring and summer cleanouts"],
      },
      {
        eyebrow: "10 cubic yards",
        name: "10-Yard Container",
        features: ["Concrete, asphalt and brick", "Tile, dirt and sand", "Small remodel projects"],
      },
    ],
    faqs: [
      {
        question: "What size dumpster do I need?",
        answer:
          "A 10-yard container suits heavy material like concrete, brick, dirt or tile. A 20-yard handles roofing jobs and small remodels, a 30-yard covers mid-sized remodels, tree trimming and light demolition, and a 40-yard is built for large remodels and construction. If you're unsure, call us and we'll help you choose.",
      },
      {
        question: "Do you deliver and pick up the container?",
        answer:
          "Yes. We deliver, place the container carefully where you need it, and pick it up when your project is done.",
      },
    ],
  },
  {
    slug: "portable-toilets",
    title: "Portable Toilet Rentals",
    cardTitle: "Portable Toilets",
    audience: ["residential", "commercial"],
    summary:
      "Standard, ADA-compliant and VIP portable restrooms for weddings, concerts, festivals, job sites and every kind of outdoor event.",
    metaDescription:
      "Portable toilet rentals across Alabama: standard, ADA-compliant, VIP and deluxe flushing units for events and job sites. Call Wise Environmental 24/7.",
    intro: [
      "Across Alabama, portable restrooms keep outdoor events and celebrations comfortable. Planning by the number of guests you expect keeps everyone's sanitary needs met in a clean, hygienic setting.",
    ],
    heroImage: {
      src: citywalkPortable,
      alt: "Long row of green Wise Environmental portable toilets with a hand-washing station under a downtown overpass",
    },
    cardImage: { src: portableCard, alt: "Blue portable toilet on a grassy lakeside lawn" },
    sections: [
      {
        heading: "Choose what works best for you",
        body: [
          "We service portable toilets for celebrations, birthday parties, concerts, weddings and every other occasion. The size of your event is the main factor: a large wedding needs more units than a small backyard gathering, so every guest has easy access.",
          "For many events it's worth renting separate restrooms for men and women so guests feel comfortable using them.",
        ],
        image: {
          src: portableRow,
          alt: "Row of green portable toilets in a shaded parking area with a guest stepping out",
        },
      },
      {
        heading: "Our product options",
        list: [
          "Standard portable toilet",
          "ADA-compliant portable toilet",
          "VIP self-contained portable restroom",
          "Deluxe flushing restroom",
          "Mobile restroom and shower",
          "Mobile shower trailer",
        ],
        image: {
          src: portableInterior,
          alt: "Wise Environmental ADA portable restroom with a hand-washing station at an outdoor gathering",
        },
      },
      {
        heading: "Perfect for your event",
        body: [
          "Every unit comes equipped with the basics: tissue, a holding tank and a towel hook. Our guest and VIP restrooms go further, with options like a hand-washing station, mirror and music system.",
          "Pricing depends on the amenities you choose, and units can also be purchased for permanent use. Contact us for a quote.",
        ],
        image: {
          src: portableEvent,
          alt: "Long row of portable toilets set up on a plaza in front of a historic building",
        },
      },
    ],
    faqs: [
      {
        question: "How many portable toilets does my event need?",
        answer:
          "It depends mainly on how many guests you expect and how long the event runs. Give us your headcount and schedule and we'll recommend the right number of units.",
      },
      {
        question: "Do you offer ADA-compliant units?",
        answer:
          "Yes. We offer ADA-compliant portable toilets, plus an ADA mobile restroom and shower combo trailer with a ramp, rails and a roll-in shower.",
      },
    ],
  },
  {
    slug: "restroom-trailers",
    title: "Restroom Trailers",
    cardTitle: "Restroom Trailers",
    audience: ["residential", "commercial"],
    summary:
      "Clean, sanitized restroom trailers for special events and temporary use, plus servicing and repairs for trailers you own.",
    metaDescription:
      "Restroom trailer rentals for weddings, festivals and temporary sites in Alabama. Sanitized after every event, with repair and maintenance for owned trailers.",
    intro: [
      "We provide quality, clean restroom trailers for special events and temporary use. Every trailer is sanitized after each project and maintained so it's in proper working condition for yours.",
      "We also service and repair restroom trailers you own, with qualified technicians and flexible options to fit your event or temporary-use needs.",
    ],
    heroImage: {
      src: restroomEvent,
      alt: "Wise Environmental VIP restroom trailer with steps and handrails at an Alabama jazz festival",
    },
    cardImage: {
      src: restroomCard,
      alt: "White restroom trailer with doors open and fold-down steps",
    },
    sections: [
      {
        heading: "Restroom trailers and servicing",
        list: [
          "Fast response",
          "Accurate quotes",
          "Skilled, knowledgeable support",
          "Partitioned stalls",
          "Sanitized and cleaned after every use",
          "Repair and maintenance services",
          "Heavy-duty construction",
          "Flexible options",
          "Affordable pricing",
        ],
        image: {
          src: restroomWide,
          alt: "Triple-axle restroom trailer parked on site with its doors open",
        },
      },
    ],
    faqs: [
      {
        question: "Can you repair a restroom trailer we already own?",
        answer:
          "Yes. Our technicians provide servicing, repairs and maintenance for customer-owned restroom trailers.",
      },
      {
        question: "Are trailers cleaned between events?",
        answer: "Every trailer is sanitized and cleaned after every project.",
      },
    ],
  },
  {
    slug: "shower-trailers",
    title: "Shower Trailers",
    cardTitle: "Shower Trailers",
    audience: ["commercial"],
    summary:
      "From a 1-stall ADA restroom and shower combo to a 12-stall commercial shower trailer, sized for festivals, crews and emergency response.",
    metaDescription:
      "Rent ADA, executive and 12-stall commercial shower trailers in Alabama for festivals, corporate events, work crews and emergency response.",
    intro: [
      "Explore our shower trailer options, including our ADA-compliant single-stall shower and restroom trailer. We offer several types and sizes to suit your event.",
    ],
    heroImage: {
      src: shower8Ext,
      alt: "Exterior of a white multi-stall mobile restroom trailer",
    },
    cardImage: {
      src: shower4Festival,
      alt: "Wise Environmental multi-stall trailer set up inside a fenced festival site",
    },
    sections: [
      {
        heading: "Shower trailers for every kind of event",
        list: [
          "Weddings",
          "Concerts",
          "Festivals",
          "Outdoor parties",
          "Business events",
          "Corporate retreats",
        ],
        image: {
          src: shower4Festival,
          alt: "Multi-stall trailer with steps and a trash bin at an outdoor festival",
        },
      },
    ],
    variantsHeading: "Trailer options",
    variants: [
      {
        eyebrow: "1-Stall",
        name: "ADA Mobile Restroom & Shower Combo",
        features: [
          "Outdoor and indoor LED lighting",
          "ADA ramp with rails and platform",
          "ADA-compliant hold bars throughout",
          "Lowered access to toilet, sink and towel holders",
          "LP gas heating and air conditioning",
          "200-gallon fresh water tank for toilet, sink and shower",
          "450-gallon wastewater tank",
          "Roll-in shower with fold-down bench and hold bars",
        ],
        image: {
          src: adaRampDetail,
          alt: "ADA trailer ramp with handrails leading to the entry platform",
        },
      },
      {
        eyebrow: "8-Stall",
        name: "Executive Mobile Restroom Trailer",
        features: [
          "20' × 8' trailer layout",
          "HVAC climate control on each side",
          "Spacious, pleasing interior design",
          "Stainless steel sinks and faucets",
          "Interior and exterior LED lighting",
          "200-gallon fresh water tank",
          "750-gallon wastewater capacity",
        ],
        image: {
          src: shower8Int,
          alt: "Executive restroom trailer interior with a urinal and double vanity",
        },
      },
      {
        eyebrow: "12-Stall",
        name: "Commercial Shower Trailer",
        features: [
          "8'6\" wide × 40' long container trailer",
          "Stainless steel access steps and step-up shower stalls",
          "Two community benches",
          "Hot and cold water",
          "Climate-controlled heat and air (100 amp required)",
          "Four stainless steel sinks",
          "Two paper towel dispensers, two soap dispensers, two non-breakable mirrors",
          "Non-slip commercial-grade flooring and floor drains",
          "Easy-to-clean, graffiti-proof walls",
          "2,000-gallon wastewater bladder",
          "Requires 240 VAC 50A single-phase power and propane for hot water",
        ],
        image: { src: shower12, alt: "Commercial shower trailer stall and stainless steel sink" },
      },
    ],
    faqs: [
      {
        question: "What power and utilities does the 12-stall shower trailer need?",
        answer:
          "The 12-stall commercial shower trailer requires 240 VAC 50A single-phase electrical service and propane for hot water heating. Its climate control needs 100 amps.",
      },
      {
        question: "Do you have an ADA-accessible shower trailer?",
        answer:
          "Yes. Our 1-stall ADA combo trailer has a ramp with rails, hold bars throughout, lowered fixtures and a roll-in shower with a fold-down bench.",
      },
    ],
  },
  {
    slug: "septic",
    title: "Septic Tank Pumping & Service",
    cardTitle: "Septic",
    audience: ["residential"],
    summary:
      "Septic tank pumping, cleaning and preventative maintenance from friendly, knowledgeable technicians in Oxford and Birmingham.",
    metaDescription:
      "Septic tank pumping, cleaning, emergency service and preventative maintenance in Oxford and Birmingham, AL. Free estimates from Wise Environmental.",
    intro: [
      "The average household septic system should be inspected and pumped at least every three years. How often yours needs it depends on household size, tank size, total wastewater generated and the volume of solids.",
      "If you're overdue for septic tank pumping, or not sure, call Wise Environmental today.",
    ],
    heroImage: {
      src: septicTruck,
      alt: "Septic pump truck with its suction hose laid out across a driveway",
    },
    cardImage: { src: septicCard, alt: "Septic pump truck connected by hose to a home system" },
    sections: [
      {
        heading: "An industry leader in Oxford and Birmingham",
        body: [
          "Wise Environmental has led waste collection in Oxford, AL and Birmingham, AL for over 25 years. Our technicians are friendly and knowledgeable, with expertise in quality residential septic service.",
          "On every residential and commercial job, our goal is the same: excellent service, a project finished on time, and protection for human and natural resources.",
        ],
        image: {
          src: septicTech,
          alt: "Technician feeding a vacuum hose into an open septic tank",
        },
      },
      {
        heading: "Septic tank pumping services",
        list: [
          "Free estimates",
          "Accurate project quotes",
          "Skilled, knowledgeable technicians",
          "Septic tank pumping",
          "Septic tank cleaning",
          "Emergency services",
          "Preventative maintenance",
          "Fast response",
          "Affordable prices",
        ],
        image: { src: septicCard, alt: "Pump truck hose connected to a residential septic system" },
      },
      {
        heading: "Septic experts who explain the work",
        body: [
          "Beyond great service, we help you avoid future problems with practical preventative steps that save time and money. Every project gets an accurate, detailed estimate, and we're always happy to answer questions.",
        ],
      },
    ],
    faqs: [
      {
        question: "How often should a septic tank be pumped?",
        answer:
          "The average household system should be inspected and pumped at least every three years. Larger households, smaller tanks or more solids in the wastewater can mean more frequent pumping.",
      },
      {
        question: "Do you charge for septic estimates?",
        answer:
          "No. Septic estimates are free, and every project gets an accurate, detailed quote.",
      },
      {
        question: "Do you handle septic emergencies?",
        answer: `Yes. We offer emergency septic service, and we answer the phone 24/7.`,
      },
    ],
  },
  {
    slug: "commercial-waste-management",
    title: "Commercial Waste Management",
    cardTitle: "Commercial Waste Management",
    audience: ["commercial"],
    summary:
      "Short- and long-term commercial collection, recycling, bulk pickup, special and medical waste, and emergency response.",
    metaDescription:
      "Commercial waste management in Alabama: front-load collection, recycling, bulk pickup, special and medical waste, and emergency services. Accurate quotes.",
    intro: [
      "Wise Environmental has led waste collection for over 25 years. Our friendly, knowledgeable team delivers commercial waste management built around three goals: excellent service for you, work done on time, and protection for human and natural resources.",
      "We always aim for exceptional value and cost-effective service.",
    ],
    heroImage: {
      src: heroFrontLoad,
      alt: "Row of lime-green Wise Enviro front-load commercial dumpsters",
    },
    cardImage: { src: dumpsterCard, alt: "Row of green wheeled commercial waste carts" },
    sections: [
      {
        heading: "Commercial waste management services",
        list: [
          "Short- or long-term service",
          "Medical waste",
          "Special waste disposal",
          "Emergency services",
          "Recycling services",
          "Bulk waste pickup and disposal",
          "Affordable prices",
        ],
        image: {
          src: citywalkBank,
          alt: "Wise Environmental portable restrooms staged under a downtown overpass",
        },
      },
      {
        heading: "Ready to serve you",
        image: {
          src: septicWide,
          alt: "Aerial view of open roll-off containers filled with sorted debris",
        },
        body: [
          "Our commercial services are flexible and designed around each client: medical waste, hazardous materials, bulk disposal, recycling and emergency management. We always provide accurate quotes, and meeting your needs is our #1 focus.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you offer short-term commercial service?",
        answer:
          "Yes. We offer both short- and long-term commercial service, from one-time bulk pickups to ongoing collection.",
      },
      {
        question: "Can you handle medical or special waste?",
        answer:
          "Yes. We provide medical waste and special waste disposal, including materials that require testing and special handling.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServicesFor(audience: Audience) {
  return services.filter((service) => service.audience.includes(audience));
}
