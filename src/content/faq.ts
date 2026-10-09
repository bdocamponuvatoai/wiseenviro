import { siteConfig } from "@/lib/site-config";

import type { ServiceFaq } from "./services";

export const generalFaqs: ServiceFaq[] = [
  {
    question: "What areas do you serve?",
    answer: `We serve homeowners and businesses throughout Alabama from our offices in Oxford and Birmingham.`,
  },
  {
    question: "Can I reach someone outside business hours?",
    answer: `Yes. We answer our phone 24/7 at ${siteConfig.phone}, including for emergency service.`,
  },
  {
    question: "Do you work with both homeowners and businesses?",
    answer:
      "Yes. We handle everything from residential dumpsters and septic pumping to large commercial, event and emergency projects.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Call us or send a service request online with your address, date and the services you need. We provide accurate quotes, and septic estimates are free.",
  },
  {
    question: "Do you offer ADA-accessible restrooms?",
    answer:
      "Yes. We offer ADA-compliant portable toilets and an ADA restroom and shower combo trailer with a ramp, rails and a roll-in shower.",
  },
];
