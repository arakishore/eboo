import Link from "next/link";
import { firstValue, toApiImageUrl } from "@/lib/api";

const fallbackBanners = [
  {
    image: "/images/slider/1.jpg",
    title: "Travel - Explore the world with a backpack",
    description:
      "Primis aptent vel turpis a a class suspendisse et augue orci a diam tristique consequat hendrerit ullamcorper top50torquent",
    buttonText: "Explore",
    link: "/destinations",
    contentClass: "swiper-content container",
  },
  {
    image: "/images/slider/5.jpg",
    title: "IT'S A BIG WORLD OUT THERE GO EXPLORE",
    description:
      "Lorem consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet contetur adipiscing elit, sed do eiusmod tempor incididunt",
    buttonText: "Explore",
    link: "/destinations",
    contentClass: "swiper-content1 container",
  },
  {
    image: "/images/slider/10.jpg",
    title: "DISCOVER THE WORLD YOU HAVE NEVER SEEN",
    description:
      "Lorem consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet contetur adipiscing elit, sed do eiusmod tempor incididunt",
    buttonText: "Discover",
    link: "/packages",
    contentClass: "swiper-content2 container",
  },
];

function normalizeBanner(banner, index) {
  const fallback = fallbackBanners[index % fallbackBanners.length];

  return {
    image: toApiImageUrl(
      firstValue(banner, ["image", "image_url", "banner_image", "photo"]),
      fallback.image
    ),
    title: firstValue(banner, ["title", "heading", "name"], fallback.title),
    description: firstValue(
      banner,
      ["description", "short_description", "subtitle", "content"],
      fallback.description
    ),
    buttonText: firstValue(
      banner,
      ["button_text", "button_label", "cta_text"],
      fallback.buttonText
    ),
    link: firstValue(banner, ["link", "url", "button_url"], fallback.link),
    contentClass: fallback.contentClass,
  };
}

export default function HeroSection({ banners = fallbackBanners }) {
  const slides = (banners.length ? banners : fallbackBanners)
    .slice(0, 3)
    .map((banner, index) => normalizeBanner(banner, index));

  return (
    <section className="banner overflow-hidden">
      <div className="slider slider1">
        <div className="swiper-container">
          <div className="swiper-wrapper ">
            {slides.map((slide) => (
              <div className="swiper-slide" key={`${slide.title}-${slide.image}`}>
                <div className="slide-inner">
                  <div
                    className="slide-image"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  ></div>
                  <div className={slide.contentClass}>
                    <h1 className="white mb-2">{slide.title}</h1>
                    <p className="white mb-4">{slide.description}</p>
                    <Link href={slide.link || "/destinations"} className="per-btn">
                      <span className="white">{slide.buttonText}</span>
                      <i className="fa fa-arrow-right white"></i>
                    </Link>
                  </div>
                  <div className="overlay"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
}
