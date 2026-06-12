"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

function normalizeImage(image, index, title) {
  const src = typeof image === "string" ? image : image?.src || image?.url || image?.image || "";

  if (!src) {
    return null;
  }

  return {
    id: image?.id || src,
    src,
    width: Number(image?.width || image?.w) || 900,
    height: Number(image?.height || image?.h) || 675,
    alt: image?.alt || `${title} gallery ${index + 1}`,
  };
}

export default function ServiceGalleryLightbox({ images = [], title, emptyMessage }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const galleryImages = images
    .map((image, index) => normalizeImage(image, index, title))
    .filter(Boolean);

  if (!galleryImages.length) {
    return <p className="text-center mb-0">{emptyMessage}</p>;
  }

  return (
    <>
      <div className="row">
        {galleryImages.map((image, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={`${image.id}-${index}`}>
            <div className="service-gallery-item">
              <button
                type="button"
                className="service-gallery-button"
                aria-label={`Open image ${index + 1} of ${galleryImages.length}`}
                onClick={() => setLightboxIndex(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
                  unoptimized
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex >= 0 ? lightboxIndex : 0}
        open={lightboxIndex >= 0}
        plugins={[Counter]}
        slides={galleryImages.map((image) => ({
          src: image.src,
          width: image.width,
          height: image.height,
          alt: image.alt,
        }))}
      />
    </>
  );
}
