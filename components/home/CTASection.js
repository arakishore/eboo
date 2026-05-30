import Link from "next/link";

export default function CTASection() {
    return (
        <div className="cta-horizon bg-navy pt-4 pb-4">
            <div className="container d-md-flex align-items-center justify-content-between">
                <h4 className="mb-0 white">It’s Time For a New Adventure! Don’t Wait Any Longer. Contact us!</h4>
                <Link href={`/destinations/`} className="nir-btn">
                    Find More Destination
                </Link>
               
            </div>
        </div>
    );
}   