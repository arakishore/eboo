import { firstValue, toApiImageUrl } from "@/lib/api";

const partnerLogos = [
  { src: "/images/clients/logo-01.png", alt: "Partner logo 1" },
  { src: "/images/clients/logo-02.png", alt: "Partner logo 2" },
  { src: "/images/clients/logo-03.png", alt: "Partner logo 3" },
  { src: "/images/clients/logo-04.png", alt: "Partner logo 4" },
  { src: "/images/clients/logo-02.png", alt: "Partner logo 5" },
  { src: "/images/clients/logo-03.png", alt: "Partner logo 6" },
  { src: "/images/clients/logo-04.png", alt: "Partner logo 7" },
  { src: "/images/clients/logo-01.png", alt: "Partner logo 8" },
  { src: "/images/clients/logo-02.png", alt: "Partner logo 9" },
];

function normalizeLogo(logo, index) {
  const fallback = partnerLogos[index % partnerLogos.length];
  const name = firstValue(logo, ["name", "title", "alt"], fallback.alt);

  return {
    src: toApiImageUrl(
      firstValue(logo, ["image", "logo", "logo_url", "image_url"]),
      fallback.src
    ),
    alt: name,
  };
}

function LogoItems({ logos, hidden = false }) {
  return logos.map((logo, index) => (
    <div
      className="col-sm-2 partners-logo-slide"
      key={`${logo.src}-${index}-${hidden}`}
      aria-hidden={hidden ? "true" : undefined}
    >
      <div className="client-logo item">
        <a href="#" aria-label={hidden ? undefined : logo.alt} tabIndex={hidden ? -1 : 0}>
          <img src={logo.src} alt={hidden ? "" : logo.alt} />
        </a>
      </div>
    </div>
  ));
}

export default function PartnersLogoSlider({ logos = partnerLogos }) {
  const items = (logos.length ? logos : partnerLogos)
    .slice(0, 12)
    .map((logo, index) => normalizeLogo(logo, index));

  return (
    <section className="partners bordernone pt-5 pb-5 partners-logo-section">
      <div className="container">
        <div className="partners-logo-viewport">
          <div className="row attract-slider partners-logo-track">
            <LogoItems logos={items} />
            <LogoItems logos={items} hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
