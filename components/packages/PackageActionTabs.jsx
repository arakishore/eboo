"use client";

import { useState } from "react";

const sectionLinks = [
  {
    id: "description",
    label: "Highlight",
    icon: "fa fa-magic",
  },
  {
    id: "itinerary",
    label: "Itinerary",
    icon: "fa fa-map",
  },
  {
    id: "single-map",
    label: "Map",
    icon: "fa fa-location-arrow",
  },
];

export default function PackageActionTabs({ whatsappUrl }) {
  const [activeSection, setActiveSection] = useState(sectionLinks[0].id);

  const handleSectionClick = (event, sectionId) => {
    event.preventDefault();

    const section = document.getElementById(sectionId);

    if (section) {
      setActiveSection(sectionId);
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  return (
    <div className="package-action-tabs align-items-center">
      <div className="container">
        <nav className="package-action-tabs-inner" aria-label="Package sections">
          {sectionLinks.map((section) => (
            <a
              href={`#${section.id}`}
              className={`package-action-tab ${activeSection === section.id ? "active" : ""}`}
              onClick={(event) => handleSectionClick(event, section.id)}
              key={section.id}
              title={section.label}
            >
              <i className={section.icon} aria-hidden="true"></i>
              <span>{section.label}</span>
            </a>
          ))}

          <button
            type="button"
            className="package-action-tab package-action-pill"
            data-toggle="modal"
            data-target="#packageEnquiryModal"
            title="Ask About This Package"
          >
            <i className="fa fa-comments" aria-hidden="true"></i>
            <span>Ask About This Package</span>
          </button>

          <a
            href={whatsappUrl}
            className="package-action-tab package-action-pill package-whatsapp-pill"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp Enquiry"
          >
            <i className="fab fa-whatsapp" aria-hidden="true"></i>
            <span>WhatsApp Enquiry</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
