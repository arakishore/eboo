"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
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
  const galleryImages = Array.isArray(packageItem.gallery_images)
    ? packageItem.gallery_images
    : Array.isArray(packageItem.gallery)
      ? packageItem.gallery
      : [];
  const images = galleryImages.length
    ? galleryImages
    : packageItem.featured_image
      ? [packageItem.featured_image]
      : [];

  return images.map(getImageUrl).filter(Boolean);
}

export default function PackageGallery({ packageItem }) {
  const [mainSwiper, setMainSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const images = getGalleryImages(packageItem);

  if (!images.length) {
    return null;
  }

  const showThumbs = images.length > 1;
  const slides = images.map((image) => ({ src: image }));
  const imageTitle = packageItem?.title || "Package gallery image";
  const openLightbox = (index) => setLightboxIndex(index);
  const showMainImage = (index) => {
    if (mainSwiper && !mainSwiper.destroyed) {
      mainSwiper.slideTo(index);
    }
  };
  const resetButtonStyle = {
    background: "transparent",
    border: 0,
    cursor: "pointer",
    display: "block",
    padding: 0,
    width: "100%",
  };

  return (
    <div className="description-images mb-4">
      <div className="thumbnail-images">
        <Swiper
          modules={[FreeMode, Navigation, Thumbs]}
          className="slider-store"
          onSwiper={setMainSwiper}
          slidesPerView={1}
          navigation={false}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={`store-${image}-${index}`}>
              <button
                type="button"
                aria-label={`Open image ${index + 1} of ${images.length}`}
                onClick={() => openLightbox(index)}
                style={resetButtonStyle}
              >
                <Image
                  src={image}
                  alt={imageTitle}
                  width={1200}
                  height={500}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "cover",
                  }}
                  unoptimized
                />
              </button>
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
                <button
                  type="button"
                  aria-label={`View image ${index + 1} of ${images.length}`}
                  onClick={() => showMainImage(index)}
                  style={resetButtonStyle}
                >
                  <Image
                    src={image}
                    alt={imageTitle}
                    width={220}
                    height={140}
                    loading="lazy"
                    sizes="(max-width: 576px) 30vw, 180px"
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "cover",
                    }}
                    unoptimized
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
      <Lightbox
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex >= 0 ? lightboxIndex : 0}
        open={lightboxIndex >= 0}
        plugins={[Counter]}
        slides={slides}
      />
    </div>
  );
}
