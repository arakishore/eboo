export const metadata = {
  title: "Flight | Eboo",
  description: "Explore Eboo Flight.",
};

//===
import HeroSection from "@/components/home/HeroSection";
import FlightEnquiryForm from "@/components/flights/FlightEnquiryForm";
import ServiceGalleryLightbox from "@/components/common/ServiceGalleryLightbox";
import { apiGet, getApiCollection, toApiImageUrl } from "@/lib/api";
import ServicesSection from "@/components/common/ServicesSection";

const flightFeatures = [
  "Domestic & International Flights",
  "Flexible Travel Dates",
  "Adult & Child Traveller Support",
  "Route Planning Assistance",
  "Right Solution & Guide",
  "24/7 Customer Support",
];

function getHomeBanners(banners) {
  const homeBanners = banners.filter(
    (banner) => String(banner?.page || "").trim().toLowerCase() === "flight"
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

export default async function FlightsPage() {
  const banners = await getApiCollection("banners", []);
  const flightGallery = await getServiceGallery("flight");
  const homeBanners = getHomeBanners(banners);

  return (
    <>
      <HeroSection banners={homeBanners} />

      <section className="service-detail-section">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="service-info-box h-100">
                <h2 className="navy">Find Helpful Flight Options For Your Journey</h2>
                <p>
                  Share your route, travel date, and passenger details. Our team will help you
                  review suitable flight options for your trip.
                </p>
                <p>
                  Whether it is domestic or international travel, we make flight planning easier
                  with clear communication and quick assistance.
                </p>
                <ul className="service-feature-list">
                  {flightFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <FlightEnquiryForm />
            </div>
          </div>
        </div>
      </section>
      <ServicesSection />            
      <section className="service-gallery-section">
        <div className="container">
          <div className="section-title text-center mb-5 pb-2   mx-auto">
            <h2 className="m-0">
              Flight <span>Gallery</span>
            </h2>
          </div>
          <ServiceGalleryLightbox
            images={flightGallery}
            title="Flight"
            emptyMessage="No flight gallery images found."
          />
        </div>
      </section>
      
    </>
  );
}
