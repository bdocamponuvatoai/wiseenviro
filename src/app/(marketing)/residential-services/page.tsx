import type { Metadata } from "next";

import fleetYard from "@/assets/images/fleet-yard.jpg";
import { AudiencePage } from "@/components/sections/audience-page";
import { getServicesFor } from "@/content/services";

const description =
  "Residential dumpsters, portable toilets, restroom trailers and septic service across Alabama, plus curbside collection, recycling and yard waste in most areas.";

export const metadata: Metadata = {
  title: "Residential Services",
  description,
  alternates: { canonical: "/residential-services" },
};

export default function ResidentialServicesPage() {
  return (
    <AudiencePage
      title="Residential Services"
      servicesHeading="Our residential services"
      path="/residential-services"
      lead="Waste solutions for Alabama homeowners, from weekend cleanouts to septic pumping."
      body={[
        "As a leading waste management company in Alabama, Wise Environmental offers a range of residential waste solutions. Our residential curbside collection runs Monday through Friday.",
        "We're proud to support our community's sustainability with curbside residential recycling and yard waste service in most areas.",
      ]}
      image={{
        src: fleetYard,
        alt: "Wise Enviro roll-off truck carrying a pink 30-yard container",
      }}
      services={getServicesFor("residential")}
    />
  );
}
