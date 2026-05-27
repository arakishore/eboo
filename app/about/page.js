import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutStory from "@/components/about/AboutStory";
import PartnersLogoSlider from "@/components/PartnersLogoSlider";

export const metadata = {
  title: "About Us | Eboo",
  description:
    "Learn how Eboo creates memorable journeys with care, comfort, and local travel expertise.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutStory />
      <PartnersLogoSlider />
    </>
  );
}
