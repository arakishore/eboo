import { firstValue, toApiImageUrl } from "@/lib/api";

function normalizeLogo(logo, index) {
  const name = firstValue(logo, ["name", "title", "alt"], `Partner logo ${index + 1}`);
  const image = firstValue(logo, ["image", "logo", "logo_url", "image_url"]);

  return {
    src: image ? toApiImageUrl(image, "") : "",
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

function fillLogoSet(logos, minimumItems = 12) {
  if (logos.length >= minimumItems) {
    return logos;
  }

  return Array.from({ length: minimumItems }, (_, index) => logos[index % logos.length]);
}

export default function PartnersLogoSlider({ logos = [] }) {
  if (!logos.length) {
    return null;
  }

  const normalizedItems = logos
    .slice(0, 12)
    .map((logo, index) => normalizeLogo(logo, index))
    .filter((logo) => logo.src);

  if (!normalizedItems.length) {
    return null;
  }

  const items = fillLogoSet(normalizedItems);

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
