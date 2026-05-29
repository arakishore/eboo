import { firstValue } from "@/lib/api";

export function normalizeFaq(faq, index) {
  return {
    question: firstValue(faq, ["question", "title", "name"], `Question ${index + 1}`),
    answer: firstValue(
      faq,
      ["answer", "description", "content"],
      "Our team will share more details with you during trip planning."
    ),
  };
}

export default function FaqAccordion({ faqs = [] }) {
  const items = faqs.map((faq, index) => normalizeFaq(faq, index));

  if (!items.length) {
    return (
      <div className="faq-empty-state text-center bg-white">
        <h3>No FAQs found</h3>
        <p className="mb-0">
          We could not find any frequently asked questions right now. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="accrodion-grp faq-accrodion" data-grp-name="faq-accrodion">
      {items.map((faq, index) => (
        <div className={`accrodion ${index === 0 ? "active" : ""}`} key={faq.question}>
          <div className="accrodion-title">
            <h5 className="mb-0">{faq.question}</h5>
          </div>
          <div
            className="accrodion-content"
            style={{ display: index === 0 ? "block" : "none" }}
          >
            <div className="inner">
              <p>{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
