function LegalBlock({ title, body, items }) {
  return (
    <article className="legal-block">
      <h2>{title}</h2>
      {body?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {items ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export default function LegalContent({ updatedAt, intro, sections }) {
  return (
    <section className="legal-content-section bg-lgrey">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <article className="legal-content bg-white">
              <div className="legal-intro border-b">
                <span className="about-eyebrow">Travel policy</span>
                <h2>Clear information for confident travel planning.</h2>
                <p>{intro}</p>
                <p className="legal-updated mb-0">Last updated: {updatedAt}</p>
              </div>

              {sections.map((section) => (
                <LegalBlock key={section.title} {...section} />
              ))}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
