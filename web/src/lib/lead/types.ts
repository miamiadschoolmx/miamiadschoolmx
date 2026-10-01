/**
 * Cómo se captura el lead. Se resuelve en el servidor (src/lib/public-config.ts).
 *
 * - systeme-api   Formulario propio → /api/lead → API pública de Systeme.io (recomendado).
 * - systeme-embed El modal muestra el formulario inline de Systeme.io.
 * - systeme-url   El CTA lleva a la página de registro alojada en Systeme.io.
 * - dev-simulated Sólo desarrollo: el formulario propio simula el registro.
 * - pending       Producción sin integración: el CTA dice "Configuración pendiente".
 */
export type LeadMode =
  | "systeme-api"
  | "systeme-embed"
  | "systeme-url"
  | "dev-simulated"
  | "pending";

export const ROUTE_OPTIONS = [
  { value: "art-direction", label: "Art Direction" },
  { value: "copywriting", label: "Copywriting" },
  { value: "explorando", label: "Aún lo estoy explorando" },
] as const;

export type RouteInterest = (typeof ROUTE_OPTIONS)[number]["value"];

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

export type LeadPayload = {
  name: string;
  email: string;
  route?: RouteInterest | "";
  consent: boolean;
  utm: UtmParams;
  /** Honeypot anti-spam: debe llegar vacío. */
  company?: string;
};

export type LeadResponse =
  | { ok: true; redirectTo: string }
  | {
      ok: false;
      error: "validation" | "not_configured" | "upstream" | "forbidden";
      fields?: Partial<Record<"name" | "email" | "consent", string>>;
    };
