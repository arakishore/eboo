"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const offsets = {
  up: { x: 0, y: 48 },
  left: { x: -56, y: 0 },
  right: { x: 56, y: 0 },
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.85,
  className = "",
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const element = elementRef.current;
    const selectedOffset = offsets[direction] || offsets.up;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const fromVars = isMobile ? offsets.up : selectedOffset;

    const tween = gsap.fromTo(
      element,
      {
        autoAlpha: 0,
        x: fromVars.x,
        y: fromVars.y,
      },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        delay,
        duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 84%",
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, direction, duration]);

  return (
    <div className={className} ref={elementRef}>
      {children}
    </div>
  );
}
