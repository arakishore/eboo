import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/common/ServicesSection";
import PopularTours from "@/components/home/PopularTours";
import TravelTypes from "@/components/home/TravelTypes";
import CTASection from "@/components/home/CTASection";
import TestimonialSection from "@/components/common/TestimonialSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PopularTours />
      <TravelTypes />
      <CTASection />
      <TestimonialSection />
    </>
  );
}