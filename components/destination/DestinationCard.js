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
  country,
  places,
  price = "$350.00",
  reviews,
  ribbon,
}) {
  return (
    <div className="col-lg-4 col-md-6 col-xs-12 mb-4">
      <div className="trend-item">
        <div className="trend-image">
          {ribbon ? (
            <div className="ribbon ribbon-top-left">
              <span>{ribbon}</span>
            </div>
          ) : null}
          <img src={image} alt="image" />
        </div>
        <div className="trend-content-main">
          <div className="trend-content">
            {reviews ? (
              <div className="rating-main d-flex align-items-center pb-1">
                <Stars />
                <span className="ml-2">{reviews}</span>
              </div>
            ) : (
              <div className="rating pb-1">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
              </div>
            )}
            <h4>
              <a href="#">{title}</a>
            </h4>
            <p className="mb-0 pink">
              <i className="fa fa-eye mr-1"></i> {places} Visiting Places{" "}
              <i className="fa fa-map-marker mr-1 ml-3"></i> {country}.
            </p>
          </div>
          <div className="trend-last-main">
            <p className="mb-0 trend-para">
              A wonderful little cottage right on the seashore - perfect for exploring.
            </p>
            <div className="trend-last d-flex align-items-center justify-content-between bg-navy">
              <p className="mb-0 white">
                <i className="fa fa-clock-o" aria-hidden="true"></i> 3 days &amp; 2 night
              </p>
              <div className="trend-price">
                <p className="price white mb-0">
                  From <span>{price}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
