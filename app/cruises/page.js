import ServicePage from "@/components/common/ServicePage";
import { servicePages } from "@/data/services";

export const metadata = {
  title: "Cruises | Eboo",
  description: "Explore Eboo cruise holiday support and sample cruise enquiry information.",
};

export default function CruisesPage() {
  return <ServicePage service={servicePages.cruises} />;
}
