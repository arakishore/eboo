import ScrollReveal from "@/components/common/ScrollReveal";

export default function AboutStory() {
  return (
    <section className="about-split about-split--soft about-spacing">
      <div className="container">
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
      </div>
    </section>
  );
}
