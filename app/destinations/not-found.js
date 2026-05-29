import NotFoundContent from "@/components/common/NotFoundContent";

export const metadata = {
  title: "Destination Not Found | Eboo",
};

export default function DestinationNotFound() {
  return (
    <NotFoundContent
      title="Destination not found"
      message="The destination you are looking for is not available right now."
      primaryHref="/"
      primaryLabel="Back to Home"
      secondaryHref="/destinations"
      secondaryLabel="Back to Destinations"
    />
  );
}
