import Link from "next/link";

export default function CTASection() {
  return (
    <div className="cta-horizon home-cta bg-navy">
      <div className="container home-cta-inner">
        <h4 className="home-cta-title white">
          It&apos;s Time For a New Adventure! Don&apos;t Wait Any Longer. Contact us!
        </h4>
        <Link href="/destinations/" className="nir-btn home-cta-button">
          Find More Destination
        </Link>
      </div>
    </div>
  );
}
