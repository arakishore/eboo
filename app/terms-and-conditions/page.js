import LegalContent from "@/components/common/LegalContent";
import PageBanner from "@/components/common/PageBanner";

export const metadata = {
  title: "Terms and Conditions | Eboo",
  description:
    "Review Eboo terms and conditions for travel enquiries, bookings, payments, cancellations, and traveller responsibilities.",
};

const sections = [
  {
    title: "Use of Our Services",
    body: [
      "By using Eboo to enquire about or book travel services, you agree to provide accurate information and use our website and communication channels for lawful travel planning purposes.",
      "Travel packages, hotel stays, transport, activities, and related services may be provided by third-party suppliers. Their own terms may also apply to your booking.",
    ],
  },
  {
    title: "Quotes and Availability",
    body: [
      "Prices, inclusions, schedules, room categories, seats, and activity slots are subject to availability until confirmed. A quotation does not guarantee a booking unless payment and supplier confirmation are completed.",
    ],
    items: [
      "Displayed package information may be updated without prior notice.",
      "Seasonal surcharges, taxes, exchange rates, and supplier fees may affect final pricing.",
      "Special requests are noted with suppliers but cannot be guaranteed unless confirmed in writing.",
    ],
  },
  {
    title: "Payments",
    body: [
      "Bookings may require a deposit, full payment, or staged payments depending on the destination, supplier conditions, and departure date.",
      "Failure to make payment by the stated deadline may result in cancellation, repricing, or loss of availability.",
    ],
  },
  {
    title: "Cancellations and Changes",
    body: [
      "Cancellation and amendment charges depend on the suppliers involved and the timing of your request. Some flights, hotel rates, permits, visas, activities, or promotional packages may be non-refundable.",
    ],
    items: [
      "Change requests should be made as early as possible.",
      "Refund timelines depend on supplier processing and payment provider rules.",
      "No-show, unused services, or early departures may not qualify for a refund.",
    ],
  },
  {
    title: "Traveller Responsibilities",
    body: [
      "Travellers are responsible for valid passports, visas, health documentation, insurance, punctual arrival, and compliance with destination laws and supplier rules.",
      "Eboo is not responsible for losses caused by incorrect documents, late arrival, denied boarding, government restrictions, weather disruption, or events outside our reasonable control.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageBanner
        title="Terms & Conditions"
        breadcrumbLabel="Terms & Conditions"
        backgroundImage="/images/bg/bg6.jpg"
      />
      <LegalContent
        updatedAt="May 26, 2026"
        intro="These Terms and Conditions outline how Eboo provides travel planning, quotations, bookings, and customer support for tours and related services."
        sections={sections}
      />
    </>
  );
}
