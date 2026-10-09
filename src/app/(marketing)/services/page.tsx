import type { Metadata } from "next";

import citywalkPortable from "@/assets/images/citywalk-portable.jpg";
import { AudiencePage } from "@/components/sections/audience-page";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "All Services",
  description:
    "Every Wise Environmental service in one place: dumpsters, portable toilets, restroom and shower trailers, septic and commercial waste management in Alabama.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <AudiencePage
      title="All Services"
      servicesHeading="Everything we offer"
      path="/services"
      lead="Comprehensive waste and sanitation services throughout Alabama."
      body={[
        "Our commitment to exceptional value and expertise shows in the range of services we offer. Whatever the project, we'll match the right equipment and schedule to it.",
      ]}
      image={{
        src: citywalkPortable,
        alt: "Row of green Wise Environmental portable toilets under a downtown overpass",
      }}
      services={services}
    />
  );
}
