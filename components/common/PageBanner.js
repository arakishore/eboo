import Link from "next/link";

export default function PageBanner({
  title,
  breadcrumbLabel = title,
  backgroundImage = "/images/bg/bg8.jpg",
}) {
  return (
    <section
      className="breadcrumb-main pb-0"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="breadcrumb-outer pt-10">
        <div className="container">
          <div className="breadcrumb-content bread-content pt-10">
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {breadcrumbLabel}
                </li>
              </ul>
            </nav>
            <h1 className="mb-0 white text-uppercase">{title}</h1>
          </div>
        </div>
      </div>
      <div className="dot-overlay"></div>
    </section>
  );
}
