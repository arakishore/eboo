import ServicePage from "@/components/common/ServicePage";
import { servicePages } from "@/data/services";

export const metadata = {
  title: "Cars | Eboo",
  description: "Explore Eboo car rental and transfer support.",
};

export default function CarsPage() {
  return <ServicePage service={servicePages.cars} />;
}
