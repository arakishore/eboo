import { firstValue, normalizeSlug, toApiImageUrl } from "@/lib/api";

export const destinationImageFallback = "/images/dummy.jpg";

export const fallbackDestinations = [
  {
    image: "/images/trending/trending8.jpg",
    banner_image: "/images/bg/bg8.jpg",
    title: "Nepal Special Tour",
    name: "Nepal Special Tour",
    slug: "nepal-special-tour",
    places: "852",
    country: "Nepal",
    city: "Kathmandu",
    location: "Kathmandu, Nepal",
    duration: "6 Days",
    description:
      "Explore Nepal through curated travel packages, mountain views, cultural highlights, and comfortable guided journeys.",
    gallery: ["/images/bg/bg1.jpg", "/images/bg/bg2.jpg", "/images/bg/bg3.jpg"],
  },
  {
    image: "/images/trending/trending11.jpg",
    title: "Paris in Love",
    slug: "paris-in-love",
    places: "255",
    country: "France",
    location: "Paris, France",
    duration: "5 Days",
    ribbon: "10% OFF",
  },
  {
    image: "/images/trending/trending2.jpg",
    title: "Egyptian Voyager",
    slug: "egyptian-voyager",
    places: "852",
    country: "Egypt",
    location: "Cairo, Egypt",
    duration: "6 Days",
  },
  {
    image: "/images/trending/trending5.jpg",
    title: "Empire Prestige Causeway Bay",
    slug: "empire-prestige-causeway-bay",
    places: "255",
    country: "Thailand",
    location: "Bangkok, Thailand",
    duration: "4 Days",
    reviews: "58 Reviews",
  },
  {
    image: "/images/trending/trending4.jpg",
    title: "Bali & Indonesia Tour",
    slug: "bali-indonesia-tour",
    places: "852",
    country: "Indonesia",
    location: "Bali, Indonesia",
    duration: "7 Days",
  },
  {
    image: "/images/trending/trending3.jpg",
    title: "Madagascar Safari",
    slug: "madagascar-safari",
    places: "255",
    country: "Madagascar",
    location: "Madagascar",
    duration: "8 Days",
    reviews: "58 Reviews",
  },
  {
    image: "/images/trending/trending7.jpg",
    title: "Dazzling Dubai",
    slug: "dazzling-dubai",
    places: "852",
    country: "Dubai",
    location: "Dubai, United Arab Emirates",
    duration: "4 Days",
    reviews: "65 Reviews",
  },
  {
    image: "/images/trending/trending6.jpg",
    title: "The Spanish Riviera",
    slug: "the-spanish-riviera",
    places: "255",
    country: "Spain",
    location: "Costa Brava, Spain",
    duration: "8 Days",
    reviews: "51 Reviews",
  },
  {
    image: "/images/trending/trending10.jpg",
    title: "Valley of the Kings",
    slug: "valley-of-the-kings",
    places: "255",
    country: "Egypt",
    location: "Luxor, Egypt",
    duration: "5 Days",
    price: "$300.00",
    reviews: "51 Reviews",
  },
];

export function normalizeDestination(destination = {}, index = 0) {
  const title = firstValue(
    destination,
    ["title", "name", "destination_title", "destination_name"],
    `Destination ${index + 1}`
  );
  const country = firstValue(destination, ["country", "country_name"], "Popular Destination1");
  const city = firstValue(destination, ["city", "city_name"], "");
  const image = toApiImageUrl(
    firstValue(destination, ["image", "image_url", "photo", "thumbnail", "banner_image"]),
    destinationImageFallback
  );
  const bannerImage = toApiImageUrl(
    firstValue(destination, ["banner_image", "banner", "cover_image", "hero_image"]),
    image
  );
  const gallerySource =
    destination.gallery ||
    destination.gallery_images ||
    destination.images ||
    destination.photos ||
    [];
  const galleryItems = Array.isArray(gallerySource)
    ? gallerySource.map((item) => toApiImageUrl(item, destinationImageFallback))
    : String(gallerySource)
        .split(",")
        .map((item) => toApiImageUrl(item.trim(), destinationImageFallback))
        .filter(Boolean);

  return {
    id: firstValue(destination, ["id", "destination_id"], index + 1),
    name: title,
    title,
    slug: normalizeSlug(
      firstValue(destination, ["slug", "url_slug", "seo_url", "alias"]),
      normalizeSlug(title, `destination-${index + 1}`)
    ),
    image,
    banner_image: bannerImage,
    places: firstValue(destination, ["places", "places_count", "total_places"], "255"),
    country,
    city,
    location: firstValue(
      destination,
      ["location", "address", "destination_location"],
      [city, country].filter(Boolean).join(", ")
    ),
    duration: firstValue(destination, ["duration", "days", "tour_duration"], "5 Days"),
    price: firstValue(destination, ["price", "starting_price", "amount"], "$350.00"),
    reviews: firstValue(destination, ["reviews", "review_text", "total_reviews"], ""),
    ribbon: firstValue(destination, ["ribbon", "tag", "offer_label"], ""),
    short_description: firstValue(
      destination,
      ["short_description", "description", "summary", "excerpt"],
      "A memorable destination experience with guided highlights and comfortable travel planning."
    ),
    description: firstValue(
      destination,
      ["description", "short_description", "content", "summary", "excerpt"],
      "A memorable destination experience with guided highlights and comfortable travel planning."
    ),
    gallery: galleryItems,
    raw: destination,
  };
}

export function normalizeDestinations(destinations = []) {
  return destinations.map((destination, index) => normalizeDestination(destination, index));
}
