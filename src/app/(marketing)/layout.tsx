import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BackToTop } from "@/components/layout/back-to-top";
import { JsonLd } from "@/components/sections/json-ld";
import { organizationJsonLd } from "@/lib/structured-data";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <BackToTop />
      <SiteFooter />
    </>
  );
}
