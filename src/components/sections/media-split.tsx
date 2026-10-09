import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import type { ContentImage } from "@/content/services";
import { cn } from "@/lib/utils";

interface MediaSplitProps {
  id: string;
  title: string;
  image?: ContentImage;
  reverse?: boolean;
  tone?: "default" | "muted";
  children: ReactNode;
}

/** Text beside a photo, alternating sides down the page. */
export function MediaSplit({
  id,
  title,
  image,
  reverse,
  tone = "default",
  children,
}: MediaSplitProps) {
  return (
    <section aria-labelledby={id} className={cn("py-16 md:py-24", tone === "muted" && "bg-muted")}>
      <Container className={cn("grid items-center gap-10 lg:gap-16", image && "lg:grid-cols-2")}>
        <div
          className={cn("reveal", reverse && "lg:order-2", !image && "max-w-(--container-prose)")}
        >
          <h2 id={id} className="text-h2">
            {title}
          </h2>
          <div className="bg-highlight mt-4 h-0.5 w-16" aria-hidden="true" />
          <div className="mt-6 space-y-4 text-lg">{children}</div>
        </div>
        {image ? (
          <div className="reveal shadow-lift relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1280px) 38rem, (min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
