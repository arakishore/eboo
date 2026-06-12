"use client";

import { useState } from "react";
import TurnstileCaptcha from "@/components/common/TurnstileCaptcha";
import { ContactEnquiryError, submitContactEnquiry } from "@/lib/contact-enquiry";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  pickup_location: "",
  dropoff_location: "",
  pickup_date: "",
  adults: "1",
  children: "0",
};

function getErrorText(error) {
  return Array.isArray(error) ? error[0] : error;
}

function normalizeSubmitErrors(errors = {}) {
  return {
    ...errors,
    turnstile: errors.turnstile || errors.turnstile_token,
  };
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

function buildFlightEnquiryMessage(formData) {
  const lines = [
    "Flight enquiry",
    formData.pickup_location.trim() ? `From: ${formData.pickup_location.trim()}` : null,
    formData.dropoff_location.trim() ? `To: ${formData.dropoff_location.trim()}` : null,
    formData.pickup_date ? `Date Traveling: ${formData.pickup_date}` : null,
    `Adults: ${formData.adults || 0}`,
    `Children: ${formData.children || 0}`,
  ];

  return lines.filter(Boolean).join("\n");
}

export default function FlightEnquiryForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitNotice, setSubmitNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const adultCount = formData.adults === "" ? null : Number(formData.adults);
    const childCount = Number(formData.children || 0);

    if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
    if (!formData.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (formData.email.trim() && !emailPattern.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (adultCount !== null && (!Number.isInteger(adultCount) || adultCount <= 0)) {
      nextErrors.adults = "Please enter at least 1 adult.";
    }
    if (!Number.isInteger(childCount) || childCount < 0) {
      nextErrors.children = "Please enter a valid children count.";
    }
    if (!turnstileToken) nextErrors.turnstile = "Please complete the CAPTCHA.";

    return nextErrors;
  };

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

    if (apiError) setApiError("");
    if (submitNotice) setSubmitNotice("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    setSubmitNotice("Submitting your flight enquiry...");

    try {
      await submitContactEnquiry({
        enquiry_type: "flight",
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        pickup_location: formData.pickup_location.trim(),
        dropoff_location: formData.dropoff_location.trim(),
        pickup_date: formData.pickup_date,
        dropoff_date: "",
        adults: formData.adults === "" ? "" : Number(formData.adults),
        children: Number(formData.children || 0),
        subject: "Flight enquiry",
        message: buildFlightEnquiryMessage(formData),
        turnstile_token: turnstileToken,
        ...getTrackingFields(),
      });

      setFormData(initialForm);
      setTurnstileToken("");
      setCaptchaKey((current) => current + 1);
      setSubmitNotice("");
      setSuccessMessage("Thank you. Our flight team will contact you shortly.");
    } catch (error) {
      setSubmitNotice("");
      if (error instanceof ContactEnquiryError) {
        setErrors(normalizeSubmitErrors(error.errors));
        setApiError(error.message);
      } else {
        setApiError("Unable to submit flight enquiry. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="service-form-box h-100">
      <span className="service-form-eyebrow">Flight Enquiry</span>
      <p className="service-form-intro">
        Share your contact details and route preferences so our team can help with flight options.
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
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
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
              placeholder="Phone Number *"
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

        <div className="service-form-grid">
          <div>
            <label className="service-field">
              <i className="fa fa-plane" aria-hidden="true"></i>
              <input
                type="text"
                name="pickup_location"
                placeholder="From"
                value={formData.pickup_location}
                onChange={handleChange}
                aria-invalid={Boolean(errors.pickup_location)}
              />
            </label>
          </div>
          <div>
            <label className="service-field">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <input
                type="text"
                name="dropoff_location"
                placeholder="To"
                value={formData.dropoff_location}
                onChange={handleChange}
                aria-invalid={Boolean(errors.dropoff_location)}
              />
            </label>
          </div>
        </div>

        <div>
          <span className="service-date-label">Date Traveling</span>
          <label className="service-field">
            <i className="fa fa-calendar" aria-hidden="true"></i>
            <input
              type="date"
              name="pickup_date"
              value={formData.pickup_date}
              onChange={handleChange}
              aria-invalid={Boolean(errors.pickup_date)}
            />
          </label>
        </div>

        <div className="service-form-grid">
          <div>
            <label className="service-field">
              <i className="fa fa-user" aria-hidden="true"></i>
              <input
                type="number"
                name="adults"
                placeholder="Adult"
                min="0"
                step="1"
                value={formData.adults}
                onChange={handleChange}
                aria-invalid={Boolean(errors.adults)}
              />
            </label>
            {errors.adults ? (
              <span className="contact-field-error">{getErrorText(errors.adults)}</span>
            ) : null}
          </div>
          <div>
            <label className="service-field">
              <i className="fa fa-child" aria-hidden="true"></i>
              <input
                type="number"
                name="children"
                placeholder="Children"
                min="0"
                step="1"
                value={formData.children}
                onChange={handleChange}
                aria-invalid={Boolean(errors.children)}
              />
            </label>
            {errors.children ? (
              <span className="contact-field-error">{getErrorText(errors.children)}</span>
            ) : null}
          </div>
        </div>

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

        <button type="submit" className="service-availability-submit" disabled={isSubmitting}>
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
          {isSubmitting ? "Submitting..." : "Submit Flight Enquiry"}
        </button>
      </form>
    </div>
  );
}
