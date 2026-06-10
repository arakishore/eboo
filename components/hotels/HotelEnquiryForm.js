"use client";

import { useEffect, useRef, useState } from "react";
import TurnstileCaptcha from "@/components/common/TurnstileCaptcha";
import { ContactEnquiryError, submitContactEnquiry } from "@/lib/contact-enquiry";
import { API_BASE_URL } from "@/lib/api";

const initialForm = {
  hotel_id: null,
  hotel_name: "",
  check_in: "",
  check_out: "",
  adults: "2",
  children: "0",
  rooms: "1",
  name: "",
  phone: "",
  email: "",
  message: "",
};

const OTHER_HOTEL = {
  id: null,
  name: "Other / Not Listed",
  displayName: "Other / Not Listed",
  isOther: true,
};

function getErrorText(error) {
  return Array.isArray(error) ? error[0] : error;
}

function normalizeSubmitErrors(errors = {}) {
  return {
    ...errors,
    hotel_name: errors.hotel_name || errors.hotel_id || errors.hotel,
    turnstile: errors.turnstile || errors.turnstile_token,
  };
}

function getHotelList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.data?.hotels)) return payload.data.hotels;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.hotels)) return payload.hotels;

  return [];
}

function normalizeHotel(hotel) {
  const id = hotel?.id ?? hotel?.hotel_id ?? hotel?.value ?? null;
  const name = hotel?.name || hotel?.hotel_name || hotel?.title || "";
  const location = hotel?.location || hotel?.city || hotel?.destination || "";
  const category = hotel?.category || hotel?.type || hotel?.hotel_type || hotel?.rating || "";
  const meta = [location, category].filter(Boolean).join(" - ");

  return {
    id,
    name,
    displayName: meta ? `${name}, ${meta}` : name,
    isOther: false,
  };
}

function buildHotelEnquiryMessage(formData) {
  const lines = [
    "Hotel availability enquiry",
    `Hotel: ${formData.hotel_name.trim()}`,
    formData.hotel_id ? `Hotel ID: ${formData.hotel_id}` : null,
    `Check In: ${formData.check_in}`,
    `Check Out: ${formData.check_out}`,
    `Adults: ${formData.adults}`,
    `Children: ${formData.children || 0}`,
    `Rooms: ${formData.rooms}`,
    formData.message.trim() ? `Special Request: ${formData.message.trim()}` : null,
  ];

  return lines.filter(Boolean).join("\n");
}

function getTrackingFields() {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    page_url: window.location.href,
    referrer_url: document.referrer || "",
  };
}

export default function HotelEnquiryForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitNotice, setSubmitNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const [hotelQuery, setHotelQuery] = useState("");
  const [hotelResults, setHotelResults] = useState([]);
  const [isSearchingHotels, setIsSearchingHotels] = useState(false);
  const [isHotelDropdownOpen, setIsHotelDropdownOpen] = useState(false);
  const [isOtherHotel, setIsOtherHotel] = useState(false);
  const hotelSearchRef = useRef(null);

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.hotel_name.trim()) nextErrors.hotel_name = "Please select or enter a hotel.";
    if (!formData.check_in) nextErrors.check_in = "Please select a check-in date.";
    if (!formData.check_out) nextErrors.check_out = "Please select a check-out date.";
    if (formData.check_in && formData.check_out && formData.check_out <= formData.check_in) {
      nextErrors.check_out = "Check-out date must be after check-in date.";
    }
    if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
    if (!formData.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (formData.email.trim() && !emailPattern.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!turnstileToken) nextErrors.turnstile = "Please complete the CAPTCHA.";

    return nextErrors;
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (hotelSearchRef.current && !hotelSearchRef.current.contains(event.target)) {
        setIsHotelDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const query = hotelQuery.trim();

    if (isOtherHotel || query.length < 2) {
      return undefined;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setIsSearchingHotels(true);

      try {
        const response = await fetch(
          `${API_BASE_URL.replace(/\/+$/, "")}/hotels/search?q=${encodeURIComponent(query)}`,
          {
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          setHotelResults([]);
          return;
        }

        const payload = await response.json();
        const hotels = getHotelList(payload).map(normalizeHotel).filter((hotel) => hotel.name);

        setHotelResults(hotels);
        setIsHotelDropdownOpen(true);
      } catch (error) {
        if (error.name !== "AbortError") {
          setHotelResults([]);
        }
      } finally {
        setIsSearchingHotels(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [hotelQuery, isOtherHotel]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }

    if (apiError) {
      setApiError("");
    }

    if (submitNotice) {
      setSubmitNotice("");
    }
  };

  const handleHotelQueryChange = (event) => {
    const value = event.target.value;

    setHotelQuery(value);
    setIsOtherHotel(false);
    setFormData((current) => ({
      ...current,
      hotel_id: null,
      hotel_name: value,
    }));
    setIsHotelDropdownOpen(value.trim().length >= 2);

    if (value.trim().length < 2) {
      setHotelResults([]);
      setIsSearchingHotels(false);
    }

    if (errors.hotel_name) {
      setErrors((current) => ({
        ...current,
        hotel_name: "",
      }));
    }
  };

  const handleOtherHotelChange = (event) => {
    const value = event.target.value;

    setHotelQuery(value);
    setFormData((current) => ({
      ...current,
      hotel_id: null,
      hotel_name: value,
    }));

    if (!value.trim()) {
      setIsOtherHotel(false);
      setHotelResults([]);
      setIsSearchingHotels(false);
      setIsHotelDropdownOpen(false);
    }

    if (errors.hotel_name) {
      setErrors((current) => ({
        ...current,
        hotel_name: "",
      }));
    }
  };

  const handleHotelSelect = (hotel) => {
    const otherSelected = Boolean(hotel.isOther);
    const typedHotelName = hotelQuery.trim();

    setIsOtherHotel(otherSelected);
    setHotelQuery(otherSelected ? typedHotelName : hotel.displayName);
    setFormData((current) => ({
      ...current,
      hotel_id: otherSelected ? null : hotel.id,
      hotel_name: otherSelected ? typedHotelName : hotel.name,
    }));
    setIsHotelDropdownOpen(false);
    setHotelResults([]);

    if (errors.hotel_name) {
      setErrors((current) => ({
        ...current,
        hotel_name: "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event?.preventDefault?.();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      setApiError("");
      setSubmitNotice("");
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setApiError("");
    setSuccessMessage("");
    setSubmitNotice("Submitting your hotel enquiry...");

    try {
      const payload = {
        enquiry_type: "hotel",
        hotel_id: formData.hotel_id,
        hotel_name: formData.hotel_name.trim(),
        check_in: formData.check_in,
        check_out: formData.check_out,
        adults: Number(formData.adults),
        children: Number(formData.children || 0),
        rooms: Number(formData.rooms),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: `Hotel availability enquiry - ${formData.hotel_name.trim()}`,
        message: buildHotelEnquiryMessage(formData),
        turnstile_token: turnstileToken,
        ...getTrackingFields(),
      };

      await submitContactEnquiry(payload);

      setFormData(initialForm);
      setHotelQuery("");
      setHotelResults([]);
      setIsHotelDropdownOpen(false);
      setIsOtherHotel(false);
      setTurnstileToken("");
      setCaptchaKey((current) => current + 1);
      setSubmitNotice("");
      setSuccessMessage("Thank you. Our team will contact you with hotel options shortly.");
    } catch (error) {
      setSubmitNotice("");
      if (error instanceof ContactEnquiryError) {
        setErrors(normalizeSubmitErrors(error.errors));
        setApiError(error.message);
      } else {
        setApiError("Unable to submit hotel enquiry. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const dropdownItems = [...hotelResults, OTHER_HOTEL];
  const showNoHotelsFound =
    hotelQuery.trim().length >= 2 && !isSearchingHotels && hotelResults.length === 0;

  return (
    <div className="service-form-box h-100">
      <span className="service-form-eyebrow">Plan Your Stay</span>
      <p className="service-form-intro">
        Share your stay details and our team will get back with suitable hotel options.
      </p>

      {successMessage ? (
        <div className="contact-success-message" role="status">
          {successMessage}
        </div>
      ) : null}

      {apiError ? (
        <div className="alert alert-danger" role="alert">
          {apiError}
        </div>
      ) : null}

      {submitNotice ? (
        <div className="alert alert-info" role="status">
          {submitNotice}
        </div>
      ) : null}

      <form className="service-enquiry-form" onSubmit={handleSubmit} noValidate>
        <div className="service-form-grid">
          <div className="hotel-autocomplete" ref={hotelSearchRef}>
            {isOtherHotel ? (
              <label className="service-field">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <input
                  type="text"
                  name="hotel_name"
                  placeholder="Enter Hotel Name or Preferred Location"
                  value={formData.hotel_name}
                  onChange={handleOtherHotelChange}
                  aria-invalid={Boolean(errors.hotel_name)}
                />
              </label>
            ) : (
              <>
                <input type="hidden" name="hotel_id" value={formData.hotel_id ?? ""} />
                <label className="service-field">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <input
                    type="text"
                    name="hotel_name"
                    placeholder="Hotel Name *"
                    value={hotelQuery}
                    onChange={handleHotelQueryChange}
                    onFocus={() => {
                      if (hotelQuery.trim().length >= 2) {
                        setIsHotelDropdownOpen(true);
                      }
                    }}
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={isHotelDropdownOpen}
                    aria-controls="hotel-autocomplete-menu"
                    aria-invalid={Boolean(errors.hotel_name)}
                  />
                </label>
              </>
            )}
            {!isOtherHotel && isHotelDropdownOpen ? (
              <div className="hotel-autocomplete-menu" id="hotel-autocomplete-menu" role="listbox">
                {isSearchingHotels ? (
                  <div className="hotel-autocomplete-status">Searching hotels...</div>
                ) : null}
                {showNoHotelsFound ? (
                  <div className="hotel-autocomplete-status">No hotels found</div>
                ) : null}
                {dropdownItems.map((hotel) => (
                  <button
                    type="button"
                    className="hotel-autocomplete-option"
                    key={hotel.isOther ? "other-hotel" : `${hotel.id}-${hotel.name}`}
                    onClick={() => handleHotelSelect(hotel)}
                    role="option"
                    aria-selected="false"
                  >
                    {hotel.displayName}
                  </button>
                ))}
              </div>
            ) : null}
            {errors.hotel_name ? (
              <span className="contact-field-error">{getErrorText(errors.hotel_name)}</span>
            ) : null}
          </div>
          <div>
            <label className="service-field">
              <i className="fa fa-users" aria-hidden="true"></i>
              <select
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                aria-invalid={Boolean(errors.adults)}
              >
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Adults</option>
                <option value="4">4+ Adults</option>
              </select>
            </label>
            {errors.adults ? (
              <span className="contact-field-error">{getErrorText(errors.adults)}</span>
            ) : null}
          </div>
        </div>

        <div className="service-form-grid">
          <div>
            <label className="service-field">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              <input
                type="date"
                name="check_in"
                placeholder="Check In"
                value={formData.check_in}
                onChange={handleChange}
                aria-invalid={Boolean(errors.check_in)}
              />
            </label>
            {errors.check_in ? (
              <span className="contact-field-error">{getErrorText(errors.check_in)}</span>
            ) : null}
          </div>
          <div>
            <label className="service-field">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              <input
                type="date"
                name="check_out"
                placeholder="Check Out"
                value={formData.check_out}
                onChange={handleChange}
                aria-invalid={Boolean(errors.check_out)}
              />
            </label>
            {errors.check_out ? (
              <span className="contact-field-error">{getErrorText(errors.check_out)}</span>
            ) : null}
          </div>
        </div>

        <div className="service-form-grid">
          <label className="service-field">
            <i className="fa fa-child" aria-hidden="true"></i>
            <select name="children" value={formData.children} onChange={handleChange}>
              <option value="0">No Children</option>
              <option value="1">1 Child</option>
              <option value="2">2 Children</option>
              <option value="3">3 Children</option>
              <option value="4">4+ Children</option>
            </select>
          </label>
          <div>
            <label className="service-field">
              <i className="fa fa-bed" aria-hidden="true"></i>
              <select
                name="rooms"
                value={formData.rooms}
                onChange={handleChange}
                aria-invalid={Boolean(errors.rooms)}
              >
                <option value="1">1 Room</option>
                <option value="2">2 Rooms</option>
                <option value="3">3 Rooms</option>
                <option value="4">4+ Rooms</option>
              </select>
            </label>
            {errors.rooms ? (
              <span className="contact-field-error">{getErrorText(errors.rooms)}</span>
            ) : null}
          </div>
        </div>

        <div className="service-form-grid">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? (
              <span className="contact-field-error">{getErrorText(errors.name)}</span>
            ) : null}
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone ? (
              <span className="contact-field-error">{getErrorText(errors.phone)}</span>
            ) : null}
          </div>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? (
          <span className="contact-field-error">{getErrorText(errors.email)}</span>
        ) : null}

        <textarea
          name="message"
          placeholder="Need airport pickup or any special request?"
          rows="3"
          value={formData.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
        ></textarea>
        <div className="service-captcha">
          <TurnstileCaptcha
            key={captchaKey}
            onSuccess={(token) => {
              setTurnstileToken(token);
              setErrors((current) => ({
                ...current,
                turnstile: "",
              }));
            }}
            onExpire={() => {
              setTurnstileToken("");
            }}
            onError={() => {
              setTurnstileToken("");
              setErrors((current) => ({
                ...current,
                turnstile: "CAPTCHA verification failed. Please try again.",
              }));
            }}
          />
          {errors.turnstile ? (
            <span className="contact-field-error d-block mb-2">
              {getErrorText(errors.turnstile)}
            </span>
          ) : null}
        </div>

        <button
          type="submit"
          className="service-availability-submit"
          disabled={isSubmitting}
        >
          <i className="fa fa-search" aria-hidden="true"></i>
          {isSubmitting ? "Checking..." : "Check Availability"}
        </button>
      </form>
    </div>
  );
}
