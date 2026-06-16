import ScrollReveal from "@/components/common/ScrollReveal";

const travelTypes = [
  {
    href: "/travel-styles/groups/",
    icon: "/images/icons/Groups.svg",
    alt: "Groups",
    title: "Groups",
    description: "For over 15 pax",
  },
  {
    href: "/travel-styles/small-group-touring/",
    icon: "/images/icons/Small-Groups.svg",
    alt: "Small Groups",
    title: "Small Groups",
    description: "Small-sized groups",
  },
  {
    href: "/travel-styles/fit/",
    icon: "/images/icons/FIT.svg",
    alt: "FIT",
    title: "FIT",
    description: "Fully independent travellers",
  },
  {
    href: "/travel-styles/mice/",
    icon: "/images/icons/MICE.svg",
    alt: "MICE",
    title: "MICE",
    description: "Meetings, Incentives, Conferences, Events",
  },
];

export default function TravelTypes() {
  return (
    <section className="about-us pb-6">
      <div className="container">
        <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
          <h2 className="m-0">
            Find what <span>fits you Best</span>
          </h2>
          <p className="mb-0">
            Travel has helped us to understand the meaning of life and it has helped us
            become better people. Each time we travel, we see the world with new eyes.
          </p>
        </div>

        <style>{`
          .why-us-item {
            background: #f9f9f9;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            padding: 30px 20px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            border: 1px solid #eee;
            text-align: center;
          }

          .why-us-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }

          .why-us-icon img {
            width: 80px;
            height: auto;
            transition: transform 0.3s ease;
          }

          .why-us-item:hover .why-us-icon img {
            transform: scale(1.1);
          }

          .why-us-content h4 {
            font-size: 18px;
            margin: 15px 0 8px;
            font-weight: 600;
            color: #4a154b;
          }

          .why-us-content p {
            color: #666;
            font-size: 14px;
            margin: 0;
          }
        `}</style>

        <div className="why-us pt-4 border-t">
          <div className="container">
            <div className="row travel-types-mobile-grid">
              {travelTypes.map((type, index) => (
                <div className="col-3 col-md-6 col-lg-3 mb-4" key={type.href}>
                  <ScrollReveal direction="up" delay={index * 0.08} className="h-100">
                    <div className="why-us-item">
                      <div className="why-us-icon mb-3">
                        <img src={type.icon} alt={type.alt} />
                      </div>
                      <div className="why-us-content">
                        <h4>
                          <a href={type.href}>{type.title}</a>
                        </h4>
                        <p>{type.description}</p>
                      </div>
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
