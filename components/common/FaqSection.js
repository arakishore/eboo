import FaqAccordion from "@/components/faqs/FaqAccordion";

export default function FaqSection({ faqs = [] }) {
  if (!faqs.length) {
    return null;
  }

  return (
    <section className="faq-main pb-6">
      <div className="container">
        <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
          <h2 className="m-0">
            Frequently Asked <span>Questions</span>
          </h2>
          <p className="mb-0">
            Find quick answers to common travel planning and booking questions.
          </p>
        </div>
        <FaqAccordion faqs={faqs.slice(0, 6)} />
      </div>
    </section>
  );
}
