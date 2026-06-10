import { firstValue, normalizeSlug, toApiImageUrl } from "@/lib/api";

export const packageImageFallback = "/images/dummy-eboo.png";

export const packages = [
  {
    id: 1,
    title: "Nepal Himalayan Escape",
    slug: "nepal-himalayan-escape",
    featured_image: "/images/trending/trending8.jpg",
    duration: "6 Days / 5 Nights",
    destination: {
      name: "Nepal",
      slug: "nepal",
      country: "Nepal",
      city: "",
    },
    short_description:
      "A scenic mountain journey with peaceful stays, local culture, and guided valley experiences.",
  },
  {
    id: 2,
    title: "Paris City Lights Tour",
    slug: "paris-city-lights-tour",
    featured_image: "/images/trending/trending11.jpg",
    duration: "5 Days / 4 Nights",
    destination: {
      name: "France",
      slug: "france",
      country: "France",
      city: "Paris",
    },
    short_description:
      "Explore iconic Paris landmarks, charming neighborhoods, curated cafes, and romantic evening views.",
  },
  {
    id: 3,
    title: "Bali Island Retreat",
    slug: "bali-island-retreat",
    featured_image: "/images/trending/trending4.jpg",
    duration: "7 Days / 6 Nights",
    destination: {
      name: "Indonesia",
      slug: "indonesia",
      country: "Indonesia",
      city: "Bali",
    },
    short_description:
      "A relaxed tropical itinerary with beaches, temples, rice terraces, and private leisure time.",
  },
  {
    id: 4,
    title: "Dubai Premium Getaway",
    slug: "dubai-premium-getaway",
    featured_image: "/images/trending/trending7.jpg",
    duration: "4 Days / 3 Nights",
    destination: {
      name: "United Arab Emirates",
      slug: "united-arab-emirates",
      country: "United Arab Emirates",
      city: "Dubai",
    },
    short_description:
      "Modern city highlights, desert experiences, luxury shopping, and skyline dining in one compact trip.",
  },
  {
    id: 5,
    title: "Spanish Riviera Journey",
    slug: "spanish-riviera-journey",
    featured_image: "/images/trending/trending6.jpg",
    duration: "8 Days / 7 Nights",
    destination: {
      name: "Spain",
      slug: "spain",
      country: "Spain",
      city: "",
    },
    short_description:
      "Coastal towns, Mediterranean views, historic plazas, and easy-paced cultural touring across Spain.",
  },
  {
    id: 6,
    title: "Egypt Heritage Explorer",
    slug: "egypt-heritage-explorer",
    featured_image: "/images/trending/trending10.jpg",
    duration: "6 Days / 5 Nights",
    destination: {
      name: "Egypt",
      slug: "egypt",
      country: "Egypt",
      city: "",
    },
    short_description:
      "Discover ancient monuments, riverfront views, guided heritage sites, and memorable desert scenery.",
  },
];
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
  const gallery = Array.isArray(packageItem.gallery)
    ? packageItem.gallery
        .map((image) => toApiImageUrl(image, ""))
        .filter(Boolean)
    : [];

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
    featured_image: toApiImageUrl(packageItem.featured_image, packageImageFallback),
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
    price: firstValue(packageItem, ["price", "starting_price", "amount"], ""),
    reviews: firstValue(packageItem, ["reviews", "review_text", "total_reviews"], ""),
    ribbon: firstValue(packageItem, ["ribbon", "tag", "offer_label"], ""),
    raw: packageItem,
  };
}
export function normalizePackages(packageItems = []) {
  return packageItems.map((packageItem, index) => normalizePackage(packageItem, index));
}
