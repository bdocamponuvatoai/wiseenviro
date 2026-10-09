import type { Route } from "next";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";

import { PageHero } from "./page-hero";

export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: Route;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        title={title}
        lead={`Last updated ${updated}`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: title, href: path },
        ]}
      />
      <Container className="py-16 md:py-24">
        <div className="text-muted-foreground [&_a]:text-link [&_h2]:text-h3 [&_h2]:text-foreground max-w-(--container-prose) space-y-5 text-lg [&_a]:font-semibold [&_a]:underline [&_h2]:pt-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {children}
        </div>
      </Container>
    </>
  );
}
