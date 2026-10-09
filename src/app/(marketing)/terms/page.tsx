import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/sections/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms that apply to using the ${siteConfig.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms" updated="October 9, 2026">
      <p>
        By using this website you agree to these terms. If you do not agree, please do not use the
        site.
      </p>
      <h2>Information on this site</h2>
      <p>
        We work to keep service descriptions, equipment specifications and other content accurate,
        but availability, specifications and pricing can change. Submitting a request does not
        create a contract; services are confirmed by a quote or agreement with{" "}
        {siteConfig.legalName}.
      </p>
      <h2>Acceptable use</h2>
      <p>
        Do not misuse the site, including submitting false information, attempting to disrupt it, or
        sending automated or spam submissions.
      </p>
      <h2>Intellectual property</h2>
      <p>
        The Wise Environmental name, logo, photos and content on this site belong to{" "}
        {siteConfig.legalName} and may not be reused without permission.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        The website is provided &ldquo;as is.&rdquo; To the extent allowed by law, we are not liable
        for damages arising from your use of the site.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms? Call {siteConfig.phone} or{" "}
        <Link href="/contact">contact us</Link>.
      </p>
    </LegalPage>
  );
}
