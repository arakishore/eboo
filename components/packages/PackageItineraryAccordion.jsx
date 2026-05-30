"use client";

import { useState } from "react";

function normalizeItineraries(itineraries = []) {
  if (Array.isArray(itineraries)) {
    return itineraries;
  }

  if (itineraries && typeof itineraries === "object") {
    return Object.values(itineraries);
  }

  return [];
}

function ItineraryItem({ item, active, onToggle }) {
  const dayLabel = item.day_number || item.day;

  return (
    <div className={`accrodion ${active ? "active" : ""}`}>
      <div
        className="accrodion-title"
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <h5 className="mb-0">
          {dayLabel ? <span>Day {dayLabel}</span> : null}
          {dayLabel && item.title ? " - " : null}
          {item.title}
        </h5>
      </div>

      <div className="accrodion-content" style={{ display: active ? "block" : "none" }}>
        <div className="inner">
          {item.description ? <p>{item.description}</p> : null}

          {item.meals ? (
            <p className="mb-1">
              <strong>Meals:</strong> {item.meals}
            </p>
          ) : null}

          {item.overnight_stay ? (
            <p className="mb-0">
              <strong>Overnight Stay:</strong> {item.overnight_stay}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function PackageItineraryAccordion({ itineraries = [] }) {
  const items = normalizeItineraries(itineraries);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) {
    return null;
  }

  return (
    <>
      <h4>Tour Itinerary</h4>
      {items.map((item, index) => (
        <ItineraryItem
          item={item}
          active={activeIndex === index}
          key={item.id || `${item.day_number || item.day || index}-${item.title || index}`}
          onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
        />
      ))}
    </>
  );
}
