import type { Metadata } from "next";

import heroFrontLoad from "@/assets/images/hero-front-load-line.jpg";
import { AudiencePage } from "@/components/sections/audience-page";
import { getServicesFor } from "@/content/services";

const description =
  "Commercial waste management, front-load dumpsters, job-site and event sanitation, restroom and shower trailers for Alabama businesses. Answering 24/7.";

export const metadata: Metadata = {
  title: "Commercial Services",
  description,
  alternates: { canonical: "/commercial-services" },
};

export default function CommercialServicesPage() {
  return (
    <AudiencePage
      title="Commercial Services"
      servicesHeading="Our commercial services"
      path="/commercial-services"
      lead="Flexible waste management and sanitation for businesses, job sites, events and emergencies."
      body={[
        "Wise Environmental supports Alabama businesses of every size with short- and long-term collection, recycling, special waste handling and on-site sanitation.",
        "From a single front-load container to restroom and shower trailers for a festival or emergency response crew, we deliver accurate quotes and dependable service.",
      ]}
      image={{
        src: heroFrontLoad,
        alt: "Row of lime-green Wise Enviro front-load commercial dumpsters",
      }}
      services={getServicesFor("commercial")}
    />
  );
}
