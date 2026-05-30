import PageBanner from "@/components/common/PageBanner";
import FaqAccordion from "@/components/faqs/FaqAccordion";
import { getApiCollection } from "@/lib/api";

export const metadata = {
  title: "FAQs | Eboo",
  description: "Find answers to frequently asked questions about Eboo travel services.",
};

export default async function FaqsPage() {
  const faqs = await getApiCollection("faqs", []);

  return (
    <>
      <PageBanner title="FAQs" breadcrumbLabel="FAQs" />

      <section className="faq-page-section bg-grey">
        <div className="container">
          <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
            <h2 className="m-0">
              Frequently Asked <span>Questions</span>
            </h2>
            <p className="mb-0">
              Browse quick answers about planning, bookings, packages, and travel support.
            </p>
          </div>

          <div className="row">
            <div className="col-lg-10 col-md-12 mx-auto">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
