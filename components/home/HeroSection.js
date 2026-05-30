"use client";

import Link from "next/link";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { firstValue, toApiImageUrl } from "@/lib/api";

const contentClasses = [
  "swiper-content container",
  "swiper-content1 container",
  "swiper-content2 container",
];

function normalizeBanner(banner, index) {
  return {
    image: toApiImageUrl(firstValue(banner, ["image", "background_image"]), ""),
    title: firstValue(banner, ["title"], ""),
    description: firstValue(banner, ["subtitle", "description"], ""),
    buttonText: firstValue(banner, ["button_text"], ""),
    link: firstValue(banner, ["button_link"], ""),
    contentClass: contentClasses[index % contentClasses.length],
  };
}

export default function HeroSection({ banners = [] }) {
  const slides = banners.map((banner, index) => normalizeBanner(banner, index));

  if (!slides.length) {
    return null;
  }

  return (
    <section className="banner overflow-hidden">
      <div className="slider slider1">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          className="swiper-container"
          wrapperClass="swiper-wrapper"
          effect="fade"
          loop={slides.length > 1}
          pagination={{ clickable: true, el: ".swiper-pagination" }}
          speed={1200}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={`${slide.title}-${slide.image}`}>
              <div className="slide-inner">
                <div
                  className="slide-image"
                  style={{ backgroundImage: `url(${slide.image})` }}
                ></div>
                <div className={slide.contentClass}>
                  {slide.title ? <h1 className="white mb-2">{slide.title}</h1> : null}
                  {slide.description ? <p className="white mb-4">{slide.description}</p> : null}
                  {slide.link && slide.buttonText ? (
                    <Link href={slide.link} className="per-btn">
                      <span className="white">{slide.buttonText}</span>
                      <i className="fa fa-arrow-right white"></i>
                    </Link>
                  ) : null}
                </div>
                <div className="overlay"></div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </section>
  );
}
