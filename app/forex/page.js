export const metadata = {
  title: "Forex | Eboo",
  description: "Explore Eboo forex support for currency and travel card enquiries.",
};

import ForexEnquiryForm from "@/components/forex/ForexEnquiryForm";
import ServiceGalleryLightbox from "@/components/common/ServiceGalleryLightbox";
import HeroSection from "@/components/home/HeroSection";
import { apiGet, getApiCollection, toApiImageUrl } from "@/lib/api";

const forexFeatures = [
  "Best Exchange Rates",
  "Zero Hidden Charges",
  "Multiple Currency Support",
  "Instant Currency Exchange",
  "Safe & Secure Transactions",
  "24/7 Customer Assistance",
];
function getHomeBanners(banners) {
  const homeBanners = banners.filter(
    (banner) => String(banner?.page || "").trim().toLowerCase() === "forex"
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

export default async function ForexPage() {
  const banners = await getApiCollection("banners", []);
  const forexGallery = await getServiceGallery("forex");
  const homeBanners = getHomeBanners(banners);

  return (
    <>
      <HeroSection banners={homeBanners} />

      <section className="service-detail-section">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="service-info-box h-100">
               <h2 className="navy">Reliable Foreign Currency Exchange Services</h2>
                <p>
                  Planning an international trip? We make foreign currency exchange simple, secure, and hassle-free. Whether you&apos;re travelling for a holiday, business trip, education, or medical purposes, we help you get the currency you need at competitive rates.
                </p>
                <p>
                  Our team provides quick assistance, transparent pricing, and guidance throughout the exchange process, ensuring you&apos;re travel-ready with confidence.
                </p>
                <ul className="service-feature-list">
                  {forexFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <ForexEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <section className="service-gallery-section">
        <div className="container">
          <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
            <h2 className="m-0">
              Forex <span>Gallery</span>
            </h2>
          </div>
          <ServiceGalleryLightbox
            images={forexGallery}
            title="Forex"
            emptyMessage="No forex gallery images found."
          />
        </div>
      </section>
    </>
  );
}
