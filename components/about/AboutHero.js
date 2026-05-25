"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const heroImages = [
  {
    src: "/images/about/hero-journey.jpg",
    alt: "Scenic travel road through a mountain landscape",
    className: "about-hero-card about-hero-card--large fade-up",
  },
  {
    src: "/images/about/city-escape.jpg",
    alt: "Luxury city escape destination",
    className: "about-hero-card about-hero-card--tall fade-up fade-delay-1",
  },
  {
    src: "/images/about/coastal-stay.jpg",
    alt: "Comfortable coastal travel stay",
    className: "about-hero-card fade-up fade-delay-2",
  },
  {
    src: "/images/about/mountain-view.jpg",
    alt: "Mountain destination view for travelers",
    className: "about-hero-card fade-up fade-delay-3",
  },
  {
    src: "/images/about/quiet-retreat.jpg",
    alt: "Quiet retreat surrounded by nature",
    className: "about-hero-card about-hero-card--wide fade-up fade-delay-4",
  },
];

export default function AboutHero() {
  const sectionRef = useRef(null);
  const featureRef = useRef(null);
  const collageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray(".about-hero-card");

      gsap.set(collageRef.current, {
        autoAlpha: 0.18,
        y: 90,
        rotate: -2,
        scale: 1.18,
      });
      gsap.set(cards, {
        autoAlpha: 0,
        y: 70,
        scale: 0.94,
      });
      gsap.set(featureRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=140%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(featureRef.current, { autoAlpha: 0, y: -95, scale: 0.74, duration: 1 }, 0)
        .to(collageRef.current, { autoAlpha: 1, y: 0, rotate: -2, scale: 1, duration: 1 }, 0)
        .to(cards, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.82 }, 0.12)
        .to(contentRef.current, { y: -44, scale: 0.9, duration: 1 }, 0);
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section className="about-hero-premium" ref={sectionRef}>
      <div className="about-hero-feature" ref={featureRef} aria-hidden="true">
        <img src="/images/about/hero-journey.jpg" alt="Immersive luxury travel landscape" />
      </div>
      <div className="about-hero-collage" ref={collageRef} aria-hidden="true">
        {heroImages.map((image) => (
          <div className={image.className} key={image.src}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
      <div className="about-hero-overlay"></div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 col-xl-12">
            <div className="about-hero-content text-center fade-up" ref={contentRef}>
              <span className="about-eyebrow">Eboo Travel</span>
              <h1>Creating unforgettable journeys around the world</h1>
              <p>
                Travel experiences designed with comfort, adventure, and local expertise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
