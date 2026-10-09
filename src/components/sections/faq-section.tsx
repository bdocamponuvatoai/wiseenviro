import { Container } from "@/components/layout/container";
import { AccordionItem } from "@/components/ui/accordion";
import type { ServiceFaq } from "@/content/services";
import { faqPageJsonLd } from "@/lib/structured-data";

import { JsonLd } from "./json-ld";
import { SectionHeading } from "./section-heading";

interface FaqSectionProps {
  faqs: ServiceFaq[];
  title?: string;
}

export function FaqSection({ faqs, title = "Frequently asked questions" }: FaqSectionProps) {
  return (
    <section aria-labelledby="faq-title" className="py-16 md:py-24">
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHeading id="faq-title" eyebrow="FAQ" title={title} />
        <div className="border-border border-t">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} title={faq.question}>
              <p>{faq.answer}</p>
            </AccordionItem>
          ))}
        </div>
      </Container>
    </section>
  );
}
