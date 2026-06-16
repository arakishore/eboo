export const metadata = {
  title: "Visa Assistance | Eboo",
  description: "Explore Eboo Visa Assistance :Tourist, business and student visa support.",
};

import HeroSection from "@/components/home/HeroSection";
import VisaEnquiryForm from "@/components/visa/VisaEnquiryForm";
import ServiceGalleryLightbox from "@/components/common/ServiceGalleryLightbox";
import { apiGet, getApiCollection, getCountries, toApiImageUrl } from "@/lib/api";
import ServicesSection from "@/components/common/ServicesSection";

const visaFeatures = [
  "Visa Application Assistance",
  "Document Review & Verification",
  "Tourist, Business & Student Visas",
  "Quick & Hassle-Free Processing",
  "Expert Travel Guidance",
  "24/7 Customer Support",
];

function getHomeBanners(banners) {
  const homeBanners = banners.filter(
    (banner) => String(banner?.page || "").trim().toLowerCase() === "visa"
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

export default async function VisaPage() {
  const [banners, visaGallery, countries] = await Promise.all([
    getApiCollection("banners", []),
    getServiceGallery("visa"),
    getCountries(),
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
                  Your Trusted Partner for Visa Assistance
                </h2>

                <p>
                  We help travelers navigate visa requirements for destinations around the
                  world with professional guidance, document support, and timely assistance.
                </p>

                <p>
                  From tourist and business visas to student and family visit visas, our team
                  is committed to making your travel preparation simple, efficient, and
                  stress-free.
                </p>
                <ul className="service-feature-list">
                  {visaFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <VisaEnquiryForm countries={countries} />
            </div>
          </div>
        </div>
      </section>
      <ServicesSection />
      <section className="service-gallery-section">
        <div className="container">
          <div className="section-title text-center mb-5 pb-2  mx-auto">
            <h2 className="m-0">
              Visa <span>Gallery</span>
            </h2>
          </div>
          <ServiceGalleryLightbox
            images={visaGallery}
            title="Visa Assistance"
            emptyMessage="No Visa Assistance gallery images found."
          />
        </div>
      </section>

    </>
  );
}
