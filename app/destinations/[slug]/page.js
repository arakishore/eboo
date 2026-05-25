const galleryImages = [
  "/images/bg/bg1.jpg",
  "/images/bg/bg2.jpg",
  "/images/bg/bg3.jpg",
  "/images/bg/bg7.jpg",
  "/images/bg/bg8.jpg",
  "/images/bg/bg2.jpg",
];

const itinerary = [
  {
    day: "Day 1",
    title: "Barcelona - Zaragoza - Madrid",
    active: true,
  },
  {
    day: "Day 2",
    title: "Zurich - Biel/Bienne - Neuchatel - Geneva",
  },
  {
    day: "Day 3",
    title: "Enchanting Engelberg",
  },
  {
    day: "Day 4",
    title: "Barcelona - Zaragoza - Madrid",
  },
];

const reviewProgress = [
  { label: "Cleanliness", value: 40 },
  { label: "Facilities", value: 30 },
  { label: "Value for money", value: 60 },
  { label: "Service", value: 20 },
  { label: "Location", value: 45 },
];

const comments = [
  {
    image: "/images/reviewer/1.jpg",
    name: "Helena",
    title: 'The worst hotel ever"',
  },
  {
    image: "/images/reviewer/2.jpg",
    name: "Helena",
    title: 'Was too noisy and not suitable for business meetings"',
  },
];

export const metadata = {
  title: "Destination Detail | Eboo",
  description: "Destination detail page for Eboo.",
};

function Stars() {
  return (
    <>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
    </>
  );
}

function ItineraryItem({ day, title, active = false }) {
  return (
    <div className={`accrodion ${active ? "active" : ""}`}>
      <div className="accrodion-title">
        <h5 className="mb-0">
          <span>{day}</span> - {title}
        </h5>
      </div>
      <div className="accrodion-content" style={{ display: active ? "block" : "none" }}>
        <div className="inner">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, inventore cumque
            veniam, praesentium velit incidunt rem quas a, quos eos ipsum, reprehenderit voluptatem.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProgressItem({ label, value }) {
  return (
    <div className="progress-item">
      <p>{label}</p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${value}%` }}
        >
          <span className="sr-only">{value}% Complete</span>
        </div>
      </div>
    </div>
  );
}

function CommentBox({ image, name, title }) {
  return (
    <div className="comment-box">
      <div className="comment-image">
        <img src={image} alt="image" />
      </div>
      <div className="comment-content">
        <h5 className="mb-1">{name}</h5>
        <p className="comment-date">April 25, 2019 at 10:46 am</p>
        <div className="comment-rate">
          <div className="rating mar-right-15">
            <Stars />
          </div>
          <span className="comment-title">{title}</span>
        </div>
        <p className="comment">
          Take in the iconic skyline and visit the neighbourhood hangouts that you&apos;ve only ever
          seen on TV. Take in the iconic skyline and visit the neighbourhood.
        </p>
        <div className="comment-like">
          <div className="like-title">
            <a href="#" className="nir-btn">
              Reply
            </a>
          </div>
          <div className="like-btn pull-right">
            <a href="#" className="like">
              <i className="fa fa-thumbs-up"></i> Like
            </a>
            <a href="#" className="disike">
              <i className="fa fa-thumbs-down"></i> Dislike
            </a>
            <a href="#" className="love">
              <i className="flaticon-like"></i> Love
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DestinationDetailPage() {
  return (
    <>
      <div
        className="breadcrumb-main pb-0"
        style={{ backgroundImage: "url(/images/bg/bg8.jpg)" }}
      >
        <div className="breadcrumb-outer pt-10">
          <div className="container">
            <div className="breadcrumb-content bread-content text-center pt-10">
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Destination Single Full
                  </li>
                </ul>
              </nav>
              <h2 className="mb-0 white text-uppercase">Single Full</h2>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </div>

      <div className="tabs-navbar1 bg-white sticky1 p-4">
        <div className="row">
          <div className="col-md-12">
            <ul id="tabs" className="nav nav-tabs bordernone">
              <li className="active">
                <a data-toggle="tab" href="#description">
                  Highlight
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#iternary">
                  Iternary
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#single-map">
                  Map
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#single-review">
                  Reviews
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#single-comments">
                  Comments
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#single-add-review" className="bordernone">
                  Add Reviews
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className="blog trending destination-b">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="single-content">
                <div className="description-images mb-4">
                  <div className="thumbnail-images">
                    <div className="slider-store">
                      {galleryImages.map((image, index) => (
                        <div key={`store-${image}-${index}`}>
                          <img src={image} alt="1" />
                        </div>
                      ))}
                    </div>
                    <div className="slider-thumbs">
                      {galleryImages.map((image, index) => (
                        <div key={`thumb-${image}-${index}`}>
                          <img src={image} alt="1" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="description" id="description">
                  <div className="single-full-title border-b mb-2 pb-2">
                    <div className="single-title">
                      <h3 className="mb-1">Adriatic Adventure-Zagreb to Athens</h3>
                      <div className="rating-main d-sm-flex align-items-center">
                        <p className="mb-0 mr-2">
                          <i className="flaticon-location-pin"></i> Greater London, United Kingdom
                        </p>
                        <div className="rating mr-2">
                          <Stars />
                        </div>
                        <span>(1,186 Reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="description-inner mb-2">
                    <h4>Highlight</h4>
                    <p>
                      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying
                      out print, graphic or web designs. The passage is attributed to an unknown
                      typesetter in the 15th century who is thought to have scrambled parts of
                      Cicero&apos;s De Finibus Bonorum et Malorum for use in a type specimen book.
                      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying
                      out print, graphic or web designs.
                    </p>
                    <p className="mb-0">
                      The passage is attributed to an unknown typesetter in the 15th century who is
                      thought to have scrambled parts of Cicero&apos;s De Finibus Bonorum et Malorum
                      for use in a type specimen book.
                    </p>
                  </div>

                  <div className="tour-includes mb-2">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <i className="fa fa-clock-o pink mr-1" aria-hidden="true"></i> 5 Days
                          </td>
                          <td>
                            <i className="fa fa-group pink mr-1" aria-hidden="true"></i> Max People
                            : 26
                          </td>
                          <td>
                            <i className="fa fa-calendar pink mr-1" aria-hidden="true"></i> Jan 18 -
                            Dec 21
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="fa fa-user pink mr-1" aria-hidden="true"></i> Min Age :
                            10+
                          </td>
                          <td>
                            <i className="fa fa-map-signs pink mr-1" aria-hidden="true"></i> Pickup
                            : Airport
                          </td>
                          <td>
                            <i className="fa fa-file-alt pink mr-1" aria-hidden="true"></i> Langauge
                            - English, Thai
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="description-inner mb-2">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 mb-2 pr-2">
                        <div className="desc-box">
                          <h5 className="mb-1">Departure &amp; Return Location</h5>
                          <p className="mb-0">John F.K. International Airport(Google Map)</p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 mb-2 pl-2">
                        <div className="desc-box">
                          <h5 className="mb-1">Bedroom</h5>
                          <p className="mb-0">4 Bedrooms</p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 mb-2 pr-2">
                        <div className="desc-box">
                          <h5 className="mb-1">Departure Time</h5>
                          <p className="mb-0">3 Hours Before Flight Time</p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 mb-2 pl-2">
                        <div className="desc-box">
                          <h5 className="mb-1">Departure Time</h5>
                          <p className="mb-0">3 Hours Before Flight Time</p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 mb-2 pr-2">
                        <div className="desc-box">
                          <h5 className="mb-1">Price Includes</h5>
                          <ul>
                            <li>
                              <i className="fa fa-check pink mr-1"></i> Air Fares
                            </li>
                            <li>
                              <i className="fa fa-check pink mr-1"></i> 3 Nights Hotel
                              Accomodation
                            </li>
                            <li>
                              <i className="fa fa-check pink mr-1"></i> Tour Guide
                            </li>
                            <li>
                              <i className="fa fa-check pink mr-1"></i> Entrance Fees
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 mb-2 pl-2">
                        <div className="desc-box">
                          <h5 className="mb-1">Departure &amp; Return Location</h5>
                          <ul>
                            <li>
                              <i className="fa fa-close pink mr-1"></i> Guide Service Fee
                            </li>
                            <li>
                              <i className="fa fa-close pink mr-1"></i> Driver Service Fee
                            </li>
                            <li>
                              <i className="fa fa-close pink mr-1"></i> Any Private Expenses
                            </li>
                            <li>
                              <i className="fa fa-close pink mr-1"></i> Room Service Fees
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="description-inner mb-4">
                    <h4>What to Expect</h4>
                    <p>
                      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying
                      out print, graphic or web designs. The passage is attributed to an unknown
                      typesetter in the 15th century who is thought to have scrambled parts of
                      Cicero&apos;s De Finibus Bonorum et Malorum for use in a type specimen book.
                      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying
                      out print, graphic or web designs.
                    </p>
                    <p className="mb-0">
                      The passage is attributed to an unknown typesetter in the 15th century who is
                      thought to have scrambled parts of Cicero&apos;s De Finibus Bonorum et Malorum
                      for use in a type specimen book.
                    </p>
                  </div>
                </div>

                <div className="accrodion-grp faq-accrodion mb-4" id="iternary" data-grp-name="faq-accrodion">
                  <h4>Iternary</h4>
                  {itinerary.map((item) => (
                    <ItineraryItem key={`${item.day}-${item.title}`} {...item} />
                  ))}
                </div>

                <div className="single-map mb-4" id="single-map">
                  <h4>Map</h4>
                  <div className="map">
                    <div style={{ width: "100%" }}>
                      <iframe
                        height="400"
                        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=+(mangal%20bazar)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        title="Destination map"
                      ></iframe>
                    </div>
                  </div>
                </div>

                <div className="single-review mb-4" id="single-review">
                  <h4>Average Reviews</h4>
                  <div className="row d-flex align-items-center">
                    <div className="col-lg-4 col-md-4">
                      <div className="review-box bg-pink text-center pb-4 pt-4">
                        <h2 className="mb-1 white">
                          <span>2.2</span>/5
                        </h2>
                        <h4 className="white mb-1">&quot;Feel so much worst than thinking&quot;</h4>
                        <p className="mb-0 white font-italic">From 40 Reviews</p>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-8">
                      <div className="review-progress">
                        {reviewProgress.map((item) => (
                          <ProgressItem key={item.label} {...item} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="single-comments single-box mb-4" id="single-comments">
                  <h5 className="border-b pb-2 mb-2">Showing 16 verified guest comments</h5>
                  {comments.map((comment) => (
                    <CommentBox key={`${comment.image}-${comment.title}`} {...comment} />
                  ))}
                </div>

                <div className="single-add-review" id="single-add-review">
                  <h4>Write a Review</h4>
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input type="text" placeholder="Name" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input type="email" placeholder="Email" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea defaultValue="Comment"></textarea>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-btn">
                          <a href="#" className="nir-btn">
                            Submit Review
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
