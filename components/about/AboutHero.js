// Header83.jsx
'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './abouthero.module.css'

const IMAGES1 = [
  { src: '/images/hero-1.webp', alt: 'Paraglider over Salalah', hide: true },
  { src: '/images/hero-2.webp', alt: 'Private riverside setup' },
  { src: '/images/hero-3.webp', alt: 'Muttrah souq at night', hide: true },
  { src: '/images/hero-4.webp', alt: 'Arabian dhow on calm water', hide: true },
  { src: '/images/hero-5.webp', alt: 'Camel trek in the desert' },
  { src: '/images/hero-6.webp', alt: 'Nizwa Fort', hide: true },
  { src: '/images/hero-7.webp', alt: 'Private event table setup', hide: true },
  { src: '/images/hero-8.webp', alt: 'Nizwa Souq building' },
  { src: '/images/hero-9.webp', alt: 'Hotel with pink skies', hide: true },
]

const IMAGES = [
  {
    src: "/images/about/hero-journey.jpg",
    alt: "Scenic travel road through a mountain landscape",
    hide: true, 
  },
  {
    src: "/images/about/city-escape.jpg",
    alt: "Luxury city escape destination",
     hide: true,
  },
  {
    src: "/images/about/mountain-view.jpg",
    alt: "Comfortable coastal travel stay",
    hide: true,
  },
  {
    src: "/images/about/mountain-view.jpg",
    alt: "Mountain destination view for travelers",
   hide: true,
  },
  {
    src: "/images/about/quiet-retreat.jpg",
    alt: "Quiet retreat surrounded by nature",
    hide: true,
  },
   {
    src: "/images/about/city-escape.jpg",
    alt: "Luxury city escape destination",
     hide: true,
  },
  {
    src: "/images/about/hero-journey.jpg",
    alt: "Scenic travel road through a mountain landscape",
    hide: false, 
  },
  {
    src: "/images/about/city-escape.jpg",
    alt: "Luxury city escape destination",
     hide: false,
  },
  {
    src: "/images/about/mountain-view.jpg",
    alt: "Comfortable coastal travel stay",
    hide: false,
  },
];

export default function AboutHero() {
  const componentRef = useRef(null)   // the 300vh root
  const contentRef = useRef(null)
  const gridRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const component = componentRef.current
    if (!component) return

    const getInitialScale = () => window.innerWidth >= 768 ? 3.2 : 3.4

    const onScroll = () => {
      const rect = component.getBoundingClientRect()
      const sectionH = component.offsetHeight
      const progress = Math.max(0, Math.min(1,
        -rect.top / (sectionH - window.innerHeight)
      ))

      if (contentRef.current)
        contentRef.current.style.opacity = String(Math.max(0, 1 - progress / 0.24))

      if (overlayRef.current) {
        const p = Math.max(0, (progress - 0.24) / 0.26)
        overlayRef.current.style.opacity = String(1 - p)
      }

      if (gridRef.current) {
        const initScale = getInitialScale()
        const scale = initScale - (initScale - 1) * Math.min(1, progress / 0.6)
        gridRef.current.style.transform = `scale(${scale})`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={componentRef} className={styles.component}>
      <div className={styles.contentWrapper}>  {/* sticky 100vh */}

        {/* bg layer */}
        <div className={styles.bgImages}>
          <div ref={overlayRef} className={styles.overlay} />
          <div ref={gridRef} className={styles.grid}>
            {IMAGES.map((img, i) => (
              <div
                key={i}
                className={[
                  styles.imageWrapper,
                  img.hide ? styles.hideMobile : ''
                ].join(' ')}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>

        

      </div>
    </div>
  )
}