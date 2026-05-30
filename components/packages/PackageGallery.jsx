"use client";

import { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

function getImageUrl(image) {
  if (typeof image === "string") {
    return image;
  }

  return image?.url || image?.src || image?.image || image?.path || "";
}

function getGalleryImages(packageItem = {}) {
  const galleryImages = Array.isArray(packageItem.gallery)
    ? packageItem.gallery
    : [];
  const images = galleryImages.length ? galleryImages : [packageItem.featured_image];

  return images.map(getImageUrl).filter(Boolean);
}

export default function PackageGallery({ packageItem }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const images = getGalleryImages(packageItem);

  if (!images.length) {
    return null;
  }

  const showThumbs = images.length > 1;

  return (
    <div className="description-images mb-4">
      <div className="thumbnail-images">
        <Swiper
          modules={[FreeMode, Navigation, Thumbs]}
          className="slider-store"
          slidesPerView={1}
          navigation={false}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={`store-${image}-${index}`}>
              <div>
                <img src={image} alt={packageItem.title} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {showThumbs ? (
          <Swiper
            modules={[FreeMode, Navigation, Thumbs]}
            className="slider-thumbs"
            onSwiper={setThumbsSwiper}
            slidesPerView={5}
            spaceBetween={10}
            freeMode
            watchSlidesProgress
            navigation
            breakpoints={{
              0: { slidesPerView: 3 },
              576: { slidesPerView: 4 },
              992: { slidesPerView: 5 },
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={`thumb-${image}-${index}`}>
                <div>
                  <img src={image} alt={packageItem.title} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </div>
  );
}
