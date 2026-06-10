"use client";

import { useEffect, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function TurnstileCaptcha({ onSuccess, onExpire, onError }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const shouldBypassTurnstile = process.env.NODE_ENV === "development";
  const didBypassRef = useRef(false);

  useEffect(() => {
    if (shouldBypassTurnstile && !didBypassRef.current) {
      didBypassRef.current = true;
      onSuccess?.("development-turnstile-bypass");
    }
  }, [onSuccess, shouldBypassTurnstile]);

  if (shouldBypassTurnstile) {
    return null;
  }

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
