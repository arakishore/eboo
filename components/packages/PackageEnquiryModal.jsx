"use client";

import { useState } from "react";
import TurnstileCaptcha from "@/components/common/TurnstileCaptcha";
import { ContactEnquiryError, submitContactEnquiry } from "@/lib/contact-enquiry";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  travel_date: "",
  adults: "",
  children: "",
  message: "",
};

function getErrorText(error) {
  return Array.isArray(error) ? error[0] : error;
}

function getTrackingFields() {
  if (typeof window === "undefined") {
    return {};
  }

  const searchParams = new URLSearchParams(window.location.search);
  const tracking = {
    page_url: window.location.href,
    referrer_url: document.referrer || "",
  };

  ["utm_source", "utm_medium", "utm_campaign"].forEach((key) => {
    const value = searchParams.get(key);

    if (value) {
      tracking[key] = value;
    }
  });

  return tracking;
}

export default function PackageEnquiryModal({ packageItem }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (packageItem?.id === undefined || packageItem?.id === null || packageItem?.id === "") {
      nextErrors.package_id = "Package information is missing.";
    }
    if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
    if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      setApiError("");
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setApiError("");
    setSuccessMessage("");

    try {
      await submitContactEnquiry({
        enquiry_type: "package",
        package_id: packageItem.id,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        travel_date: formData.travel_date,
        adults: formData.adults,
        children: formData.children,
        message: formData.message.trim(),
        turnstile_token: turnstileToken,
        ...getTrackingFields(),
      });

      setFormData(initialForm);
      setTurnstileToken("");
      setCaptchaKey((current) => current + 1);
      setSuccessMessage("Thank you for your enquiry. Our team will contact you shortly.");
    } catch (error) {
      if (error instanceof ContactEnquiryError) {
        setErrors(error.errors || {});
        setApiError(error.message);
      } else {
        setApiError("Unable to submit enquiry. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="packageEnquiryModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="packageEnquiryModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h5 className="modal-title" id="packageEnquiryModalTitle">
                Interested in this Package?
              </h5>
              <p className="mb-0">
                Fill out the form below and our travel expert will contact you shortly.
              </p>
            </div>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input type="hidden" name="package_id" value={packageItem.id || ""} readOnly />

              {successMessage ? (
                <div className="alert alert-success" role="status">
                  {successMessage}
                </div>
              ) : null}

              {apiError ? (
                <div className="alert alert-danger" role="alert">
                  {apiError}
                </div>
              ) : null}

              {errors.package_id ? (
                <div className="alert alert-danger" role="alert">
                  {getErrorText(errors.package_id)}
                </div>
              ) : null}

              <div className="row">
                <div className="col-md-6">
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

                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email ? (
                      <span className="contact-field-error">{getErrorText(errors.email)}</span>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.phone)}
                    />
                    {errors.phone ? (
                      <span className="contact-field-error">{getErrorText(errors.phone)}</span>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="date"
                      name="travel_date"
                      className={`form-control ${errors.travel_date ? "is-invalid" : ""}`}
                      value={formData.travel_date}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.travel_date)}
                    />
                    {errors.travel_date ? (
                      <span className="contact-field-error">
                        {getErrorText(errors.travel_date)}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="number"
                      name="adults"
                      className={`form-control ${errors.adults ? "is-invalid" : ""}`}
                      placeholder="Adults"
                      min="0"
                      value={formData.adults}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.adults)}
                    />
                    {errors.adults ? (
                      <span className="contact-field-error">{getErrorText(errors.adults)}</span>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="number"
                      name="children"
                      className={`form-control ${errors.children ? "is-invalid" : ""}`}
                      placeholder="Children"
                      min="0"
                      value={formData.children}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.children)}
                    />
                    {errors.children ? (
                      <span className="contact-field-error">
                        {getErrorText(errors.children)}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <textarea
                      name="message"
                      className={`form-control ${errors.message ? "is-invalid" : ""}`}
                      placeholder="Message *"
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.message)}
                    ></textarea>
                    {errors.message ? (
                      <span className="contact-field-error">
                        {getErrorText(errors.message)}
                      </span>
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
            </div>

            <div className="modal-footer">
              <button type="button" className="nir-btn-black" data-dismiss="modal">
                Close
              </button>
              <button type="submit" className="nir-btn" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
