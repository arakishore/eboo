import ServicePage from "@/components/common/ServicePage";
import { servicePages } from "@/data/services";

export const metadata = {
  title: "MICE | Eboo",
  description: "Explore Eboo MICE, corporate travel, and event support.",
};

export default function MicePage() {
  return <ServicePage service={servicePages.mice} />;
}
