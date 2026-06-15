import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import { firstValue, getApiCollection, toApiImageUrl } from "@/lib/api";

export const metadata = {
  title: "About Us | Eboo",
  description:
    "Learn how Eboo creates memorable journeys with care, comfort, and local travel expertise.",
};

function getAboutBanners(banners) {
  const aboutBanners = banners.filter(
    (banner) => String(banner?.page || "").trim().toLowerCase() === "about"
  );

  return (aboutBanners.length ? aboutBanners : banners)
    .map((banner, index) => ({
      id: banner.id ?? index,
      src: toApiImageUrl(firstValue(banner, ["image", "background_image", "banner_image"]), ""),
      alt: firstValue(banner, ["alt", "title", "name"], `About banner image ${index + 1}`),
    }))
    .filter((banner) => banner.src);
}

export default async function AboutPage() {
  const banners = await getApiCollection("banners", []);
  const aboutBanners = getAboutBanners(banners);

  return (
    <>
      <AboutHero images={aboutBanners} />
     
      <AboutIntro />
    </>
  );
}
