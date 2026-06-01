const DEFAULT_API_URL = "https://webtreeindia.com/eboo/websiteadmin/public/api";

const CONTACT_ENQUIRY_API_URL = `${
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_URL
}`.replace(/\/+$/, "");

export class ContactEnquiryError extends Error {
  constructor(message, errors = {}) {
    super(message);
    this.name = "ContactEnquiryError";
    this.errors = errors;
  }
}

async function parseJsonResponse(response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

function getValidationErrors(payload) {
  if (!payload || typeof payload !== "object") {
    return {};
  }

  const errors = payload.errors || payload.validation_errors || payload.data?.errors || {};

  return errors && typeof errors === "object" && !Array.isArray(errors) ? errors : {};
}

function getErrorMessage(payload, fallback) {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  return payload.message || payload.error || fallback;
}

export async function submitContactEnquiry(payload) {
  const response = await fetch(`${CONTACT_ENQUIRY_API_URL}/contact-enquiries`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responsePayload = await parseJsonResponse(response);
  const validationErrors = getValidationErrors(responsePayload);
  const requestFailed =
    !response.ok || responsePayload.status === false || responsePayload.success === false;

  if (requestFailed) {
    throw new ContactEnquiryError(
      getErrorMessage(responsePayload, "Unable to submit enquiry. Please try again."),
      validationErrors
    );
  }

  return responsePayload;
}
