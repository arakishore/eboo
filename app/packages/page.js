import Link from "next/link";
import PackageCard from "@/components/packages/PackageCard";
import { normalizePackages, packages as fallbackPackages } from "@/data/packages";
import { getApiCollection } from "@/lib/api";
 
export const metadata = {
  title: "Packages | Eboo",
  description:
    "Browse Eboo travel packages with destinations, durations, and guided tour details.",
};

export default async function PackagesPage() {
  const packageResponse = await getApiCollection("packages", fallbackPackages);
  const packages = normalizePackages(packageResponse);

  return (
    <>
      <section
        className="breadcrumb-main pb-0"
        style={{ backgroundImage: "url(/images/bg/bg8.jpg)" }}
      >
        <div className="breadcrumb-outer pt-10">
          <div className="container">
            <div className="breadcrumb-content d-md-flex align-items-center pt-10">
              <h2 className="mb-0">Package Full</h2>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Package Full
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
                  {packages.length ? (
                    packages.map((packageItem) => (
                      <PackageCard key={packageItem.id} packageItem={packageItem} />
                    ))
                  ) : (
                    <div className="col-lg-12">
                      <p className="text-center mb-0">No packages found.</p>
                    </div>
                  )}

                   
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
