import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/sections/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.legalName} collects, uses and protects information submitted through this website.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated="October 9, 2026">
      <p>
        This policy explains how {siteConfig.legalName} (&ldquo;Wise Environmental,&rdquo;
        &ldquo;we&rdquo;) handles information collected through this website.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you send us.</strong> When you submit a service request or job
          interest form, we collect the details you enter, such as your name, phone, email, service
          address and message.
        </li>
        <li>
          <strong>Technical information.</strong> Our hosting provider records standard server logs
          (such as IP address, browser type and pages requested) to operate and secure the site.
        </li>
      </ul>
      <h2>How we use it</h2>
      <p>
        We use your information to respond to your request, prepare quotes, schedule service,
        consider job applicants and protect the site from abuse. We do not sell your personal
        information.
      </p>
      <h2>Sharing</h2>
      <p>
        We share information only with service providers who help us run the website and handle
        inquiries, or when required by law.
      </p>
      <h2>Cookies</h2>
      <p>This website does not use advertising or analytics cookies.</p>
      <h2>Your choices</h2>
      <p>
        To ask what information we hold about you, or to have it corrected or deleted, call us at{" "}
        {siteConfig.phone} or <Link href="/contact">contact us</Link>.
      </p>
    </LegalPage>
  );
}
