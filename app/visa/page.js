import ServicePage from "@/components/common/ServicePage";
import { servicePages } from "@/data/services";

export const metadata = {
  title: "Visa | Eboo",
  description: "Explore Eboo visa documentation and application support.",
};

export default function VisaPage() {
  return <ServicePage service={servicePages.visa} />;
}
