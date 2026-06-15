import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import { apiGet, toApiImageUrl } from "@/lib/api";

export const metadata = {
  title: "About Us | Eboo",
  description:
    "Learn how Eboo creates memorable journeys with care, comfort, and local travel expertise.",
};

async function getAboutGallery() {
  const response = await apiGet("gallery?gallery_type=about", {
    fallback: { images: [] },
  });
  const images = Array.isArray(response.data?.images) ? response.data.images : [];

  return images
    .map((image, index) => ({
      id: image.id ?? index,
      src: toApiImageUrl(image.image, ""),
      alt: image.alt || image.title || `About gallery image ${index + 1}`,
    }))
    .filter((image) => image.src);
}

export default async function AboutPage() {
  const aboutGallery = await getAboutGallery();

  return (
    <>
      <AboutHero images={aboutGallery} />
      <AboutIntro />
    </>
  );
}
