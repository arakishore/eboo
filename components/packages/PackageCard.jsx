import Link from "next/link";
import { packageImageFallback } from "@/data/packages";

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

function getDisplayValue(value) {
  if (Array.isArray(value)) {
    return getDisplayValue(value[0]);
  }

  if (value && typeof value === "object") {
    return (
      value.title ||
      value.name ||
      value.category_name ||
      value.label ||
      value.slug ||
      ""
    );
  }

  return value ? String(value) : "";
}


function getPackageBadges(categories) {
  if (!Array.isArray(categories)) {
    return [];
  }

  return categories
    .map((category) => category?.name)
    .filter(Boolean)
    .slice(0, 2);
}

function PackagePriceBadge({ startingPrice, salePrice }) {
  const numericStartingPrice = Number(startingPrice);
  const numericSalePrice = Number(salePrice);

  const hasStartingPrice =
    startingPrice !== undefined &&
    startingPrice !== null &&
    startingPrice !== "" &&
    Number.isFinite(numericStartingPrice);

  const hasSalePrice =
    salePrice !== undefined &&
    salePrice !== null &&
    salePrice !== "" &&
    Number.isFinite(numericSalePrice);

  const hasDiscount =
    hasStartingPrice &&
    hasSalePrice &&
    numericSalePrice > 0 &&
    numericSalePrice < numericStartingPrice;

  if (!hasStartingPrice && !hasSalePrice) {
    return (
      <div className="package-card-price-badge package-card-price-request">
        On Request
      </div>
    );
  }

  const currentPrice = hasDiscount
    ? getFormattedPrice(numericSalePrice)
    : getFormattedPrice(numericStartingPrice || numericSalePrice);

  return (
    <div className="package-card-price-badge" aria-label="Package price">
      <span className="package-card-price-label">From</span>

      <span className="package-card-price-current">{currentPrice}</span>

      {hasDiscount ? (
        <span className="package-card-price-old">
          {getFormattedPrice(numericStartingPrice)}
        </span>
      ) : null}
    </div>
  );
}

export default function PackageCard({ packageItem }) {
  const {
    title,
    slug,
    featured_image,
    duration,
    destination,
    categories,
    short_description: shortDescription,
    starting_price,
    sale_price,
  } = packageItem;
  const badges = getPackageBadges(categories);
  const locationName = [destination?.country, destination?.city]
    .filter(Boolean)
    .join(", ");
  const imageUrl = featured_image || packageItem.image || packageImageFallback;
  const categoriesTag = Array.isArray(packageItem.categories)
    ? packageItem.categories
    : [];




  return (
    <div className="col-lg-4 col-md-6 col-xs-12 mb-4">
      <article className="package-modern-card">
        <div className="package-modern-image">
          <img src={imageUrl} alt={title} />

          {categoriesTag.length ? (
            <div className="package-card-badges" aria-label="Package tags">
              {categoriesTag.slice(0, 2).map((category) => (
                <span className="package-card-badge" key={category.id}>
                  {category.name}
                </span>
              ))}
            </div>
          ) : null}

          <PackagePriceBadge startingPrice={starting_price} salePrice={sale_price} />
        </div>

        <div className="package-modern-body">
          <h4 className="package-modern-title">
            <Link href={`/packages/${slug}`}>{title}</Link>
          </h4>

          <div className="package-modern-meta">
            <span>
              <i className="fa fa-clock-o" aria-hidden="true"></i>
              {duration}
            </span>
            <span>
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              {locationName || destination?.name || "Unknown Location"}
            </span>
          </div>

          <p className="package-modern-description">{shortDescription}</p>

          <div className="package-modern-action">
            <Link href={`/packages/${slug}`} className="nir-btn">
              View Details <i className="fa fa-long-arrow-alt-right"></i>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
