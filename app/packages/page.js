import PageBanner from "@/components/common/PageBanner";
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
      <PageBanner title="Tour Packages" breadcrumbLabel="Packages" />

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
