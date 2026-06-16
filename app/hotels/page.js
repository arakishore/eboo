export const metadata = {
  title: "Hotels | Eboo",
  description: "Explore Eboo hotel stay support and sample hotel enquiry information.",
};

import HeroSection from "@/components/home/HeroSection";
import HotelEnquiryForm from "@/components/hotels/HotelEnquiryForm";
import ServiceGalleryLightbox from "@/components/common/ServiceGalleryLightbox";
import { apiGet, getApiCollection, toApiImageUrl } from "@/lib/api";
import ServicesSection from "@/components/common/ServicesSection";

const hotelFeatures = [
  "Safety Hotel System",
  "Budget-Friendly Tour",
  "Expert Hotel Planning",
  "Fast Communication",
  "Right Solution & Guide",
  "24/7 Customer Support",
];

function getHomeBanners(banners) {
  const homeBanners = banners.filter(
    (banner) => String(banner?.page || "").trim().toLowerCase() === "hotel"
  );

  return homeBanners.length ? homeBanners : banners;
}

async function getServiceGallery(galleryType) {
  const response = await apiGet(`gallery?gallery_type=${galleryType}`, {
    fallback: { images: [] },
  });
  const images = Array.isArray(response.data?.images) ? response.data.images : [];

  return images
    .map((image) => ({
      id: image.id,
      src: toApiImageUrl(image.image),
    }))
    .filter((image) => image.src);
}

export default async function HotelsPage() {
  const banners = await getApiCollection("banners", []);
  const hotelGallery = await getServiceGallery("hotel");
  const homeBanners = getHomeBanners(banners);

  return (
    <>
      <HeroSection banners={homeBanners} />

      <section className="service-detail-section">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="service-info-box h-100">
                <h2 className="navy">We&apos;re Truely Dedicated To Make Your Travel Experience</h2>
                <p>
                  Top Tour Operators and Travel Agency. We offering in total 793 tours and holidays
                  throughout the world. Combined we have received 1532 customer reviews and an
                  average rating of 5 out of 5 stars.
                </p>
                <p>
                  Travel has helped us to understand the meaning of life and it has helped us become
                  better people. Each time we travel, we see the world with new eyes.
                </p>
                <ul className="service-feature-list">
                  {hotelFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <HotelEnquiryForm />
            </div>
          </div>
        </div>
      </section>
      <ServicesSection />
      <section className="service-gallery-section">
        <div className="container">
          <div className="section-title text-center mb-5 pb-2  mx-auto">
            <h2 className="m-0">
              Hotels <span>Gallery</span>
            </h2>
          </div>
          <ServiceGalleryLightbox
            images={hotelGallery}
            title="Hotel"
            emptyMessage="No hotel gallery images found."
          />
        </div>
      </section>

    </>
  );
}
