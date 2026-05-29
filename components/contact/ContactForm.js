"use client";

import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
    if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (!formData.subject.trim()) nextErrors.subject = "Please enter a subject.";
    if (!formData.message.trim()) nextErrors.message = "Please enter your message.";

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
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    console.log("Contact form submitted:", formData);
    setFormData(initialForm);
    setErrors({});
    setSuccessMessage("Thank you. Your message has been noted for follow-up.");
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

      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? <span className="contact-field-error">{errors.name}</span> : null}
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
              {errors.email ? <span className="contact-field-error">{errors.email}</span> : null}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
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
              {errors.phone ? <span className="contact-field-error">{errors.phone}</span> : null}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
              <input
                type="text"
                name="subject"
                className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                aria-invalid={Boolean(errors.subject)}
              />
              {errors.subject ? (
                <span className="contact-field-error">{errors.subject}</span>
              ) : null}
            </div>
          </div>
          <div className="col-sm-12">
            <div className="textarea">
              <textarea
                name="message"
                className={errors.message ? "is-invalid" : ""}
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message ? (
                <span className="contact-field-error">{errors.message}</span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="comment-btn text-right mt-3">
          <button type="submit" className="nir-btn">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
