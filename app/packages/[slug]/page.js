import Link from "next/link";
import { notFound } from "next/navigation";
import PackageEnquiryModal from "@/components/packages/PackageEnquiryModal";
import {
  normalizePackage,
  packageImageFallback,
  packages as fallbackPackages,
} from "@/data/packages";
import { getApiItem } from "@/lib/api";

//const itinerary = [];

export function generateStaticParams() {
  return fallbackPackages.map((packageItem) => ({
    slug: packageItem.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const fallbackPackage = fallbackPackages.find((item) => item.slug === slug) || null;
  const packageResponse = await getApiItem(`packages/${slug}`, fallbackPackage);
  const packageItem = packageResponse ? normalizePackage(packageResponse) : null;

  if (!packageItem) {
    return {
      title: "Package Not Found | Eboo",
    };
  }

  return {
    title:
      packageItem.meta_title ||
      `${packageItem.title} | Eboo`,

    description:
      packageItem.meta_description ||
      packageItem.short_description,

    keywords: packageItem.meta_keywords || "",
  };
}

function ItineraryItem({
  day,
  day_number,
  title,
  description,
  meals,
  overnight_stay,
  active = false,
}) {
  const dayLabel = day || day_number;

  return (
    <div className={`accrodion ${active ? "active" : ""}`}>
      <div className="accrodion-title">
        <h5 className="mb-0">
          <span>Day {dayLabel}</span> - {title}
        </h5>
      </div>

      <div
        className="accrodion-content"
        style={{ display: active ? "block" : "none" }}
      >
        <div className="inner">
          {description ? <p>{description}</p> : null}

          {meals ? (
            <p className="mb-1">
              <strong>Meals:</strong> {meals}
            </p>
          ) : null}

          {overnight_stay ? (
            <p className="mb-0">
              <strong>Overnight Stay:</strong> {overnight_stay}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default async function PackageDetailPage({ params }) {
  const { slug } = await params;
  const fallbackPackage = fallbackPackages.find((item) => item.slug === slug) || null;
  const packageResponse = await getApiItem(`packages/${slug}`, fallbackPackage);
  const packageItem = packageResponse ? normalizePackage(packageResponse) : null;
  const itinerary = packageItem?.itineraries || [];
  if (!packageItem) {
    notFound();
  }

  const destinationName = packageItem.destination?.name || "";
  const galleryImages = [
    packageItem.featured_image
  ];
  console.log(packageItem);
  return (
    <>
      <div
        className="breadcrumb-main pb-0"
        style={{ backgroundImage: "url(/images/bg/bg8.jpg)" }}
      >
        <div className="breadcrumb-outer pt-10">
          <div className="container">
            <div className="breadcrumb-content bread-content pt-10">
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Package Detail
                  </li>
                </ul>
              </nav>
              <h2 className="mb-0 white text-uppercase">{packageItem.title}</h2>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </div>

      <div className="tabs-navbar1 bg-white sticky1 p-4">
        <div className="row">
          <div className="col-md-12">
            <ul id="tabs" className="nav nav-tabs bordernone">
              <li className="active">
                <a data-toggle="tab" href="#description">
                  Highlight
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#itinerary">
                  Itinerary
                </a>
              </li>
              <li>
                <a href="#" data-toggle="modal" data-target="#packageEnquiryModal">
                  Ask About This Package
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className="blog trending destination-b">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="single-content">
                <div className="description-images mb-4">
                  <div className="thumbnail-images">
                    <div className="slider-store">
                      {galleryImages.map((image, index) => (
                        <div key={`store-${image}-${index}`}>
                          <img src={image} alt={packageItem.title} />
                        </div>
                      ))}
                    </div>
                    <div className="slider-thumbs">
                      {galleryImages.map((image, index) => (
                        <div key={`thumb-${image}-${index}`}>
                          <img src={image} alt={packageItem.title} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="description" id="description">
                  <div className="single-full-title border-b mb-2 pb-2">
                    <div className="single-title">
                      <h3 className="mb-1">{packageItem.title}</h3>
                      <div className="rating-main d-sm-flex align-items-center">
                        <p className="mb-0 mr-2">
                          <i className="flaticon-location-pin"></i> {destinationName}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="description-inner mb-2">
                    <h4>Package  Highlight</h4>
                    <p>{packageItem.short_description}</p>
                  </div>

                  <div className="tour-includes mb-2">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <i className="fa fa-clock-o pink mr-1"></i>
                            {packageItem.duration}
                          </td>

                          <td>
                            <i className="fa fa-tag pink mr-1"></i>

                            {packageItem.sale_price &&
                              Number(packageItem.sale_price) > 0 &&
                              Number(packageItem.sale_price) < Number(packageItem.starting_price) ? (
                              <>
                                <span className="text-muted mr-2">
                                  <del>₹{Number(packageItem.starting_price).toLocaleString("en-IN")}</del>
                                </span>

                                <strong>
                                  ₹{Number(packageItem.sale_price).toLocaleString("en-IN")}
                                </strong>
                              </>
                            ) : (
                              <strong>
                                ₹{Number(
                                  packageItem.starting_price || packageItem.sale_price
                                ).toLocaleString("en-IN")}
                              </strong>
                            )}
                          </td>
                        </tr>
                        <tr className="">
                          {packageItem.hotel_category?.name && (
                            <td>
                              <i className="fa fa-hotel pink mr-1"></i>{"Hotel Category: "}
                              {packageItem.hotel_category.name}
                            </td>
                          )}

                          {packageItem.meal_plan_type?.name && (
                            <td>
                              <i className="fa fa-cutlery pink mr-1"></i>{"Meal Plan Type: "}
                              {packageItem.meal_plan_type.name}
                            </td>
                          )}
                        </tr>

                        {packageItem.facts?.length > 0 &&
                          packageItem.facts.map((fact) => (
                            <tr key={fact.id}>
                              <td>
                                <strong>{fact.name}</strong>
                              </td>
                              <td>{fact.value}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="description-inner mb-2">

                    <div className="row">
                      <div className="col-lg-6 col-md-6 mb-2 pr-2">

                        {packageItem.inclusions?.length > 0 && (
                          <div className="desc-box">
                            <h5 className="mb-1">Price Includes</h5>
                            <ul>
                              {packageItem.inclusions.map((item) => (
                                <li key={item.id}>
                                  <i className="fa fa-check pink mr-1"></i>
                                  {item.title || item.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      </div>
                      <div className="col-lg-6 col-md-6 mb-2 pl-2">

                        {packageItem.exclusions?.length > 0 && (
                          <div className="desc-box">
                            <h5 className="mb-1">Price Excludes</h5>
                            <ul>
                              {packageItem.exclusions.map((item) => (
                                <li key={item.id}>
                                  <i className="fa fa-close pink mr-1"></i>
                                  {item.title || item.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>

                </div>

                <div
                  className="accrodion-grp faq-accrodion mb-4"
                  id="itinerary"
                  data-grp-name="faq-accrodion"
                >
                  <h4>Tour Itinerary</h4>
                  {itinerary.length > 0 && itinerary.map((item, index) => (
                    <ItineraryItem
                      key={item.id || `${item.day_number}-${item.title}`}
                      {...item}
                      active={index === 0}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <PackageEnquiryModal packageItem={packageItem} />
    </>
  );
}
