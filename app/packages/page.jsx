import Link from "next/link";
import PackageCard from "@/components/packages/PackageCard";
import { normalizePackages, packages as fallbackPackages } from "@/data/packages";
import { getApiCollection } from "@/lib/api";

const relatedPackages = [
  {
    image: "/images/destination/destination3.jpg",
    title: "New York Package",
    slug: "nepal-himalayan-escape",
    columnClass: "col-lg-4 col-md-6 p-1",
  },
  {
    image: "/images/destination/destination4.jpg",
    title: "Armania Package",
    slug: "paris-city-lights-tour",
    columnClass: "col-lg-4 col-md-6 p-1",
  },
  {
    image: "/images/destination/destination10.jpg",
    title: "London Package",
    slug: "bali-island-retreat",
    columnClass: "col-lg-4 col-md-6 p-1",
  },
  {
    image: "/images/destination/destination5.jpg",
    title: "Manchester Package",
    slug: "dubai-premium-getaway",
    columnClass: "col-lg-3 col-md-6 p-1",
  },
  {
    image: "/images/destination/destination7.jpg",
    title: "Kathmandu Package",
    slug: "spanish-riviera-journey",
    columnClass: "col-lg-3 col-md-6 p-1",
  },
  {
    image: "/images/destination/destination8.jpg",
    title: "Tokyo Package",
    slug: "egypt-heritage-explorer",
    columnClass: "col-lg-3 col-md-6 p-1",
  },
  {
    image: "/images/destination/destination9.jpg",
    title: "Norwich Package",
    slug: "nepal-himalayan-escape",
    columnClass: "col-lg-3 col-md-6 p-1",
  },
];

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

function RelatedPackageCard({ image, title, slug, columnClass }) {
  return (
    <div className={columnClass}>
      <div className="desti-image">
        <img src={image} alt={title} />
        <div className="desti-content">
          <Rating />
          <h4 className="white mb-1">{title}</h4>
          <div className="trend-last-main">
            <div className="trend-last">
              <p className="mb-1 white">
                <i className="fa fa-clock-o" aria-hidden="true"></i> 3 days &amp; 2 night
              </p>
              <div className="trend-price">
                <p className="price pink mb-0">
                  From <span>$350.00</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="desti-overlay">
          <Link href={`/packages/${slug}`} className="nir-btn">
            <span className="white">View Details</span>
            <i className="fa fa-arrow-right white pl-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Packages | Eboo",
  description:
    "Browse Eboo travel packages with destinations, durations, and guided tour details.",
};

export default async function PackagesPage() {
  const packageResponse = await getApiCollection("packages", fallbackPackages);
  const packages = normalizePackages(packageResponse);

  return (
    <>
      <section
        className="breadcrumb-main pb-0"
        style={{ backgroundImage: "url(/images/bg/bg8.jpg)" }}
      >
        <div className="breadcrumb-outer pt-10">
          <div className="container">
            <div className="breadcrumb-content d-md-flex align-items-center pt-10">
              <h2 className="mb-0">Package Full</h2>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Package Full
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>

      <section className="blog trending destination-b">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <div className="trend-box">
                <div className="row">
                  {packages.length ? (
                    packages.map((packageItem) => (
                      <PackageCard key={packageItem.id} packageItem={packageItem} />
                    ))
                  ) : (
                    <div className="col-lg-12">
                      <p className="text-center mb-0">No packages found.</p>
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
              Related <span>Tour Packages</span>
            </h2>
            <p className="mb-0 white">
              Travel has helped us to understand the meaning of life and it has helped us become
              better people. Each time we travel, we see the world with new eyes.
            </p>
          </div>
          <div className="desti-inner">
            <div className="row d-flex align-items-center">
              {relatedPackages.map((packageItem) => (
                <RelatedPackageCard key={packageItem.title} {...packageItem} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
