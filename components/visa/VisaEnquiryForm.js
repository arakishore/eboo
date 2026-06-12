"use client";

import { useState } from "react";
import TurnstileCaptcha from "@/components/common/TurnstileCaptcha";
import { ContactEnquiryError, submitContactEnquiry } from "@/lib/contact-enquiry";

const visaTypes = [
  "Tourist Visa",
  "Business Visa",
  "Student Visa",
  "Work Visa",
  "Family / Visit Visa",
  "Transit Visa",
  "Medical Visa",
  "Conference / Event Visa",
];

const initialForm = {
  destination_country: "",
  visa_type: "",
  travel_date: "",
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

function buildVisaEnquiryMessage(formData) {
  const lines = [
    "Visa enquiry",
    `Destination Country: ${formData.destination_country}`,
    `Visa Type: ${formData.visa_type}`,
    `Travel Date: ${formData.travel_date}`,
    `Passengers: ${formData.passengers}`,
    formData.message.trim() ? `Message: ${formData.message.trim()}` : null,
  ];

  return lines.filter(Boolean).join("\n");
}

export default function VisaEnquiryForm({ countries = [] }) {
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

    if (!formData.destination_country) {
      nextErrors.destination_country = "Please select destination country.";
    }
    if (!formData.visa_type) nextErrors.visa_type = "Please select visa type.";
    if (!formData.travel_date) nextErrors.travel_date = "Please select travel date.";
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
    setSubmitNotice("Submitting your visa enquiry...");

    try {
      await submitContactEnquiry({
        enquiry_type: "visa",
        destination_country: formData.destination_country,
        visa_type: formData.visa_type,
        travel_date: formData.travel_date,
        passengers: Number(formData.passengers),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: `Visa enquiry - ${formData.visa_type}`,
        message: buildVisaEnquiryMessage(formData),
        turnstile_token: turnstileToken,
        ...getTrackingFields(),
      });

      setFormData(initialForm);
      setTurnstileToken("");
      setCaptchaKey((current) => current + 1);
      setSubmitNotice("");
      setSuccessMessage("Thank you. Our visa assistance team will contact you shortly.");
    } catch (error) {
      setSubmitNotice("");
      if (error instanceof ContactEnquiryError) {
        setErrors(normalizeSubmitErrors(error.errors));
        setApiError(error.message);
      } else {
        setApiError("Unable to submit visa enquiry. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="service-form-box h-100">
      <span className="service-form-eyebrow">Visa Assistance</span>
      <p className="service-form-intro">
        Share your destination, visa type, and travel details so our team can guide you.
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
            <label className="service-field">
              <i className="fa fa-globe" aria-hidden="true"></i>
              <select
                name="destination_country"
                value={formData.destination_country}
                onChange={handleChange}
                aria-invalid={Boolean(errors.destination_country)}
              >
                <option value="">Destination Country *</option>
                {countries.length ? null : (
                  <option value="" disabled>
                    No countries available
                  </option>
                )}
                {countries.map((country) => (
                  <option value={country.name} key={country.id || country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </label>
            {errors.destination_country ? (
              <span className="contact-field-error">
                {getErrorText(errors.destination_country)}
              </span>
            ) : null}
          </div>
          <div>
            <label className="service-field">
              <i className="fa fa-id-card" aria-hidden="true"></i>
              <select
                name="visa_type"
                value={formData.visa_type}
                onChange={handleChange}
                aria-invalid={Boolean(errors.visa_type)}
              >
                <option value="">Visa Type *</option>
                {visaTypes.map((visaType) => (
                  <option value={visaType} key={visaType}>
                    {visaType}
                  </option>
                ))}
              </select>
            </label>
            {errors.visa_type ? (
              <span className="contact-field-error">{getErrorText(errors.visa_type)}</span>
            ) : null}
          </div>
        </div>

        <div className="service-form-grid">
          <div>
            <span className="service-date-label">Travel Date *</span>
            <label className="service-field">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              <input
                type="date"
                name="travel_date"
                value={formData.travel_date}
                onChange={handleChange}
                aria-invalid={Boolean(errors.travel_date)}
              />
            </label>
            {errors.travel_date ? (
              <span className="contact-field-error">{getErrorText(errors.travel_date)}</span>
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
          placeholder="Any visa history, appointment preference, or special request?"
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
          {isSubmitting ? "Submitting..." : "Submit Visa Enquiry"}
        </button>
      </form>
    </div>
  );
}
