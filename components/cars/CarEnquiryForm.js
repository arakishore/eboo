"use client";

import { useState } from "react";
import TurnstileCaptcha from "@/components/common/TurnstileCaptcha";
import { ContactEnquiryError, submitContactEnquiry } from "@/lib/contact-enquiry";

const vehicleTypes = [
  "Hatchback",
  "Sedan",
  "SUV",
  "Luxury Car",
  "Tempo Traveller (9-12 Seater)",
  "Mini Bus (18-26 Seater)",
  "Coach Bus (35+ Seater)",
  "Other",
];

const initialForm = {
  pickup_location: "",
  dropoff_location: "",
  pickup_date: "",
  dropoff_date: "",
  passengers: "1",
  vehicle_type: "",
  is_air_con: "1",
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

function buildCarEnquiryMessage(formData) {
  const lines = [
    "Car rental enquiry",
    `Pickup Location: ${formData.pickup_location.trim()}`,
    `Dropoff Location: ${formData.dropoff_location.trim()}`,
    `Pickup Date: ${formData.pickup_date}`,
    `Dropoff Date: ${formData.dropoff_date}`,
    `Passengers: ${formData.passengers}`,
    `Vehicle Type: ${formData.vehicle_type}`,
    `Air Conditioning: ${formData.is_air_con === "1" ? "Yes" : "No"}`,
    formData.message.trim() ? `Message: ${formData.message.trim()}` : null,
  ];

  return lines.filter(Boolean).join("\n");
}

export default function CarEnquiryForm() {
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

    if (!formData.pickup_location.trim()) {
      nextErrors.pickup_location = "Please enter pickup location.";
    }
    if (!formData.dropoff_location.trim()) {
      nextErrors.dropoff_location = "Please enter dropoff location.";
    }
    if (!formData.pickup_date) nextErrors.pickup_date = "Please select pickup date.";
    if (!formData.dropoff_date) nextErrors.dropoff_date = "Please select dropoff date.";
    if (formData.pickup_date && formData.dropoff_date && formData.dropoff_date < formData.pickup_date) {
      nextErrors.dropoff_date = "Dropoff date cannot be before pickup date.";
    }
    if (!Number.isInteger(passengerCount) || passengerCount <= 0) {
      nextErrors.passengers = "Please enter at least 1 passenger.";
    }
    if (!formData.vehicle_type) nextErrors.vehicle_type = "Please select a vehicle type.";
    if (!["0", "1"].includes(formData.is_air_con)) {
      nextErrors.is_air_con = "Please choose air conditioning preference.";
    }
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
    setSubmitNotice("Submitting your car enquiry...");

    try {
      const vehicleType = formData.vehicle_type.trim();

      await submitContactEnquiry({
        enquiry_type: "car",
        pickup_location: formData.pickup_location.trim(),
        dropoff_location: formData.dropoff_location.trim(),
        pickup_date: formData.pickup_date,
        dropoff_date: formData.dropoff_date,
        passengers: Number(formData.passengers),
        vehicle_type: vehicleType,
        is_air_con: formData.is_air_con,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: `Car enquiry - ${vehicleType}`,
        message: buildCarEnquiryMessage(formData),
        turnstile_token: turnstileToken,
        ...getTrackingFields(),
      });

      setFormData(initialForm);
      setTurnstileToken("");
      setCaptchaKey((current) => current + 1);
      setSubmitNotice("");
      setSuccessMessage("Thank you. Our car rental team will contact you shortly.");
    } catch (error) {
      setSubmitNotice("");
      if (error instanceof ContactEnquiryError) {
        setErrors(normalizeSubmitErrors(error.errors));
        setApiError(error.message);
      } else {
        setApiError("Unable to submit car enquiry. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="service-form-box h-100">
      <span className="service-form-eyebrow">Book Your Ride</span>
      <p className="service-form-intro">
        Share your route, dates, and vehicle preference so our team can arrange the right ride.
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
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <input
                type="text"
                name="pickup_location"
                placeholder="Pickup Location *"
                value={formData.pickup_location}
                onChange={handleChange}
                aria-invalid={Boolean(errors.pickup_location)}
              />
            </label>
            {errors.pickup_location ? (
              <span className="contact-field-error">{getErrorText(errors.pickup_location)}</span>
            ) : null}
          </div>
          <div>
            <label className="service-field">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <input
                type="text"
                name="dropoff_location"
                placeholder="Dropoff Location *"
                value={formData.dropoff_location}
                onChange={handleChange}
                aria-invalid={Boolean(errors.dropoff_location)}
              />
            </label>
            {errors.dropoff_location ? (
              <span className="contact-field-error">{getErrorText(errors.dropoff_location)}</span>
            ) : null}
          </div>
        </div>

        <div className="service-form-grid">
          <div>
            <span className="service-date-label">Pickup Date *</span>
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
            <span className="service-date-label">Dropoff Date *</span>
            <label className="service-field">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              <input
                type="date"
                name="dropoff_date"
                value={formData.dropoff_date}
                onChange={handleChange}
                aria-invalid={Boolean(errors.dropoff_date)}
              />
            </label>
            {errors.dropoff_date ? (
              <span className="contact-field-error">{getErrorText(errors.dropoff_date)}</span>
            ) : null}
          </div>
        </div>

        <div className="service-form-grid">
          <div>
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
          <div>
            <label className="service-field">
              <i className="fa fa-car" aria-hidden="true"></i>
              <select
                name="vehicle_type"
                value={formData.vehicle_type}
                onChange={handleChange}
                aria-invalid={Boolean(errors.vehicle_type)}
              >
                <option value="">Vehicle Type *</option>
                {vehicleTypes.map((vehicleType) => (
                  <option value={vehicleType} key={vehicleType}>
                    {vehicleType}
                  </option>
                ))}
              </select>
            </label>
            {errors.vehicle_type ? (
              <span className="contact-field-error">{getErrorText(errors.vehicle_type)}</span>
            ) : null}
          </div>
        </div>

        <div>
          <label className="service-field">
            <i className="fa fa-snowflake-o" aria-hidden="true"></i>
            <select
              name="is_air_con"
              value={formData.is_air_con}
              onChange={handleChange}
              aria-invalid={Boolean(errors.is_air_con)}
            >
              <option value="1">Air Conditioned</option>
              <option value="0">Non Air Conditioned</option>
            </select>
          </label>
          {errors.is_air_con ? (
            <span className="contact-field-error">{getErrorText(errors.is_air_con)}</span>
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
          placeholder="Any pickup timing, luggage, or special request?"
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
          {isSubmitting ? "Submitting..." : "Submit Car Enquiry"}
        </button>
      </form>
    </div>
  );
}
