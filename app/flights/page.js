import ServicePage from "@/components/common/ServicePage";
import { servicePages } from "@/data/services";

export const metadata = {
  title: "Flights | Eboo",
  description: "Explore Eboo flight booking support and sample flight enquiry information.",
};

export default function FlightsPage() {
  return <ServicePage service={servicePages.flights} />;
}
