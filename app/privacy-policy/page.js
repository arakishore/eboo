import LegalContent from "@/components/common/LegalContent";
import PageBanner from "@/components/common/PageBanner";

export const metadata = {
  title: "Privacy Policy | Eboo",
  description:
    "Read how Eboo collects, uses, protects, and manages information for travel enquiries and bookings.",
};

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We collect information that helps us respond to travel enquiries, prepare itineraries, confirm bookings, and provide support before and during your trip.",
    ],
    items: [
      "Contact details such as name, phone number, email address, and city of residence.",
      "Travel preferences including destination interests, dates, group size, budget range, and special requirements.",
      "Booking details shared with our team, including passenger names, identification details when required by suppliers, and payment status.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "Your information is used to deliver travel services, improve customer care, and keep our communication relevant.",
    ],
    items: [
      "To create quotations, itineraries, confirmations, invoices, and booking updates.",
      "To coordinate with hotels, airlines, transport partners, guides, visa partners, and activity providers.",
      "To send service messages, important travel alerts, policy updates, and optional promotional offers.",
    ],
  },
  {
    title: "Sharing With Travel Partners",
    body: [
      "We only share the details needed to arrange your requested services. Partners are expected to handle traveller information responsibly and use it only for the confirmed booking or enquiry.",
      "We may also disclose information when required by law, regulation, immigration authorities, payment processors, or fraud prevention processes.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "We use reasonable administrative, technical, and operational safeguards to protect personal information from unauthorized access, misuse, alteration, or loss.",
      "No online or offline system is completely risk free, so we encourage travellers to share sensitive documents through official communication channels only.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "You may request access, correction, or deletion of your personal information, subject to booking, tax, legal, or supplier record requirements.",
    ],
    items: [
      "You can opt out of promotional communication at any time.",
      "You can ask us to update inaccurate travel profile information.",
      "You can request clarification about how your details are used for a specific booking.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner
        title="Privacy Policy"
        breadcrumbLabel="Privacy Policy"
        backgroundImage="/images/bg/bg8.jpg"
      />
      <LegalContent
        updatedAt="May 26, 2026"
        intro="This Privacy Policy explains how Eboo handles personal information when you enquire about tours, request quotations, book travel services, or interact with our website."
        sections={sections}
      />
    </>
  );
}
