import LegalContent from "@/components/common/LegalContent";
import PageBanner from "@/components/common/PageBanner";

export const metadata = {
  title: "Cookie Policy | Eboo",
  description:
    "Learn how Eboo uses cookies and similar technologies to improve website performance, preferences, analytics, and travel browsing.",
};

const sections = [
  {
    title: "What Cookies Are",
    body: [
      "Cookies are small text files stored on your device when you visit a website. They help websites remember preferences, support essential functions, and understand how visitors interact with pages.",
    ],
  },
  {
    title: "How We Use Cookies",
    body: [
      "Eboo uses cookies and similar technologies to provide a smoother browsing experience and improve the way travellers explore destinations, packages, and enquiry options.",
    ],
    items: [
      "Essential cookies help pages load correctly and maintain core website functionality.",
      "Preference cookies may remember language, region, or form choices where available.",
      "Analytics cookies help us understand page performance, popular destinations, and user journeys.",
    ],
  },
  {
    title: "Third-Party Cookies",
    body: [
      "Some features may rely on trusted third-party services such as maps, embedded media, analytics tools, payment providers, or advertising platforms. These providers may set their own cookies according to their policies.",
    ],
  },
  {
    title: "Managing Cookies",
    body: [
      "Most browsers allow you to block, delete, or manage cookies through browser settings. Blocking some cookies may affect website performance or limit parts of the booking and enquiry experience.",
    ],
    items: [
      "Review your browser privacy settings to manage stored cookies.",
      "Clear cookies if you want to reset saved site preferences.",
      "Use private browsing modes when you prefer temporary browsing sessions.",
    ],
  },
  {
    title: "Policy Updates",
    body: [
      "We may update this Cookie Policy when our website features, analytics tools, or legal requirements change. The latest version will be posted on this page with an updated date.",
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <PageBanner
        title="Cookie Policy"
        breadcrumbLabel="Cookie Policy"
        backgroundImage="/images/bg/bg4.jpg"
      />
      <LegalContent
        updatedAt="May 26, 2026"
        intro="This Cookie Policy explains how Eboo uses cookies and similar technologies to support website functionality and improve travel browsing."
        sections={sections}
      />
    </>
  );
}
