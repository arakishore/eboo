import PageBanner from "@/components/common/PageBanner";
import Link from "next/link";
import DestinationCard from "@/components/destination/DestinationCard";
import { fallbackDestinations, normalizeDestinations } from "@/data/destinations";
import { normalizePackages, packages as fallbackPackages } from "@/data/packages";
import { getApiCollection } from "@/lib/api";

function getFormattedPrice(price) {
  if (price === undefined || price === null || price === "") {
    return "";
  }

  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice)) {
    return "";
  }

  return `\u20B9${numericPrice.toLocaleString("en-IN")}`;
}

function getRelatedTourColumnClass(index) {
  return index < 3 ? "col-lg-4 col-md-6 p-1" : "col-lg-3 col-md-6 p-1";
}

function Rating() {
  return (
    <div className="rating mb-1">
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
    </div>
  );
}

function RelatedTourCard({ image, title, duration, price, slug, columnClass }) {
  return (
    <div className={columnClass}>
      <div className="desti-image">
        <img src={image} alt="desti" />
        <div className="desti-content">
          <Rating />
          <h4 className="white mb-1">{title}</h4>
          <div className="trend-last-main">
            <div className="trend-last">
              <p className="mb-1 white">
                <i className="fa fa-clock-o" aria-hidden="true"></i> {duration}
              </p>
              <div className="trend-price">
                <p className="price pink mb-0">
                  From <span>{price || "On Request"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="desti-overlay">
          <Link href={`/packages/${slug}`} className="nir-btn">
            <span className="white">Book Now</span>
            <i className="fa fa-arrow-right white pl-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Destinations | Eboo",
  description: "Explore destination tour packages from Eboo.",
};

export default async function DestinationsPage() {
  const destinationResponse = await getApiCollection("destinations", fallbackDestinations);
  const destinations = normalizeDestinations(destinationResponse);
  const featuredPackageResponse = await getApiCollection("packages?featured=1", fallbackPackages);
  const featuredPackages = normalizePackages(featuredPackageResponse);
  const relatedTours = featuredPackages.map((packageItem, index) => ({
    image: packageItem.featured_image,
    title: packageItem.title,
    duration: packageItem.duration,
    price: getFormattedPrice(packageItem.sale_price || packageItem.starting_price),
    slug: packageItem.slug,
    columnClass: getRelatedTourColumnClass(index),
  }));

  return (
    <>
    <PageBanner title="Destinations" breadcrumbLabel="Destinations" />
      <section className="blog trending destination-b">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <div className="trend-box">
                <div className="row">
                  {destinations.length ? (
                    destinations.map((destination) => (
                      <DestinationCard key={destination.slug} {...destination} />
                    ))
                  ) : (
                    <div className="col-lg-12">
                      <p className="text-center mb-0">No destinations found.</p>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="top-destination overflow-hidden">
        <div className="container">
          <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
            <h2 className="m-0 white">
              Featured <span>Tour Packages</span>
            </h2>
            <p className="mb-0 white">
              Travel has helped us to understand the meaning of life and it has helped us become
              better people. Each time we travel, we see the world with new eyes.
            </p>
          </div>
          <div className="desti-inner">
            <div className="row d-flex align-items-center">
              {relatedTours.length ? (
                relatedTours.map((tour) => (
                  <RelatedTourCard key={tour.slug} {...tour} />
                ))
              ) : (
                <div className="col-lg-12">
                  <p className="text-center mb-0 white">No featured packages found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
