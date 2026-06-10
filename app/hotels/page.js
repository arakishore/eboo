export const metadata = {
  title: "Hotels | Eboo",
  description: "Explore Eboo hotel stay support and sample hotel enquiry information.",
};

import HeroSection from "@/components/home/HeroSection";
import HotelEnquiryForm from "@/components/hotels/HotelEnquiryForm";
import { getApiCollection } from "@/lib/api";

const hotelFeatures = [
  "Safety Hotel System",
  "Budget-Friendly Tour",
  "Expert Hotel Planning",
  "Fast Communication",
  "Right Solution & Guide",
  "24/7 Customer Support",
];

const hotelGallery = [
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
    (banner) => String(banner?.page || "").trim().toLowerCase() === "hotel"
  );

  return homeBanners.length ? homeBanners : banners;
}

export default async function HotelsPage() {
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

      <section className="service-gallery-section">
        <div className="container">
          <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
            <h2 className="m-0">
              Hotels <span>Gallery</span>
            </h2>
          </div>
          <div className="row">
            {hotelGallery.map((image, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={image}>
                <div className="service-gallery-item">
                  <img src={image} alt={`Hotel gallery ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
