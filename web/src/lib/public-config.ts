import "server-only";

import { integrations, isDevMode } from "@/config/integrations";
import { isSystemeApiConfigured } from "@/lib/lead/systeme-api";
import type { LeadMode } from "@/lib/lead/types";

/**
 * Subconjunto de la configuración que puede llegar al navegador.
 * Nunca incluye llaves: sólo URLs públicas, modos y banderas.
 */
export type PublicConfig = {
  isDev: boolean;
  leadMode: LeadMode;
  /** Embed de Systeme.io (modo systeme-embed). */
  formEmbed: string;
  /** Página alojada de Systeme.io (modo systeme-url). */
  formUrl: string;
  successUrl: string;
  bookingUrl: string;
  whatsappUrl: string;
  privacyUrl: string;
};

const isHttpUrl = (v: string) => /^https:\/\/\S+$/i.test(v);
const isEmbed = (v: string) => v.startsWith("<");

/** URL segura de retorno: ruta interna o https. */
function safeSuccessUrl(v: string): string {
  if (v.startsWith("/") && !v.startsWith("//")) return v;
  if (isHttpUrl(v)) return v;
  return "/vsl";
}

const isWhatsappUrl = (v: string) =>
  /^https:\/\/(wa\.me|api\.whatsapp\.com)\/\S+$/i.test(v);

export function resolveLeadMode(): LeadMode {
  const value = integrations.SYSTEME_FORM_EMBED_OR_URL;
  if (isSystemeApiConfigured()) return "systeme-api";
  if (value && isEmbed(value)) return "systeme-embed";
  if (value && isHttpUrl(value)) return "systeme-url";
  return isDevMode ? "dev-simulated" : "pending";
}

export function getPublicConfig(): PublicConfig {
  const leadMode = resolveLeadMode();
  const value = integrations.SYSTEME_FORM_EMBED_OR_URL;
  return {
    isDev: isDevMode,
    leadMode,
    formEmbed: leadMode === "systeme-embed" ? value : "",
    formUrl: leadMode === "systeme-url" ? value : "",
    successUrl: safeSuccessUrl(integrations.SYSTEME_VSL_SUCCESS_URL),
    bookingUrl: isHttpUrl(integrations.BOOKING_URL)
      ? integrations.BOOKING_URL
      : "",
    whatsappUrl: isWhatsappUrl(integrations.WHATSAPP_URL)
      ? integrations.WHATSAPP_URL
      : "",
    privacyUrl:
      isHttpUrl(integrations.PRIVACY_URL) ||
      integrations.PRIVACY_URL.startsWith("/")
        ? integrations.PRIVACY_URL
        : "",
  };
}

/** Lista legible de integraciones pendientes (banner de desarrollo y build). */
export function getPendingIntegrations(): string[] {
  const cfg = getPublicConfig();
  const pending: string[] = [];
  if (cfg.leadMode === "dev-simulated" || cfg.leadMode === "pending")
    pending.push("SYSTEME_FORM_EMBED_OR_URL (o SYSTEME_API_KEY + SYSTEME_LEAD_TAG_IDS)");
  if (!cfg.bookingUrl) pending.push("BOOKING_URL");
  if (!cfg.whatsappUrl) pending.push("WHATSAPP_URL");
  if (!cfg.privacyUrl) pending.push("PRIVACY_URL");
  if (!integrations.VSL_EMBED) pending.push("VSL_EMBED");
  if (!integrations.GA4_MEASUREMENT_ID) pending.push("GA4_MEASUREMENT_ID");
  if (!integrations.META_PIXEL_ID) pending.push("META_PIXEL_ID");
  if (!integrations.SITE_URL) pending.push("SITE_URL");
  return pending;
}
