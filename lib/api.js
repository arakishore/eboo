export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://webtreeindia.com/eboo/websiteadmin/public/api";

export const API_PUBLIC_URL = API_BASE_URL.replace(/\/api\/?$/, "");
export const IMAGE_PLACEHOLDER = "/images/dummy-eboo.png";

const DEFAULT_REVALIDATE = 0;
const DEFAULT_TIMEOUT = 8000;

function trimSlashes(value = "") {
  return String(value).replace(/^\/+|\/+$/g, "");
}

function buildUrl(endpoint) {
  const path = trimSlashes(endpoint);
  return `${API_BASE_URL.replace(/\/+$/, "")}/${path}`;
}

export function normalizeApiResponse(payload) {
  if (Array.isArray(payload)) {
    return { ok: true, data: payload, message: "" };
  }

  if (!payload || typeof payload !== "object") {
    return { ok: false, data: null, message: "Empty API response" };
  }

  if (payload.status === false || payload.success === false) {
    return {
      ok: false,
      data: payload.data ?? null,
      message: payload.message || "API request failed",
    };
  }

  if (Object.prototype.hasOwnProperty.call(payload, "data")) {
    return {
      ok: payload.status !== false,
      data: payload.data,
      message: payload.message || "",
    };
  }

  return { ok: true, data: payload, message: payload.message || "" };
}

export async function apiGet(endpoint, options = {}) {
  const {
    fallback = null,
    revalidate = DEFAULT_REVALIDATE,
    timeout = DEFAULT_TIMEOUT,
  } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(buildUrl(endpoint), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate },
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        data: fallback,
        message: `API request failed with status ${response.status}`,
      };
    }

    const payload = await response.json();
    const normalized = normalizeApiResponse(payload);

    if (!normalized.ok) {
      return {
        ok: false,
        data: fallback ?? normalized.data,
        message: normalized.message,
      };
    }

    return {
      ok: true,
      data: normalized.data ?? fallback,
      message: normalized.message,
    };
  } catch (error) {
    return {
      ok: false,
      data: fallback,
      message: error?.message || "Unable to connect to API",
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function getApiCollection(endpoint, fallback = [], options = {}) {
  const response = await apiGet(endpoint, {
    ...options,
    fallback,
  });

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (response.data && typeof response.data === "object") {
    const nestedList =
      response.data.items ||
      response.data.packages ||
      response.data.records ||
      response.data.results ||
      response.data.rows ||
      response.data.list;

    return Array.isArray(nestedList) ? nestedList : fallback;
  }

  return fallback;
}

export async function getApiItem(endpoint, fallback = null, options = {}) {
  const response = await apiGet(endpoint, {
    ...options,
    fallback,
  });

  if (Array.isArray(response.data)) {
    return response.data[0] || fallback;
  }

  if (response.data && typeof response.data === "object") {
    const nestedItem =
      response.data.item ||
      response.data.record ||
      response.data.package ||
      response.data.result;

    if (nestedItem && typeof nestedItem === "object" && !Array.isArray(nestedItem)) {
      return nestedItem;
    }

    return response.data;
  }

  return fallback;
}

export function toApiImageUrl(image, fallback = IMAGE_PLACEHOLDER) {
  if (image && typeof image === "object") {
    return toApiImageUrl(
      image.url || image.src || image.path || image.image || image.file || image.filename,
      fallback
    );
  }

  if (!image || typeof image !== "string") {
    return fallback;
  }

  const cleanImage = image.trim();

  if (!cleanImage) {
    return fallback;
  }

  if (/^(https?:)?\/\//i.test(cleanImage) || cleanImage.startsWith("data:")) {
    return cleanImage;
  }

  if (cleanImage.startsWith("/images/")) {
    return cleanImage;
  }

  if (cleanImage.startsWith("/")) {
    return `${API_PUBLIC_URL}${cleanImage}`;
  }

  return `${API_PUBLIC_URL}/${cleanImage.replace(/^\/+/, "")}`;
}

export function firstValue(source, keys, fallback = "") {
  if (!source || typeof source !== "object") {
    return fallback;
  }

  for (const key of keys) {
    const value = coerceDisplayValue(source[key]);
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return fallback;
}

export function coerceDisplayValue(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => coerceDisplayValue(item))
      .filter(Boolean)
      .join(", ");
  }

  if (value && typeof value === "object") {
    return (
      value.url ||
      value.src ||
      value.path ||
      value.image ||
      value.file ||
      value.filename ||
      value.title ||
      value.name ||
      value.label ||
      value.slug ||
      ""
    );
  }

  return value;
}

export function normalizeSlug(value, fallback = "") {
  if (!value) return fallback;

  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
