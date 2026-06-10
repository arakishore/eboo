"use client";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

function AvailabilityForm({ service }) {
  if (!service.availabilityForm) {
    return null;
  }

  return (
    <section className="service-availability-section">
      <div className="container">
        <form className="service-availability-form">
          <label className="service-field">
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            <select defaultValue="">
              <option value="" disabled>
                {service.availabilityForm.destinationPlaceholder}
              </option>
              <option value="city-hotel">City Hotel</option>
              <option value="beach-resort">Beach Resort</option>
              <option value="mountain-retreat">Mountain Retreat</option>
            </select>
          </label>
          <label className="service-field">
            <i className="fa fa-calendar" aria-hidden="true"></i>
            <input type="text" placeholder="Check In" />
          </label>
          <label className="service-field">
            <i className="fa fa-calendar" aria-hidden="true"></i>
            <input type="text" placeholder="Check Out" />
          </label>
          <label className="service-field">
            <i className="fa fa-users" aria-hidden="true"></i>
            <select defaultValue="">
              <option value="" disabled>
                Person
              </option>
              <option value="1">1 Person</option>
              <option value="2">2 Persons</option>
              <option value="3">3 Persons</option>
              <option value="4">4+ Persons</option>
            </select>
          </label>
          <button type="submit" className="service-availability-submit">
            <i className="fa fa-search" aria-hidden="true"></i>
            {service.availabilityForm.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}

function FeatureList({ features = [] }) {
  if (!features.length) {
    return null;
  }

  return (
    <ul className="service-feature-list">
      {features.map((feature) => (
        <li key={feature}>{feature}</li>
      ))}
    </ul>
  );
}

export default function ServicePage({ service }) {
  return (
    <>
      <section className="service-hero-slider">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          loop={service.slides.length > 1}
          speed={1200}
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          {service.slides.map((image) => (
            <SwiperSlide key={image}>
              <div className="service-hero-slide">
                <img src={image} alt="" />
                <div className="service-hero-overlay"></div>
                <div className="container service-hero-content">
                  <span>{service.eyebrow}</span>
                  <h1>{service.title}</h1>
                  <p>{service.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <AvailabilityForm service={service} />

      <section className="service-detail-section">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-lg-7 mb-4 mb-lg-0">
              <div className="service-info-box h-100">
                <h2>{service.detailTitle || `${service.title} Information`}</h2>
                <p>{service.information}</p>
                {service.secondaryInformation ? <p>{service.secondaryInformation}</p> : null}
                <FeatureList features={service.features} />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="service-form-box h-100">
                <h3>Quick Enquiry</h3>
                <form className="service-enquiry-form">
                  <input type="text" placeholder="Full Name" />
                  <input type="tel" placeholder="Phone Number" />
                  <input type="email" placeholder="Email Address" />
                  <textarea placeholder="Tell us what you need" rows="4"></textarea>
                  <button type="submit">Submit Enquiry</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-gallery-section">
        <div className="container">
          <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
            <h2 className="m-0">
              {service.title} <span>Gallery</span>
            </h2>
          </div>
          <div className="row">
            {service.gallery.map((image, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={`${image}-${index}`}>
                <div className="service-gallery-item">
                  <img src={image} alt={`${service.title} gallery ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
