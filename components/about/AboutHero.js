"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gridImages } from "@/data/images";

const HEADLINE = "Showing you World through EBOO eyes";

export default function HeroScroll() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!section || !grid || !overlay || !content) return;

    const onScroll = () => {
      const scrollable = section.offsetHeight - window.innerHeight;
      const scrolled = -section.getBoundingClientRect().top;
      const progress = Math.min(Math.max(scrolled / scrollable, 0), 1);

      const scale = 3.2 - progress * 2.2;
      grid.style.transform = `scale(${scale})`;

      overlay.style.opacity = String(0.35 * (1 - progress));
      content.style.opacity = String(1 - Math.min(progress * 2, 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="hero-scroll-section pt-0">
      <div className="hero-scroll-sticky">
        <div className="hero-scroll-bg">
          <div ref={overlayRef} className="hero-scroll-overlay" />
          <div
            ref={gridRef}
            className="hero-scroll-grid"
            style={{ transform: "scale(3.2)" }}
          >
            {gridImages.map((img, index) => (
              <div
                key={img.src}
                className={`hero-scroll-cell ${
                  index !== 1 && index !== 4 && index !== 7
                    ? "hero-scroll-cell--mobile-hidden"
                    : ""
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={index === 4}
                  className="object-fit-cover"
                  sizes="33vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div ref={contentRef} className="hero-scroll-content">
          <h1 className="hero-headline">
            {HEADLINE.split("").map((char, index) => (
              <span
                key={index}
                className="letter"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
}
