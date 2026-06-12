"use client";

import { useState } from "react";
import TurnstileCaptcha from "@/components/common/TurnstileCaptcha";
import { ContactEnquiryError, submitContactEnquiry } from "@/lib/contact-enquiry";

const cruiseTypes = [
  "Ocean Cruise",
  "River Cruise",
  "Luxury Cruise",
  "Family Cruise",
  "Honeymoon Cruise",
  "Adventure Cruise",
  "Expedition Cruise",
  "World Cruise",
];

const initialForm = {
  cruise_type: "",
  pickup_date: "",
  passengers: "1",
  name: "",
  email: "",
  phone: "",
  message: "",
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

function buildCruiseEnquiryMessage(formData) {
  const lines = [
    "Cruise enquiry",
    `Cruise Type: ${formData.cruise_type}`,
    `Departure Date: ${formData.pickup_date}`,
    `Passengers: ${formData.passengers}`,
    formData.message.trim() ? `Message: ${formData.message.trim()}` : null,
  ];

  return lines.filter(Boolean).join("\n");
}

export default function CruiseEnquiryForm() {
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
    const passengerCount = Number(formData.passengers);

    if (!formData.cruise_type) nextErrors.cruise_type = "Please select cruise type.";
    if (!formData.pickup_date) nextErrors.pickup_date = "Please select departure date.";
    if (!Number.isInteger(passengerCount) || passengerCount <= 0) {
      nextErrors.passengers = "Please enter at least 1 passenger.";
    }
    if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
   if (formData.email.trim() && !emailPattern.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) nextErrors.phone = "Please enter your phone number.";
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
    setSubmitNotice("Submitting your cruise enquiry...");

    try {
      await submitContactEnquiry({
        enquiry_type: "cruise",
        cruise_type: formData.cruise_type,
        pickup_date: formData.pickup_date,
        passengers: Number(formData.passengers),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.cruise_type.trim(),
        message: buildCruiseEnquiryMessage(formData),
        turnstile_token: turnstileToken,
        ...getTrackingFields(),
      });

      setFormData(initialForm);
      setTurnstileToken("");
      setCaptchaKey((current) => current + 1);
      setSubmitNotice("");
      setSuccessMessage("Thank you. Our cruise team will contact you shortly.");
    } catch (error) {
      setSubmitNotice("");
      if (error instanceof ContactEnquiryError) {
        setErrors(normalizeSubmitErrors(error.errors));
        setApiError(error.message);
      } else {
        setApiError("Unable to submit cruise enquiry. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="service-form-box h-100">
      <span className="service-form-eyebrow">Plan Your Cruise</span>
      <p className="service-form-intro">
        Share your cruise style, departure date, and traveller count so our team can help.
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
        <div>
          <label className="service-field">
            <i className="fa fa-ship" aria-hidden="true"></i>
            <select
              name="cruise_type"
              value={formData.cruise_type}
              onChange={handleChange}
              aria-invalid={Boolean(errors.cruise_type)}
            >
              <option value="">Cruise Type *</option>
              {cruiseTypes.map((cruiseType) => (
                <option value={cruiseType} key={cruiseType}>
                  {cruiseType}
                </option>
              ))}
            </select>
          </label>
          {errors.cruise_type ? (
            <span className="contact-field-error">{getErrorText(errors.cruise_type)}</span>
          ) : null}
        </div>

        <div className="service-form-grid">
          <div>
            <span className="service-date-label">Departure Date *</span>
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
            {errors.pickup_date ? (
              <span className="contact-field-error">{getErrorText(errors.pickup_date)}</span>
            ) : null}
          </div>
          <div>
            <span className="service-date-label">Passengers *</span>
            <label className="service-field">
              <i className="fa fa-users" aria-hidden="true"></i>
              <input
                type="number"
                name="passengers"
                placeholder="Passengers *"
                min="1"
                step="1"
                value={formData.passengers}
                onChange={handleChange}
                aria-invalid={Boolean(errors.passengers)}
              />
            </label>
            {errors.passengers ? (
              <span className="contact-field-error">{getErrorText(errors.passengers)}</span>
            ) : null}
          </div>
        </div>

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

        <textarea
          name="message"
          placeholder="Preferred route, cabin, budget, or special request?"
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

        <button type="submit" className="service-availability-submit" disabled={isSubmitting}>
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
          {isSubmitting ? "Submitting..." : "Submit Cruise Enquiry"}
        </button>
      </form>
    </div>
  );
}
