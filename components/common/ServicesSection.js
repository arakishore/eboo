"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ScrollReveal from "@/components/common/ScrollReveal";

const services = [
  {
    href: "/destinations",
    matchPaths: ["/destinations", "/packages"],
    icon: "/images/icons/world-tour.png",
    title: "Tour Packages",
    description:
      "Meticulously Crafted tours, Exclusively curated for Perfection, giving you Unforgettable Memories.",
  },
  {
    href: "/hotels",
    matchPaths: ["/hotels"],
    icon: "/images/icons/desert.png",
    title: "Hotel",
    description:
      "Great offers for Luxury stays in tranquil natural retreats, providing the comfort and warmth of home.",
  },
  {
    href: "/flights",
    matchPaths: ["/flights"],
    icon: "/images/icons/airplane-ticket.png",
    title: "Flight",
    description: "Your Best Flight Deals is just One Click Away.",
  },
  {
    href: "/cruises",
    matchPaths: ["/cruises", "/cruise"],
    icon: "/images/icons/cruise.png",
    title: "Cruise",
    description: "Enjoy the Ultimate Voyage on Elite Cruises across globe curated for the Discerning",
  },
  {
    href: "/cars",
    matchPaths: ["/cars"],
    icon: "/images/icons/bus-color.png",
    title: "Cars",
    description:
      "Experience seamless travel in comfortable car and bus rentals, featuring genuine local drivers and 24/7 round-the-clock support",
  },
  {
    href: "/forex",
    matchPaths: ["/forex"],
    icon: "/images/icons/currency-card-color.png",
    title: "Forex",
    description:
      "Get the ultimate convenience of Forex cards and currency exchange delivered to your doorstep, all at competitive rates.",
  },
  {
    href: "/visa",
    matchPaths: ["/visa"],
    icon: "/images/icons/visa-trave.png",
    title: "Visa",
    description:
      "Entrust your visa needs to our qualified team, who provide hassle-free services with on-time delivery for all major destinations worldwide.",
  },
  {
    href: "/mice",
    matchPaths: ["/mice", "/mices"],
    icon: "/images/icons/Mice.png",
    title: "MICE",
    description:
      "Trust us to manage all aspects of your next corporate event, so you can focus on your business goals",
  },
];

export default function ServicesSection() {
  const pathname = usePathname();
  const normalizedPathname = pathname?.replace(/\/$/, "") || "/";
  const visibleServices = services.filter(
    (service) => !service.matchPaths.includes(normalizedPathname)
  );

  return (
    <section className="pb-6">
      <div className="container">
        <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
          <h2 className="m-0">
            Travel <span>Services We Offer</span>
          </h2>
          <p className="mb-0">
            Everything you need for a seamless journey, from planning and booking to
            transportation, visas, and foreign exchange.
          </p>
        </div>

        <div className="why-us pt-4 border-t">
          <div className="why-us-box">
            <div className="row services-mobile-grid">
              {visibleServices.map((service, index) => (
                <div className="col-3 col-md-6 col-lg-3 mb-4" key={service.href}>
                  <ScrollReveal direction="up" delay={index * 0.06} className="h-100">
                    <div className="why-us-item text-center bg-lgrey h-100 d-flex flex-column">
                      <Link href={service.href}>
                        <div className="why-us-icon mb-2">
                          <img
                            src={service.icon}
                            alt=""
                            style={{ width: "86px", height: "auto" }}
                          />
                        </div>
                        <div className="why-us-content">
                          <h4>{service.title}</h4>
                          <p className="mb-0">{service.description}</p>
                        </div>
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
