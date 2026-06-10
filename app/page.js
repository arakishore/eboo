import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/common/ServicesSection";
import PopularTours from "@/components/home/PopularTours";
import TravelTypes from "@/components/home/TravelTypes";
import CTASection from "@/components/home/CTASection";
import { getApiCollection } from "@/lib/api";
import { fallbackDestinations, normalizeDestinations } from "@/data/destinations";
import { normalizePackages, packages as fallbackPackages } from "@/data/packages";

function getHomeBanners(banners) {
  const homeBanners = banners.filter(
    (banner) => String(banner?.page || "").trim().toLowerCase() === "home"
  );

  return homeBanners.length ? homeBanners : banners;
}

export default async function Home() {
  const [
    banners,
    destinationResponse,
    packageResponse,
  ] = await Promise.all([
    getApiCollection("banners", []),
    getApiCollection("destinations", fallbackDestinations),
    getApiCollection("packages", fallbackPackages),
    getApiCollection("testimonials", []),
  ]);

  const destinations = normalizeDestinations(destinationResponse);
  const packages = normalizePackages(packageResponse);
  const popularItems = destinations.length ? destinations : packages;
  const homeBanners = getHomeBanners(banners);

  return (
    <>
      <HeroSection banners={homeBanners} />
      <ServicesSection />
      <PopularTours destinations={popularItems} />
      <TravelTypes />
      <CTASection />
      {/* <TestimonialSection testimonials={testimonials} /> */}
    </>
  );
}
