import PageBanner from "@/components/common/PageBanner";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig } from "@/config/site";

const contactCards = [
  {
    title: "Address",
    icon: "fa fa-map-marker",
    lines: siteConfig.address
      ? [
        `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      ]
      : [],
  },
  {
    title: "Phone",
    icon: "fa fa-phone",
    lines: siteConfig.contact.phone
      ? [siteConfig.contact.phone]
      : [],
  },
  {
    title: "Email",
    icon: "fa fa-envelope",
    lines: siteConfig.contact.email
      ? [siteConfig.contact.email]
      : ["support@eboo.com", "info@eboo.com"],
  },
  {
    title: "Working Hours",
    icon: "fa fa-clock-o",
    lines: siteConfig.contact.workingHours
      ? [siteConfig.contact.workingHours]
      : ["Monday - Friday", "10:00 AM - 5:00 PM"],
  },
];

const socialLinks = [
  { label: "Facebook", icon: "fab fa-facebook-f", href: siteConfig.social.facebook },
  { label: "Instagram", icon: "fab fa-instagram", href: siteConfig.social.instagram },
  { label: "Twitter/X", icon: "fab fa-twitter", href: siteConfig.social.twitter },
  { label: "YouTube", icon: "fab fa-youtube", href: siteConfig.social.youtube },
  { label: "LinkedIn", icon: "fab fa-linkedin-in", href: siteConfig.social.linkedin },
];

export const metadata = {
  title: "Contact Us | Eboo",
  description:
    "Contact Eboo for travel planning support, booking questions, and tour package assistance.",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact Us" breadcrumbLabel="Contact Us" />

      <section className="contact-main contact1 bg-grey eboo-contact-page">
        <div className="container">
          <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
            <h2 className="m-0">
              Let&apos;s Plan Your <span>Next Journey</span>
            </h2>
            <p className="mb-0">
              Reach our travel specialists for custom itineraries, package details,
              and smooth booking support.
            </p>
          </div>

          <div className="contact-info">
            <div className="row">
              {contactCards.map((card) => (
                <div className="col-lg-3 col-md-6 col-sm-12" key={card.title}>
                  <div className="info-item eboo-contact-card bg-white mb-4">
                    <div className="info-icon">
                      <i className={card.icon} aria-hidden="true"></i>
                    </div>
                    <div className="info-content">
                      <h4>{card.title}</h4>
                      {card.lines.map((line) => (
                        <p className="m-0" key={line}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="row align-items-stretch mt-4">
            <div className="col-lg-5 col-md-12 mb-4">
              <div className="eboo-contact-intro bg-white">
                <span className="contact-kicker">Information About Us</span>
                <h3>Travel help, handled with care.</h3>
                <p>
                  Whether you are comparing destinations, confirming trip dates, or
                  building a private tour, send us the details and we will guide you
                  with practical options.
                </p>
                <div className="contact-social-block">
                  <h4>Follow Our Travel Updates</h4>
                  <ul className="contact-social-links" aria-label="Social media links">
                    {socialLinks.map((social) => (
                      <li key={social.label}>
                        <a href={social.href} aria-label={social.label}>
                          <i className={social.icon} aria-hidden="true"></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 mb-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
