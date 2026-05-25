import ScrollReveal from "@/components/common/ScrollReveal";

export default function AboutIntro() {
  return (
    <section className="about-split about-spacing">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <ScrollReveal direction="left" className="about-image-frame">
              <img src="/images/new-deal/deal3.jpg" alt="Travelers exploring a scenic destination" />
            </ScrollReveal>
          </div>
          <div className="col-lg-6">
            <ScrollReveal direction="right" delay={0.1} className="about-copy">
              <span className="about-eyebrow">Who we are</span>
              <h2>
                Thoughtful travel planning for journeys that feel effortless.
              </h2>
              <p>
                Eboo brings destination knowledge, dependable coordination, and a personal
                touch to every itinerary. From family holidays to curated group departures,
                we shape each trip around comfort, timing, and the small details that make
                travel feel easy.
              </p>
              <p>
                Our team works with trusted local partners so every guest can explore with
                confidence, enjoy richer experiences, and come home with stories worth
                sharing.
              </p>
              <div className="about-points">
                <span>Custom itineraries</span>
                <span>Local expertise</span>
                <span>Reliable support</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
