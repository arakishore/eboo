"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

const DEFAULT_MESSAGE =
  "Hello Eboo Travels! I am interested in your travel services.";

const ROUTE_MESSAGES = [
  {
    match: (pathname) => pathname === "/",
    message: DEFAULT_MESSAGE,
  },
  {
    match: (pathname) => pathname.startsWith("/destinations/"),
    message: "Hello Eboo Travels! I am interested in this destination.",
  },
  {
    match: (pathname) => pathname === "/destinations",
    message: "Hello Eboo Travels! I am interested in your destinations.",
  },
  {
    match: (pathname) => pathname.startsWith("/packages/"),
    message: "Hello Eboo Travels! I am interested in this tour package.",
  },
  {
    match: (pathname) => pathname === "/packages",
    message: "Hello Eboo Travels! I am interested in your tour packages.",
  },
  {
    match: (pathname) => pathname === "/hotels",
    message: "Hello Eboo Travels! I am looking for hotel booking assistance.",
  },
  {
    match: (pathname) => pathname === "/cars",
    message: "Hello Eboo Travels! I am interested in car rental services.",
  },
  {
    match: (pathname) => pathname === "/visa",
    message: "Hello Eboo Travels! I need visa assistance.",
  },
  {
    match: (pathname) => pathname === "/forex",
    message: "Hello Eboo Travels! I need forex services.",
  },
  {
    match: (pathname) => pathname === "/flights",
    message: "Hello Eboo Travels! I need flight booking assistance.",
  },
  {
    match: (pathname) => pathname === "/cruise" || pathname === "/cruises",
    message: "Hello Eboo Travels! I am interested in cruise packages.",
  },
];

function getWhatsAppMessage(pathname) {
  const normalizedPathname = pathname || "/";

  if (normalizedPathname.startsWith("/destinations/")) {
    const destinationName = getRouteName(normalizedPathname, "/destinations/");

    return destinationName
      ? `Hello Eboo Travels! I am interested in your ${destinationName} destination.`
      : "Hello Eboo Travels! I am interested in this destination.";
  }

  return (
    ROUTE_MESSAGES.find((route) => route.match(normalizedPathname))?.message ||
    DEFAULT_MESSAGE
  );
}

function getRouteName(pathname, prefix) {
  const slug = pathname.slice(prefix.length).split("/")[0];

  if (!slug) return "";

  try {
    return decodeURIComponent(slug)
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  } catch {
    return "";
  }
}

export default function WhatsAppFloatingButton() {
  const pathname = usePathname();

  const whatsappUrl = useMemo(() => {
    const whatsappNumber = siteConfig.contact.whatsapp.replace(/\D/g, "");
    const message = getWhatsAppMessage(pathname);

    if (!whatsappNumber) return "";

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
  }, [pathname]);

  if (!whatsappUrl) return null;

  return (
    <a
      href={whatsappUrl}
      className="whatsapp-floating-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Eboo Travels on WhatsApp"
    >
      <svg
        aria-hidden="true"
        className="whatsapp-floating-button__icon"
        viewBox="0 0 32 32"
        focusable="false"
      >
        <path d="M19.11 17.54c-.29-.14-1.71-.84-1.98-.94-.27-.1-.46-.14-.65.14-.19.29-.75.94-.92 1.13-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.44.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49h-.56c-.19 0-.51.07-.77.36-.27.29-1.01.99-1.01 2.41s1.04 2.8 1.18 2.99c.14.19 2.04 3.12 4.95 4.37.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34ZM16.03 4.8c-6.17 0-11.18 5.01-11.18 11.18 0 2.11.59 4.08 1.61 5.76L4.75 28l6.4-1.68a11.1 11.1 0 0 0 4.88 1.13c6.17 0 11.18-5.01 11.18-11.18S22.2 4.8 16.03 4.8Zm0 20.74c-1.61 0-3.18-.41-4.58-1.18l-.33-.18-3.8 1 1.01-3.7-.22-.38a9.48 9.48 0 0 1-1.36-4.89c0-5.25 4.03-9.52 9.28-9.52s9.28 4.27 9.28 9.52-4.03 9.33-9.28 9.33Z" />
      </svg>
    </a>
  );
}
