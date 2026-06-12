import { firstValue, normalizeSlug, toApiImageUrl } from "@/lib/api";
export const packageImageFallback = "/images/dummy-eboo.png";

export const packages = [];
export function normalizePackage(packageItem = {}, index = 0) {
  const title = firstValue(
    packageItem,
    ["title", "package_title"],
    `Travel Package ${index + 1}`
  );
  const hotel_category = packageItem.hotel_category || null;
  const meal_plan_type = packageItem.meal_plan_type || null;

  const meta_title = packageItem.meta_title || null;
  const meta_description = packageItem.meta_description || null;
  const meta_keywords = packageItem.meta_keywords || null;

  const destination = packageItem.destination || {};
  const destinationName = destination?.name || "";
  const destinationSlug = normalizeSlug(destination?.slug, "");
  const destinationCountry = destination?.country || "";
  const destinationCity = destination?.city || "";

  const categories = Array.isArray(packageItem.categories)
    ? packageItem.categories
      .map((category) => ({
        id: category?.id || "",
        name: category?.name || "",
        slug: normalizeSlug(category?.slug, ""),
      }))
      .filter((category) => category.name)
    : [];
  const itineraries = packageItem.itineraries || {};
  const inclusions = packageItem.inclusions || {};
  const exclusions = packageItem.exclusions || {};
  const facts = packageItem.facts || {};
  const featuredImage = toApiImageUrl(
    packageItem.featured_image,
    packageImageFallback
  );

  const bannerImage = toApiImageUrl(
    packageItem.banner_image,
    packageImageFallback
  );
  const gallery = [
    featuredImage,
    ...(Array.isArray(packageItem.gallery)
      ? packageItem.gallery.map((image) => toApiImageUrl(image, ""))
      : []),
  ]
    .filter(Boolean)
    .filter((image, index, self) => self.indexOf(image) === index);

  return {
    id: firstValue(packageItem, ["id", "package_id"], index + 1),
    title,
    meta_title,
    meta_description,
    meta_keywords,
    slug: normalizeSlug(
      firstValue(packageItem, ["slug", "url_slug", "seo_url", "alias"]),
      normalizeSlug(title, `package-${index + 1}`)
    ),
    featured_image: featuredImage,
    banner_image: bannerImage,
    gallery: gallery,
    duration: firstValue(
      packageItem,
      ["duration", "days", "no_of_days", "package_duration"],
      "3 days & 2 night"
    ),
    destination: {
      id: destination?.id || "",
      name: destinationName,
      slug: destinationSlug,
      country: destinationCountry,
      city: destinationCity,
    },
    categories,
    itineraries,
    inclusions,
    exclusions,
    meal_plan_type,
    hotel_category,
    facts,
    short_description: firstValue(
      packageItem,
      ["short_description", "description", "summary", "excerpt"],
      "A curated travel package with comfortable planning and memorable destination experiences."
    ),
    starting_price: firstValue(packageItem, ["starting_price", "price", "amount"], ""),
    sale_price: firstValue(packageItem, ["sale_price", "offer_price", "discount_price"], ""),
    reviews: firstValue(packageItem, ["reviews", "review_text", "total_reviews"], ""),
    raw: packageItem,
  };
}
export function normalizePackages(packageItems = []) {
  return packageItems.map((packageItem, index) => normalizePackage(packageItem, index));
}
