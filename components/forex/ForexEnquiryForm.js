"use client";

import { useState } from "react";
import TurnstileCaptcha from "@/components/common/TurnstileCaptcha";
import { ContactEnquiryError, submitContactEnquiry } from "@/lib/contact-enquiry";

const initialForm = {
  currency_type: "",
  currency_amount: "",
  travel_date: "",
  name: "",
  phone: "",
  email: "",
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

function buildForexMessage(formData) {
  const currencyAmount = normalizeCurrencyAmount(formData.currency_amount);
  const lines = [
    "Forex enquiry",
    `Type: ${formData.currency_type}`,
    `Value: ${currencyAmount}`,
    `Travel Date: ${formData.travel_date}`,
    formData.message.trim() ? `Message: ${formData.message.trim()}` : null,
  ];

  return lines.filter(Boolean).join("\n");
}

function normalizeCurrencyAmount(value) {
  const amount = value.trim().replace(/,/g, "");

  return /^\d+$/.test(amount) ? `${amount}.00` : amount;
}

export default function ForexEnquiryForm() {
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
    const currencyAmount = normalizeCurrencyAmount(formData.currency_amount);

    if (!formData.currency_type) nextErrors.currency_type = "Please select currency or card.";
    if (!currencyAmount) {
      nextErrors.currency_amount = "Please enter the value.";
    } else if (!/^\d+(\.\d+)?$/.test(currencyAmount)) {
      nextErrors.currency_amount = "Please enter a valid decimal amount.";
    }
    if (!formData.travel_date) nextErrors.travel_date = "Please select your travel date.";
    if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
    if (!formData.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (formData.email.trim() && !emailPattern.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
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

    if (apiError) {
      setApiError("");
    }

    if (submitNotice) {
      setSubmitNotice("");
    }
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
    setSubmitNotice("Submitting your forex enquiry...");

    try {
      const currencyType = formData.currency_type.trim();
      const currencyAmount = normalizeCurrencyAmount(formData.currency_amount);

      await submitContactEnquiry({
        enquiry_type: "forex",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        currency_type: currencyType,
        currency_amount: currencyAmount,
        forex_type: currencyType,
        forex_amount: currencyAmount,
        value: currencyAmount,
        subject: `Forex enquiry - ${currencyType}`,
        message: buildForexMessage(formData),
        travel_date: formData.travel_date,
        turnstile_token: turnstileToken,
        ...getTrackingFields(),
      });

      setFormData(initialForm);
      setTurnstileToken("");
      setCaptchaKey((current) => current + 1);
      setSubmitNotice("");
      setSuccessMessage("Thank you. Our forex team will contact you shortly.");
    } catch (error) {
      setSubmitNotice("");
      if (error instanceof ContactEnquiryError) {
        setErrors(normalizeSubmitErrors(error.errors));
        setApiError(error.message);
      } else {
        setApiError("Unable to submit forex enquiry. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="service-form-box h-100">
      <span className="service-form-eyebrow">Forex Question</span>
      <p className="service-form-intro">
        Share your currency or card requirement and our team will help with the next steps.
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
        <div className="forex-form-field">
          <label className="service-field">
            <i className="fa fa-credit-card" aria-hidden="true"></i>
            <select
              name="currency_type"
              value={formData.currency_type}
              onChange={handleChange}
              aria-invalid={Boolean(errors.currency_type)}
            >
              <option value="">Type: Currency / Card *</option>
              <option value="Currency">Currency</option>
              <option value="Card">Card</option>
            </select>
          </label>
          {errors.currency_type ? (
            <span className="contact-field-error">{getErrorText(errors.currency_type)}</span>
          ) : null}
        </div>

        <div className="forex-form-field">
          <label className="service-field">
            <i className="fa fa-money" aria-hidden="true"></i>
            <input
              type="text"
              name="currency_amount"
              placeholder="Value *"
              inputMode="decimal"
              value={formData.currency_amount}
              onChange={handleChange}
              aria-invalid={Boolean(errors.currency_amount)}
            />
          </label>
          {errors.currency_amount ? (
            <span className="contact-field-error">{getErrorText(errors.currency_amount)}</span>
          ) : null}
        </div>

        <div className="forex-form-field">
          <label className="service-field forex-travel-date-field">
            <i className="fa fa-calendar" aria-hidden="true"></i>
            <input
              type="date"
              name="travel_date"
              value={formData.travel_date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              aria-invalid={Boolean(errors.travel_date)}
            />
            <span className="forex-travel-date-label">Travel Date</span>
          </label>
          {errors.travel_date ? (
            <span className="contact-field-error">{getErrorText(errors.travel_date)}</span>
          ) : null}
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
          placeholder="Any preferred currency, country, or note?"
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

        <button type="submit" disabled={isSubmitting}>
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
          {isSubmitting ? "Submitting..." : "Submit Forex Enquiry"}
        </button>
      </form>
    </div>
  );
}
