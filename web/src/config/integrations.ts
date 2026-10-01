import "server-only";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN CENTRALIZADA DE INTEGRACIONES
 * ─────────────────────────────────────────────────────────────────────────────
 *  Todos los placeholders de integración viven aquí. Cada valor se lee de una
 *  variable de entorno (recomendado: .env.local en tu equipo, Settings →
 *  Environment Variables en tu hosting). Si la variable no existe, se usa el
 *  valor por defecto de este archivo, que está VACÍO a propósito.
 *
 *  Reglas:
 *  - Nunca pegues aquí API keys. La única llave (SYSTEME_API_KEY) se lee sólo en
 *    el servidor, en src/lib/lead/systeme-api.ts, y nunca llega al navegador.
 *  - Una integración vacía NO se simula en producción: el CTA muestra
 *    "Configuración pendiente". En desarrollo verás etiquetas y simulaciones.
 *  - Las páginas se generan en build: si cambias una variable, vuelve a
 *    construir / desplegar el sitio.
 *
 *  Pasos concretos para cada valor: README.md → "Conectar integraciones".
 * ─────────────────────────────────────────────────────────────────────────────
 */

const env = (name: string, fallback = ""): string =>
  (process.env[name] ?? fallback).trim();

export const integrations = {
  /**
   * Formulario de Systeme.io que guarda nombre, email, consentimiento y UTM,
   * etiqueta al lead y activa la automatización. Acepta:
   *  - El script/embed del "Inline form" de Systeme.io  → `<script ...></script>`
   *  - La URL de una página de registro alojada en Systeme.io → `https://...`
   * Si configuras la API (SYSTEME_API_KEY + SYSTEME_LEAD_TAG_IDS), la API tiene
   * prioridad y este valor se ignora.
   */
  SYSTEME_FORM_EMBED_OR_URL: env("SYSTEME_FORM_EMBED_OR_URL"),

  /** URL de retorno tras un registro correcto. Por defecto: /vsl */
  SYSTEME_VSL_SUCCESS_URL: env("SYSTEME_VSL_SUCCESS_URL", "/vsl"),

  /** Agenda conectada a Google Calendar (o la herramienta que uses). */
  BOOKING_URL: env("BOOKING_URL"),

  /** Enlace de atención humana: https://wa.me/<número> (no lo inventes). */
  WHATSAPP_URL: env("WHATSAPP_URL"),

  /** Aviso de privacidad. */
  PRIVACY_URL: env("PRIVACY_URL"),

  /**
   * [PEGAR AQUÍ EL EMBED DEL VSL]
   * URL de reproducción (iframe) o código embed completo del proveedor de video.
   */
  VSL_EMBED: env("VSL_EMBED"),

  /** Analítica (vacío = no se carga ningún script). */
  GA4_MEASUREMENT_ID: env("GA4_MEASUREMENT_ID"),
  META_PIXEL_ID: env("META_PIXEL_ID"),

  /** Dominio público final, sin barra al final. Ej.: https://www.tudominio.mx */
  SITE_URL: env("SITE_URL"),
} as const;

/**
 * Modo desarrollo: etiquetas de slots, integraciones simuladas y banner.
 * `next dev` lo activa solo. Para un preview de staging puedes forzarlo con
 * DEV_PLACEHOLDERS=true. Nunca lo actives en el dominio público.
 */
export const isDevMode =
  process.env.NODE_ENV !== "production" ||
  process.env.DEV_PLACEHOLDERS === "true";
