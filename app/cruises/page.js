export const metadata = {
  title: "Cruises | Eboo",
  description: "Explore Eboo cruise holiday planning and cruise enquiry support.",
};

import HeroSection from "@/components/home/HeroSection";
import CruiseEnquiryForm from "@/components/cruises/CruiseEnquiryForm";
import ServiceGalleryLightbox from "@/components/common/ServiceGalleryLightbox";
import { apiGet, getApiCollection, toApiImageUrl } from "@/lib/api";

const cruiseFeatures = [
  "Ocean & River Cruise Planning",
  "Luxury Cabin Guidance",
  "Family & Honeymoon Cruises",
  "Route & Departure Support",
  "Onboard Experience Advice",
  "24/7 Customer Support",
];

function getHomeBanners(banners) {
  const homeBanners = banners.filter(
    (banner) => String(banner?.page || "").trim().toLowerCase() === "cruise"
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

export default async function CruisesPage() {
  const [banners, cruiseGallery] = await Promise.all([
    getApiCollection("banners", []),
    getServiceGallery("cruise"),
  ]);
  const homeBanners = getHomeBanners(banners);

  return (
    <>
      <HeroSection banners={homeBanners} />

      <section className="service-detail-section">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="service-info-box h-100">
                <h2 className="navy">
                  Curated Cruise Holidays for Every Traveller
                </h2>

                <p>
                  From ocean voyages to river cruises, we help you choose the right route,
                  departure date, cabin style, and onboard experience for your travel plans.
                </p>

                <p>
                  Whether you are planning a family trip, honeymoon, luxury sailing, or
                  adventure cruise, our team guides you through the options with clear support.
                </p>
                <ul className="service-feature-list">
                  {cruiseFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <CruiseEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <section className="service-gallery-section">
        <div className="container">
          <div className="section-title text-center mb-5 pb-2  mx-auto">
            <h2 className="m-0">
              Cruise <span>Gallery</span>
            </h2>
          </div>
          <ServiceGalleryLightbox
            images={cruiseGallery}
            title="Cruise"
            emptyMessage="No cruise gallery images found."
          />
        </div>
      </section>

    </>
  );
}
