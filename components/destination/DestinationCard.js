import Link from "next/link";
import ScrollReveal from "@/components/common/ScrollReveal";

function Stars() {
  return (
    <div className="rating">
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
    </div>
  );
}

export default function DestinationCard({
  image,
  title,
  slug,
  country,
  places,
  city,
  ribbon,
  revealDelay = 0,
  short_description: shortDescription = "A wonderful little cottage right on the seashore - perfect for exploring.",
}) {
  return (
    <div className="col-lg-4 col-md-6 col-xs-12 mb-4">
      <ScrollReveal direction="up" delay={revealDelay}>
        <div className="trend-item">
          <div className="trend-image">
            {ribbon ? (
              <div className="ribbon ribbon-top-left">
                <span>{ribbon}</span>
              </div>
            ) : null}
            <img src={image} alt={title || "Destination"} />
          </div>
          <div className="trend-content-main">
            <div className="trend-content">
              
              <h4>
                <Link href={`/destinations/${slug}`}>{title}</Link>
              </h4>
              <p className="mb-0 pink">
                <i className="fa fa-eye mr-1"></i> {places} Visiting Places{" "}
                <i className="fa fa-map-marker mr-1 ml-3"></i> {country}, {city}
              </p>
            </div>
            <div className="trend-last-main">
              <p className="mb-0 trend-para">
                {shortDescription}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
