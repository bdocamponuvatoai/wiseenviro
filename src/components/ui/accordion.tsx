import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

/** Native <details> disclosure: keyboard accessible and readable with JavaScript disabled. */
export function AccordionItem({ title, children }: AccordionItemProps) {
  return (
    <details className="group border-border border-b">
      <summary className="font-display text-foreground hover:text-link flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-6 text-left text-xl font-medium tracking-wide transition-colors duration-(--duration-fast) [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown
          aria-hidden="true"
          className="bg-primary text-primary-foreground size-9 shrink-0 rounded-full p-2 transition-transform duration-(--duration-base) ease-(--ease-standard) group-open:rotate-180"
        />
      </summary>
      <div className="text-muted-foreground max-w-(--container-prose) pb-6">{children}</div>
    </details>
  );
}
