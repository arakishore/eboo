import DestinationCard from "@/components/destination/DestinationCard";

const destinations = [
  {
    image: "/images/trending/trending8.jpg",
    title: "Nepal Special Tour",
    places: "852",
    country: "Nepal",
  },
  {
    image: "/images/trending/trending11.jpg",
    title: "Paris in Love",
    places: "255",
    country: "France",
    ribbon: "10% OFF",
  },
  {
    image: "/images/trending/trending2.jpg",
    title: "Egyptian Voyager",
    places: "852",
    country: "Eygpt",
  },
  {
    image: "/images/trending/trending5.jpg",
    title: "Empire Prestige Causeway Bay",
    places: "255",
    country: "Thailand",
    reviews: "58 Reviews",
  },
  {
    image: "/images/trending/trending4.jpg",
    title: "Bali & Indonesia Tour",
    places: "852",
    country: "Indonesia",
  },
  {
    image: "/images/trending/trending3.jpg",
    title: "Madagascar Safari",
    places: "255",
    country: "Mexico",
    reviews: "58 Reviews",
  },
  {
    image: "/images/trending/trending7.jpg",
    title: "Dazzling Dubai",
    places: "852",
    country: "Dubai",
    reviews: "65 Reviews",
  },
  {
    image: "/images/trending/trending6.jpg",
    title: "The Spanish Riviera",
    places: "255",
    country: "Spain",
    reviews: "51 Reviews",
  },
  {
    image: "/images/trending/trending10.jpg",
    title: "Valley of the Kings",
    places: "255",
    country: "Eygpt",
    price: "$300.00",
    reviews: "51 Reviews",
  },
];

const relatedTours = [
  {
    image: "/images/destination/destination3.jpg",
    title: "New York Tour",
    columnClass: "col-lg-4 col-md-6 p-1",
  },
  {
    image: "/images/destination/destination4.jpg",
    title: "Armania Tour",
    columnClass: "col-lg-4 col-md-6 p-1",
  },
  {
    image: "/images/destination/destination10.jpg",
    title: "London Tour",
    columnClass: "col-lg-4 col-md-6 p-1",
  },
  {
    image: "/images/destination/destination5.jpg",
    title: "Manchester Tour",
    columnClass: "col-lg-3 col-md-6 p-1",
  },
  {
    image: "/images/destination/destination7.jpg",
    title: "kathmandu Tour",
    columnClass: "col-lg-3 col-md-6 p-1",
  },
  {
    image: "/images/destination/destination8.jpg",
    title: "Tokyo Tour",
    columnClass: "col-lg-3 col-md-6 p-1",
  },
  {
    image: "/images/destination/destination9.jpg",
    title: "Norwich Tour",
    columnClass: "col-lg-3 col-md-6 p-1",
  },
];

function Rating() {
  return (
    <div className="rating mb-1">
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
    </div>
  );
}

function RelatedTourCard({ image, title, columnClass }) {
  return (
    <div className={columnClass}>
      <div className="desti-image">
        <img src={image} alt="desti" />
        <div className="desti-content">
          <Rating />
          <h4 className="white mb-1">{title}</h4>
          <div className="trend-last-main">
            <div className="trend-last">
              <p className="mb-1 white">
                <i className="fa fa-clock-o" aria-hidden="true"></i> 3 days &amp; 2 night
              </p>
              <div className="trend-price">
                <p className="price pink mb-0">
                  From <span>$350.00</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="desti-overlay">
          <a href="#" className="nir-btn">
            <span className="white">Book Now</span>
            <i className="fa fa-arrow-right white pl-1"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Destinations | Eboo",
  description: "Explore destination tour packages from Eboo.",
};

export default function DestinationsPage() {
  return (
    <>
      <section
        className="breadcrumb-main pb-0"
        style={{ backgroundImage: "url(/images/bg/bg8.jpg)" }}
      >
        <div className="breadcrumb-outer pt-10">
          <div className="container">
            <div className="breadcrumb-content d-md-flex align-items-center pt-10">
              <h2 className="mb-0">Destination Full</h2>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Destination Full
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>

      <section className="blog trending destination-b">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <div className="trend-box">
                <div className="row">
                  {destinations.map((destination) => (
                    <DestinationCard key={destination.title} {...destination} />
                  ))}

                  <div className="col-lg-12">
                    <div className="text-center">
                      <a href="#" className="nir-btn">
                        Load More <i className="fa fa-long-arrow-alt-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="top-destination overflow-hidden">
        <div className="container">
          <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
            <h2 className="m-0 white">
              Related <span>Tour Packages</span>
            </h2>
            <p className="mb-0 white">
              Travel has helped us to understand the meaning of life and it has helped us become
              better people. Each time we travel, we see the world with new eyes.
            </p>
          </div>
          <div className="desti-inner">
            <div className="row d-flex align-items-center">
              {relatedTours.map((tour) => (
                <RelatedTourCard key={tour.title} {...tour} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
