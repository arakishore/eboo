import { firstValue, toApiImageUrl } from "@/lib/api";

const fallbackTestimonials = [
  {
    name: "Jared Erondu",
    designation: "Supervisor",
    message:
      "Lorem Ipsum is simply dummy text of the printing andypesetting industry. Lorem ipsum a simple Lorem Ipsum has been the industry's standard dummy hic et quidem.",
    image: "/images/testimonial/img1.jpg",
  },
  {
    name: "Cadic Vegeta",
    designation: "Sr. Chef",
    message:
      "Lorem Ipsum is simply dummy text of the printing andypesetting industry. Lorem ipsum a simple Lorem Ipsum has been the industry's standard dummy hic et quidem.",
    image: "/images/testimonial/img2.jpg",
  },
  {
    name: "Jonathan Beri",
    designation: "Manager",
    message:
      "Lorem Ipsum is simply dummy text of the printing andypesetting industry. Lorem ipsum a simple Lorem Ipsum has been the industry's standard dummy hic et quidem.",
    image: "/images/testimonial/img3.jpg",
  },
];

function normalizeTestimonial(testimonial, index) {
  const fallback = fallbackTestimonials[index % fallbackTestimonials.length];

  return {
    name: firstValue(testimonial, ["name", "client_name", "author"], fallback.name),
    designation: firstValue(
      testimonial,
      ["designation", "position", "role", "title"],
      fallback.designation
    ),
    message: firstValue(
      testimonial,
      ["message", "description", "testimonial", "content", "review"],
      fallback.message
    ),
    image: toApiImageUrl(
      firstValue(testimonial, ["image", "photo", "avatar", "client_image"]),
      fallback.image
    ),
  };
}

export default function TestimonialSection({ testimonials = fallbackTestimonials }) {
  const items = (testimonials.length ? testimonials : fallbackTestimonials)
    .slice(0, 6)
    .map((testimonial, index) => normalizeTestimonial(testimonial, index));

  return (
    <section className="testimonial pb-6">
      <div className="container">
        <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
          <h2 className="m-0">
            What <span>People Say About Us</span>
          </h2>
          <p className="mb-0">
            Travel has helped us to understand the meaning of life and it has helped us become
            better people. Each time we travel, we see the world with new eyes.
          </p>
        </div>
        <div className="review-slider">
          {items.map((testimonial) => (
            <div className="item" key={`${testimonial.name}-${testimonial.image}`}>
              <div className="testimonial-item1 text-center">
                <div className="details">
                  <p className="m-0">{testimonial.message}</p>
                </div>
                <div className="author-info mt-2">
                  <a href="#">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </a>
                  <div className="author-title">
                    <h4 className="m-0 pink">{testimonial.name}</h4>
                    <span>{testimonial.designation}</span>
                  </div>
                </div>
                <i className="fa fa-quote-left mb-2"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
