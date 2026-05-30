"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { firstValue, toApiImageUrl } from "@/lib/api";

function normalizeTestimonial(testimonial, index) {
  const rating = Number(firstValue(testimonial, ["rating"], 5));

  return {
    id: firstValue(testimonial, ["id", "slug"], index),
    name: firstValue(testimonial, ["name", "title", "client_name", "author"], ""),
    designation: firstValue(testimonial, ["designation", "location", "position", "role"], ""),
    message: firstValue(
      testimonial,
      ["message", "description", "testimonial", "content", "review"],
      ""
    ),
    image: toApiImageUrl(firstValue(testimonial, ["image", "avatar", "photo", "client_image"]), ""),
    rating: Number.isFinite(rating) && rating > 0 ? Math.min(Math.round(rating), 5) : 5,
  };
}

export default function TestimonialSection({ testimonials = [] }) {
  const items = testimonials.map((testimonial, index) => normalizeTestimonial(testimonial, index));

  if (!items.length) {
    return null;
  }

  return (
    <section className="testimonial pb-6">
      <div className="container">
        <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
          <h2 className="m-0">
            What <span>People Say About Us</span>
          </h2>
          <p className="mb-0">
            Travel has helped us to understand the meaning of life and it has helped us become
            better people. Each time we travel, we see the world with new eyes.
          </p>
        </div>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          className="review-slider"
          loop={items.length > 1}
          pagination={{ clickable: true }}
          speed={900}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 1, spaceBetween: 30 },
            992: { slidesPerView: 2, spaceBetween: 30 },
            1200: { slidesPerView: 2, spaceBetween: 30 },
          }}
        >
          {items.map((testimonial) => (
            <SwiperSlide
              className="item"
              key={`${testimonial.id}-${testimonial.name}-${testimonial.image}`}
            >
              <div className="testimonial-item1 text-center">
                <div className="rating-main mb-2">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <i className="fa fa-star" key={index}></i>
                  ))}
                </div>
                <div className="details">
                  <p className="m-0">{testimonial.message}</p>
                </div>
                <div className="author-info mt-2">
                  {testimonial.image ? (
                    <a href="#">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </a>
                  ) : null}
                  <div className="author-title">
                    {testimonial.name ? <h4 className="m-0 pink">{testimonial.name}</h4> : null}
                    {testimonial.designation ? <span>{testimonial.designation}</span> : null}
                  </div>
                </div>
                <i className="fa fa-quote-left mb-2"></i>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
