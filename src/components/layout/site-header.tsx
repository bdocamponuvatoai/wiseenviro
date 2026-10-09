import { mainNav } from "@/lib/site-config";

import { Container } from "./container";
import { DesktopNav } from "./desktop-nav";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { PhoneLink } from "./phone-link";

export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 pt-3 sm:pt-5">
      <Container>
        <div className="border-foreground/8 bg-background/88 shadow-lift supports-[backdrop-filter]:bg-background/72 pointer-events-auto flex h-16 items-center justify-between gap-3 rounded-full border px-3 backdrop-blur-2xl sm:h-18 sm:px-5">
          <Logo className="w-36 sm:w-44 xl:w-48" />
          <DesktopNav items={mainNav} />
          <div className="flex items-center gap-2">
            {/* Full "24/7 + number" button where it fits; icon-only on phones and narrow desktops. */}
            <PhoneLink
              showHours
              size="md"
              className="hidden sm:inline-flex lg:hidden xl:inline-flex"
            />
            <PhoneLink size="icon" className="sm:hidden lg:inline-flex xl:hidden" />
            <MobileNav
              items={mainNav}
              callToAction={<PhoneLink showHours size="lg" className="w-full" />}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
