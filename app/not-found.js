import NotFoundContent from "@/components/common/NotFoundContent";

export const metadata = {
  title: "Page Not Found | Eboo",
};

export default function NotFound() {
  return (
    <NotFoundContent
      title="Page not found"
      message="We are sorry, but the page you requested was not found."
      primaryHref="/"
      primaryLabel="Back to Home"
    />
  );
}
