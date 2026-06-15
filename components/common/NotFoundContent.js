import Image from "next/image";
import Link from "next/link";

export default function NotFoundContent({
  title,
  message,
  primaryHref = "/",
  primaryLabel = "Back to Home",
  secondaryHref,
  secondaryLabel,
}) {
  return (
    <section className="error eboo-not-found overflow-hidden p-0">
      <div className="container">
        <div className="error-content text-center">
          <p className="not-found-kicker mb-1">404</p>
          <h1 className="mb-1">{title}</h1>
          <div className="not-found-image mb-4">
            <Image
              src="/images/404-1.svg"
              alt=""
              width={250}
              height={200}
              priority
            />
          </div>
          <h2 className="m-0">{message}</h2>
          <div className="error-btn mt-4">
            <Link href={primaryHref} className="nir-btn mr-2">
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link href={secondaryHref} className="nir-btn-black">
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
