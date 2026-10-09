import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <a
      href="#main"
      className="back-to-top bg-primary text-primary-foreground shadow-lift fixed right-4 bottom-4 z-30 inline-flex size-12 items-center justify-center rounded-full sm:right-6 sm:bottom-6 sm:size-14"
      aria-label="Back to top"
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </a>
  );
}
