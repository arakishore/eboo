"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { toApiImageUrl } from "@/lib/api";

function getImageValue(image) {
  if (typeof image === "string") {
    return image;
  }

  return image?.url || image?.src || image?.image || image?.path || image?.file || "";
}

function normalizeGalleryItem(image, index, title) {
  const src = toApiImageUrl(getImageValue(image), "");

  if (!src) {
    return null;
  }

  const width = Number(image?.width || image?.natural_width || image?.w) || 900;
  const height = Number(image?.height || image?.natural_height || image?.h) || 620 + (index % 3) * 120;

  return {
    src,
    width,
    height,
    alt: image?.alt || image?.title || `${title} gallery ${index + 1}`,
  };
}

function getGalleryImages(destination = {}) {
  const raw = destination.raw || {};
  const gallerySource =
    raw.gallery_images ||
    raw.gallery ||
    raw.images ||
    raw.photos ||
    destination.gallery ||
    [];

  const galleryItems = Array.isArray(gallerySource)
    ? gallerySource
    : String(gallerySource)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  const fallbackImages = [destination.image, destination.banner_image].filter(Boolean);
  const images = galleryItems.length ? galleryItems : fallbackImages;
  const title = destination.name || destination.title || "Destination";
  const unique = new Set();

  return images
    .map((image, index) => normalizeGalleryItem(image, index, title))
    .filter(Boolean)
    .filter((image) => {
      if (unique.has(image.src)) {
        return false;
      }

      unique.add(image.src);
      return true;
    });
}

export default function DestinationGallery({ destination }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const images = getGalleryImages(destination);

  if (!images.length) {
    return null;
  }

  return (
    <>
      <div className="destination-gallery-masonry">
        {images.map((image, index) => (
          <div className="destination-gallery-item" key={`${image.src}-${index}`}>
            <button
              type="button"
              className="destination-gallery-button"
              aria-label={`Open image ${index + 1} of ${images.length}`}
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
                style={{ height: "auto", width: "100%" }}
                unoptimized
              />
            </button>
          </div>
        ))}
      </div>

      <Lightbox
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex >= 0 ? lightboxIndex : 0}
        open={lightboxIndex >= 0}
        plugins={[Counter]}
        slides={images.map((image) => ({
          src: image.src,
          width: image.width,
          height: image.height,
          alt: image.alt,
        }))}
      />
    </>
  );
}
