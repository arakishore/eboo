import ServicePage from "@/components/common/ServicePage";
import { servicePages } from "@/data/services";

export const metadata = {
  title: "Forex | Eboo",
  description: "Explore Eboo forex and travel currency assistance.",
};

export default function ForexPage() {
  return <ServicePage service={servicePages.forex} />;
}
