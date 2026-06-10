export const metadata = {
  title: "Forex | Eboo",
  description: "Explore Eboo forex support for currency and travel card enquiries.",
};

import ForexEnquiryForm from "@/components/forex/ForexEnquiryForm";
import HeroSection from "@/components/home/HeroSection";
import { getApiCollection } from "@/lib/api";

const forexFeatures = [
  "Best Exchange Rates",
  "Zero Hidden Charges",
  "Multiple Currency Support",
  "Instant Currency Exchange",
  "Safe & Secure Transactions",
  "24/7 Customer Assistance",
];
const forexGallery = [
  "/images/dummy-eboo.png",
  "/images/dummy-eboo.png",
  "/images/dummy-eboo.png",
  "/images/dummy-eboo.png",
  "/images/dummy-eboo.png",
  "/images/dummy-eboo.png",
  "/images/dummy-eboo.png",
];

function getHomeBanners(banners) {
  const homeBanners = banners.filter(
    (banner) => String(banner?.page || "").trim().toLowerCase() === "forex"
  );

  return homeBanners.length ? homeBanners : banners;
}

export default async function ForexPage() {
  const banners = await getApiCollection("banners", []);
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
          <div className="row">
            {forexGallery.map((image, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={`image${index}`}>
                <div className="service-gallery-item">
                  <img src={image} alt={`Forex gallery ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
