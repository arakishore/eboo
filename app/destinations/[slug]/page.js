import Link from "next/link";
import { notFound } from "next/navigation";
import DestinationGallery from "@/components/destination/DestinationGallery";
import PackageCard from "@/components/packages/PackageCard";
import { fallbackDestinations, normalizeDestination } from "@/data/destinations";
import { normalizePackages, packages as fallbackPackages } from "@/data/packages";
import { getApiCollection, getApiItem, normalizeSlug } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return {
      title: "Destination Not Found | Eboo",
    };
  }

  return {
    title: `${destination.name || destination.title} | Eboo`,
    description: destination.description,
  };
}

async function getDestinationBySlug(slug) {
  const fallbackDestination = fallbackDestinations.find((item) => item.slug === slug) || null;
  const destinationResponse = await getApiItem(`destinations/${slug}`, fallbackDestination);

  return destinationResponse ? normalizeDestination(destinationResponse) : null;
}

function getNestedPackages(destination) {
  const raw = destination?.raw || {};
  const packageSource =
    raw.packages ||
    raw.package ||
    raw.tour_packages ||
    raw.destination_packages ||
    raw.related_packages ||
    [];

  return Array.isArray(packageSource) ? packageSource : [];
}

function packageBelongsToDestination(packageItem, destination) {
  const destinationName = normalizeSlug(destination.name || destination.title);
  const destinationCountry = normalizeSlug(destination.country);
  const destinationCity = normalizeSlug(destination.city);
  const destinationId = String(destination.id || "");

  const packageDestination = normalizeSlug(packageItem.destination?.name);
  const packageCountry = normalizeSlug(packageItem.destination?.country);
  const packageCity = normalizeSlug(packageItem.destination?.city);
  const packageDestinationSlug = normalizeSlug(packageItem.destination?.slug);
  const packageDestinationId = String(packageItem.destination?.id || "");

  const rawDestination = packageItem.raw?.destination;
  const rawDestinationName = normalizeSlug(rawDestination?.name || rawDestination?.title);
  const rawDestinationId = String(rawDestination?.id || "");
  const rawDestinationSlug = normalizeSlug(rawDestination?.slug);

  return (
    (destinationId && packageDestinationId && destinationId === packageDestinationId) ||
    (destinationId && rawDestinationId && destinationId === rawDestinationId) ||
    (destination.slug && packageDestinationSlug === destination.slug) ||
    (destination.slug && rawDestinationSlug === destination.slug) ||
    (destinationName && packageDestination === destinationName) ||
    (destinationName && rawDestinationName === destinationName) ||
    (destinationCountry && packageDestination === destinationCountry) ||
    (destinationCountry && packageCountry === destinationCountry) ||
    (destinationCity && packageCity === destinationCity)
  );
}

async function getDestinationPackages(destination) {
  const nestedPackages = getNestedPackages(destination);

  if (nestedPackages.length) {
    return normalizePackages(nestedPackages);
  }

  const packageResponse = await getApiCollection("packages", fallbackPackages);
  const allPackages = normalizePackages(packageResponse);

  return allPackages.filter((packageItem) =>
    packageBelongsToDestination(packageItem, destination)
  );
}

export default async function DestinationDetailPage({ params }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const destinationPackages = await getDestinationPackages(destination);
  const pageTitle = destination.name || destination.title;
  const locationLabel = [destination.city, destination.country].filter(Boolean).join(", ");

  return (
    <>
      <section
        className="breadcrumb-main pb-0"
        style={{ backgroundImage: `url(${destination.banner_image || "/images/bg/bg8.jpg"})` }}
      >
        <div className="breadcrumb-outer pt-10">
          <div className="container">
            <div className="breadcrumb-content bread-content pt-10">
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/destinations">Destinations</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {pageTitle}
                  </li>
                </ul>
              </nav>
              <h1 className="mb-0 white text-uppercase">{pageTitle}</h1>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>

      <section className="destination-category-intro">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="destination-category-image">
                <img src={destination.image} alt={pageTitle} />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="destination-category-content">
                <span className="contact-kicker">Destination</span>
                <h2>{pageTitle}</h2>
                <p className="pink mb-3">
                  <i className="fa fa-map-marker mr-1" aria-hidden="true"></i>
                  {locationLabel || destination.location || destination.country}
                </p>
                <p>{destination.description}</p>
                <div className="destination-category-actions">
                  <a href="#destination-packages" className="nir-btn mr-2">
                    View Packages
                  </a>
                  <Link href="/contact" className="nir-btn-black">
                    Enquire Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog trending destination-b" id="destination-packages">
        <div className="container">
          <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
            <h2 className="m-0">
              Packages in <span>{pageTitle}</span>
            </h2>
            <p className="mb-0">
              Choose a package for this destination and continue to the full package detail page.
            </p>
          </div>
          <div className="trend-box">
            <div className="row">
              {destinationPackages.length ? (
                destinationPackages.map((packageItem, index) => (
                  <PackageCard
                    key={packageItem.id || packageItem.slug}
                    packageItem={packageItem}
                    revealDelay={index * 0.08}
                  />
                ))
              ) : (
                <div className="col-lg-12">
                  <div className="destination-empty-state text-center bg-white">
                    <h3>No packages found</h3>
                    <p className="mb-0">
                      We do not have packages listed for this destination yet. Please enquire and
                      our team will help you plan a custom trip.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="destination-gallery-section">
        <div className="container">
          <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
            <h2 className="m-0">
              Destination <span>Gallery</span>
            </h2>
            <p className="mb-0">
              A quick look at the places and experiences connected with this destination.
            </p>
          </div>
          <DestinationGallery destination={destination} />
        </div>
      </section>

      <section className="destination-enquiry-cta bg-navy">
        <div className="container d-md-flex align-items-center justify-content-between">
          <div>
            <h3 className="white mb-1">Need help choosing a package?</h3>
            <p className="white mb-0">
              Tell us your travel dates and preferences for {pageTitle}, and we will guide you.
            </p>
          </div>
          <Link href="/contact" className="nir-btn mt-3 mt-md-0">
            Enquire Now
          </Link>
        </div>
      </section>
    </>
  );
}
