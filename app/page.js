import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/common/ServicesSection";
import PopularTours from "@/components/home/PopularTours";
import TravelTypes from "@/components/home/TravelTypes";
import CTASection from "@/components/home/CTASection";
import TestimonialSection from "@/components/common/TestimonialSection";
import PartnersLogoSlider from "@/components/PartnersLogoSlider";
import FaqSection from "@/components/common/FaqSection";
import { getApiCollection } from "@/lib/api";
import { fallbackDestinations, normalizeDestinations } from "@/data/destinations";
import { normalizePackages, packages as fallbackPackages } from "@/data/packages";

export default async function Home() {
  const [
    banners,
    destinationResponse,
    packageResponse,
    testimonials,
    partners,
    faqs,
  ] = await Promise.all([
    getApiCollection("banners", []),
    getApiCollection("destinations", fallbackDestinations),
    getApiCollection("packages", fallbackPackages),
    getApiCollection("testimonials", []),
    getApiCollection("partners", []),

  ]);

  const destinations = normalizeDestinations(destinationResponse);
  const packages = normalizePackages(packageResponse);
  const popularItems = destinations.length ? destinations : packages;

  return (
    <>
      <HeroSection banners={banners} />
      <ServicesSection />
      <PopularTours destinations={popularItems} />
      <TravelTypes />
      <CTASection />
      <TestimonialSection testimonials={testimonials} />
      <PartnersLogoSlider logos={partners} />
    </>
  );
}
