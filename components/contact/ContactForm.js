"use client";

import { useState } from "react";
import TurnstileCaptcha from "@/components/common/TurnstileCaptcha";
import { ContactEnquiryError, submitContactEnquiry } from "@/lib/contact-enquiry";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
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

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitNotice, setSubmitNotice] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
    if (formData.email.trim() && !emailPattern.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (!formData.subject.trim()) nextErrors.subject = "Please enter a subject.";
    if (!formData.message.trim()) nextErrors.message = "Please enter your message.";
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
    setSubmitNotice("Submitting your message...");

    try {
      await submitContactEnquiry({
        enquiry_type: "contact",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        turnstile_token: turnstileToken,
        ...getTrackingFields(),
      });

      setFormData(initialForm);
      setTurnstileToken("");
      setCaptchaKey((current) => current + 1);
      setSubmitNotice("");
      setSuccessMessage("Thank you for your enquiry. Our team will contact you shortly.");
    } catch (error) {
      setSubmitNotice("");
      if (error instanceof ContactEnquiryError) {
        setErrors(normalizeSubmitErrors(error.errors));
        setApiError(error.message);
      } else {
        setApiError("Unable to submit Contact Form. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-form" className="contact-form eboo-contact-form">
      <h3>Keep in Touch</h3>
      <p className="mb-4">
        Tell us what kind of journey you are planning and our travel team will help
        shape the next steps.
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

      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? (
                <span className="contact-field-error">{getErrorText(errors.name)}</span>
              ) : null}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? (
                <span className="contact-field-error">{getErrorText(errors.email)}</span>
              ) : null}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone ? (
                <span className="contact-field-error">{getErrorText(errors.phone)}</span>
              ) : null}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
              <input
                type="text"
                name="subject"
                className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                placeholder="Subject *"
                value={formData.subject}
                onChange={handleChange}
                aria-invalid={Boolean(errors.subject)}
              />
              {errors.subject ? (
                <span className="contact-field-error">{getErrorText(errors.subject)}</span>
              ) : null}
            </div>
          </div>
          <div className="col-sm-12">
            <div className="textarea">
              <textarea
                name="message"
                className={errors.message ? "is-invalid" : ""}
                placeholder="Message *"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message ? (
                <span className="contact-field-error">{getErrorText(errors.message)}</span>
              ) : null}
            </div>
          </div>
        </div>
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
        <div className="comment-btn text-right mt-3">
          <button type="submit" className="nir-btn" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
