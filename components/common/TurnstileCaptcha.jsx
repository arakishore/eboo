"use client";

import { Turnstile } from "@marsidev/react-turnstile";

export default function TurnstileCaptcha({ onSuccess, onExpire, onError }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  console.log("Site key loaded:", siteKey); // ← add this
  console.log("Site key length:", siteKey?.length); // ← add this
  if (!siteKey) {
    console.error("Turnstile site key is not defined");
    return null;
  }

  return (
    <div className="my-3">
      <Turnstile
        siteKey={siteKey}
        onSuccess={(token) => {
          console.log("Turnstile token:", token);
          onSuccess?.(token);
        }}
        onExpire={() => {
          onExpire?.();
        }}
        onError={() => {
          onError?.();
        }}
      />
    </div>
  );
}