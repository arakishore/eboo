import Link from "next/link";

const fallbackTours = [
  { image: "/images/destination/destination5.jpg", title: "Manchester Tour", slug: "nepal-special-tour" },
  { image: "/images/destination/destination7.jpg", title: "kathmandu Tour", slug: "paris-in-love" },
  { image: "/images/destination/destination8.jpg", title: "Tokyo Tour", slug: "egyptian-voyager" },
  { image: "/images/destination/destination9.jpg", title: "Norwich Tour", slug: "dazzling-dubai" },
  { image: "/images/destination/destination10.jpg", title: "Norwich Tour", slug: "bali-indonesia-tour" },
  { image: "/images/destination/destination5.jpg", title: "New York Tour", slug: "nepal-special-tour" },
  { image: "/images/destination/destination5.jpg", title: "New York Tour", slug: "paris-in-love" },
  { image: "/images/destination/destination5.jpg", title: "Armania Tour", slug: "egyptian-voyager" },
  { image: "/images/destination/destination11.jpg", title: "Armania Tour", slug: "dazzling-dubai" },
];

function TourTile({ item, hrefBase = "/destinations" }) {
  return (
    <div className="col-lg p-0">
      <div className="desti-image bordernone">
        <img src={item.image || "/images/dummy-eboo.png"} alt={item.title || "Tour"} />
        <div className="desti-content">
          <div className="rating mb-1">
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
          </div>
          <h4 className="white mb-0">{item.title}</h4>
        </div>
        <div className="desti-overlay">
          <Link href={`${hrefBase}/${item.slug}`} className="nir-btn">
            <span className="white">Book Now</span>
            <i className="fa fa-arrow-right white pl-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PopularTours({ destinations = fallbackTours }) {
  const tours = (destinations.length ? destinations : fallbackTours).slice(0, 9);
  const firstRow = tours.slice(0, 5);
  const secondRow = tours.slice(5, 9);

  return (
    <section className="top-destination overflow-hidden bg-navy p-0">
      <div className="container-fluid">
        <div className="desti-inner">
          <div className="row d-flex align-items-center">
            {firstRow.map((item) => (
              <TourTile item={item} key={`${item.slug}-${item.title}-top`} />
            ))}
          </div>
          {secondRow.length ? (
            <div className="row d-flex align-items-center">
              {secondRow.map((item) => (
                <TourTile item={item} key={`${item.slug}-${item.title}-bottom`} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
