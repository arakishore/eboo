import NotFoundContent from "@/components/common/NotFoundContent";

export const metadata = {
  title: "Package Not Found | Eboo",
};

export default function PackageNotFound() {
  return (
    <NotFoundContent
      title="Package not found"
      message="The travel package you are looking for is not available right now."
      primaryHref="/"
      primaryLabel="Back to Home"
      secondaryHref="/packages"
      secondaryLabel="Back to Packages"
    />
  );
}
