/**
 * GA4 event helper. Safe to call anywhere on the client: no-ops during SSR
 * and when NEXT_PUBLIC_GA_ID is unset (gtag never loads).
 *
 * Lead funnel events:
 *   cta_click             { placement, destination }
 *   personalize_start          {}
 *   personalize_complete       { seat }
 *   personalize_email_request  { seat }
 */
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params);
}
