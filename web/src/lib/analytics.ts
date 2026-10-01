/**
 * Eventos de analítica SIN datos personales.
 * Nunca envíes nombre, email, teléfono ni texto libre del usuario.
 *
 * Destinos (sólo si el script correspondiente está cargado):
 *  - window.dataLayer  (GTM / GA4)
 *  - window.gtag       (GA4)
 *  - window.fbq        (Meta Pixel → trackCustom; lead_form_submitted también envía "Lead")
 */

export type AnalyticsEvent =
  | "vsl_cta_clicked"
  | "lead_form_opened"
  | "lead_form_submitted"
  | "vsl_page_viewed"
  | "booking_cta_clicked"
  | "whatsapp_clicked";

/** Sólo estas propiedades se aceptan; todas son contexto, no identidad. */
export type AnalyticsProps = {
  /** Dónde ocurrió: "hero", "diagnostico", "sticky", "vsl"… */
  location?: string;
  /** Modo de captura activo (systeme-api, systeme-embed…). */
  lead_mode?: string;
  /** Ruta elegida en el formulario (opción cerrada, no PII). */
  route_interest?: string;
};

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

const ALLOWED: (keyof AnalyticsProps)[] = [
  "location",
  "lead_mode",
  "route_interest",
];

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;

  const clean: Record<string, string> = {};
  for (const key of ALLOWED) {
    const value = props[key];
    if (typeof value === "string" && value) clean[key] = value.slice(0, 60);
  }

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...clean });
    window.gtag?.("event", event, { ...clean, transport_type: "beacon" });
    window.fbq?.("trackCustom", event, clean);
    if (event === "lead_form_submitted") window.fbq?.("track", "Lead");
  } catch {
    // La analítica nunca debe romper la conversión.
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(`[analytics] ${event}`, clean);
  }
}
