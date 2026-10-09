import Image from "next/image";
import Link from "next/link";

import globe from "@/assets/brand/logo-globe.png";
import { Container } from "@/components/layout/container";
import { PhoneLink } from "@/components/layout/phone-link";
import { Button } from "@/components/ui/button";
import { homeContent } from "@/content/home";

export function CtaBand() {
  const { title, body } = homeContent.cta;
  return (
    <section
      aria-labelledby="cta-title"
      className="bg-background text-foreground border-border relative isolate overflow-hidden border-y py-24 lg:py-36"
    >
      <Image
        src={globe}
        alt=""
        sizes="(min-width: 1024px) 40rem, 20rem"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-80 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] lg:w-[40rem]"
      />
      <Container className="text-center">
        <h2 id="cta-title" className="text-h2 mx-auto max-w-4xl font-bold uppercase">
          {title}
        </h2>
        <p className="text-lead text-muted-foreground mx-auto mt-6 max-w-xl">{body}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/contact">Let&apos;s Talk</Link>
          </Button>
          <PhoneLink variant="outline" size="lg" showHours />
        </div>
      </Container>
    </section>
  );
}
