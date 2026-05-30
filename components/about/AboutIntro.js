import ScrollReveal from "@/components/common/ScrollReveal";

export default function AboutIntro() {
  return (
    <section className="about-split about-spacing">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <ScrollReveal direction="left" className="about-image-frame">
              <img src="/images/dummy.jpg" alt="Travelers exploring a scenic destination" />
            </ScrollReveal>
          </div>
          <div className="col-lg-6">
            <ScrollReveal direction="right" delay={0.1} className="about-copy">
              <span className="about-eyebrow">Who we are</span>
              <h2>
                Driven by Passion not Profit
              </h2>
              <p>
                We’re a team fuelled by an unwavering passion for travel — one that goes beyond routine itineraries and surface-level sightseeing. We share our love for travel and inspire others to discover the world through our carefully curated destinations.  Dissatisfied with the typical hop-on, hop-off approach, we set out to create thoughtfully designed, uniquely curated experiences, executed to perfection.

              </p>

              <div className="about-points">
                <span>Custom itineraries</span>
                <span>Local expertise</span>
                <span>Reliable support</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-6 order-2 order-lg-1">
            <ScrollReveal direction="left" delay={0.1} className="about-copy">
              <span className="about-eyebrow">Our promise</span>
              <h2>
                We design trips with care before, during, and after every journey.
              </h2>
              <p>
                Travel should feel exciting, not complicated. That is why Eboo keeps the
                process clear from the first conversation: practical route planning,
                comfortable stays, well-paced days, and support when plans need a quick
                adjustment.
              </p>
              <p>
                Whether you want quiet beaches, cultural discovery, mountain escapes, or a
                smooth multi-city holiday, we help turn the idea into a journey that fits.
              </p>
               
            </ScrollReveal>
          </div>
          <div className="col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
            <ScrollReveal direction="right" className="about-image-frame about-image-frame--offset">
              <img src="/images/dummy.jpg" alt="Beautiful travel destination" />
            </ScrollReveal>
          </div>
        </div>
        <div className="row align-items-center">

          <div className="col-lg-6 mb-4 mb-lg-0">
            <ScrollReveal direction="left" className="about-image-frame">
              <img src="/images/dummy.jpg" alt="Travelers exploring a scenic destination" />
            </ScrollReveal>
          </div>
          <div className="col-lg-6">
            <ScrollReveal direction="right" delay={0.1} className="about-copy">
              <span className="about-eyebrow">Who we are</span>
              <h2>
                We make you Experience, Immerse, Connect and Feel the soul of every place you explore.
              </h2>
              <p>
                We understand you work hard all year and get only a few precious days to unwind and explore the world. We’re here to make sure every second of that well-deserved break is meaningful and rewarding. Our goal is to be the difference that truly makes your journey unforgettable.
              </p>


            </ScrollReveal>
          </div>
        </div>

      </div>
    </section>
  );
}
