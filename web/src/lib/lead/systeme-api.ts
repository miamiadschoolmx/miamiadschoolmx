import "server-only";

import type { LeadPayload } from "./types";

/**
 * Cliente mínimo de la API pública de Systeme.io (sólo servidor).
 *
 * Variables (nunca con prefijo NEXT_PUBLIC_):
 *  - SYSTEME_API_KEY        Llave de la API pública (Settings → Public API keys).
 *  - SYSTEME_LEAD_TAG_IDS   ID(s) numéricos de la(s) etiqueta(s) a aplicar, separados
 *                           por coma. La primera debe disparar la regla de
 *                           automatización que entrega el acceso al VSL.
 *
 * Flujo: crear contacto (o encontrarlo si ya existe) → guardar campos
 * personalizados (best effort) → aplicar etiqueta(s).
 */

const API_BASE = "https://api.systeme.io/api";
const TIMEOUT_MS = 8000;

/**
 * Slugs de campos personalizados. Créalos en Systeme.io (Contacts → Fields)
 * con exactamente estos slugs. Si no existen, el contacto y la etiqueta se
 * guardan igual y el servidor registra un aviso.
 */
export const SYSTEME_FIELD_SLUGS = {
  route: "ruta_interes",
  consent: "consentimiento_seguimiento",
  utm_source: "utm_source",
  utm_medium: "utm_medium",
  utm_campaign: "utm_campaign",
  utm_term: "utm_term",
  utm_content: "utm_content",
} as const;

/** Versión del texto de consentimiento; cámbiala si cambias el texto. */
export const CONSENT_VERSION = "v1-2026";

function config() {
  const apiKey = (process.env.SYSTEME_API_KEY ?? "").trim();
  const tagIds = (process.env.SYSTEME_LEAD_TAG_IDS ?? "")
    .split(",")
    .map((t) => Number(t.trim()))
    .filter((n) => Number.isInteger(n) && n > 0);
  return { apiKey, tagIds };
}

export function isSystemeApiConfigured(): boolean {
  const { apiKey, tagIds } = config();
  return apiKey.length > 0 && tagIds.length > 0;
}

class SystemeError extends Error {
  constructor(
    public step: string,
    public status: number,
  ) {
    super(`Systeme.io ${step} respondió ${status}`);
  }
}

async function call(
  path: string,
  init: RequestInit & { step: string; contentType?: string },
): Promise<Response> {
  const { apiKey } = config();
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "X-API-Key": apiKey,
      Accept: "application/json",
      "Content-Type": init.contentType ?? "application/json",
    },
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return res;
}

type Contact = { id: number; email?: string };

async function findContactByEmail(email: string): Promise<Contact | null> {
  const res = await call(`/contacts?email=${encodeURIComponent(email)}`, {
    method: "GET",
    step: "buscar contacto",
  });
  if (!res.ok) throw new SystemeError("buscar contacto", res.status);
  const data = (await res.json()) as { items?: Contact[] };
  // Sólo aceptamos coincidencia exacta para no etiquetar a otra persona.
  return (
    data.items?.find((c) => c.email?.toLowerCase() === email.toLowerCase()) ??
    null
  );
}

async function upsertContact(lead: LeadPayload): Promise<number> {
  const res = await call("/contacts", {
    method: "POST",
    step: "crear contacto",
    body: JSON.stringify({
      email: lead.email,
      fields: [{ slug: "first_name", value: lead.name }],
    }),
  });

  if (res.ok) {
    const created = (await res.json()) as Contact;
    return created.id;
  }

  // 422: el email ya existe (u otro error de validación). Intentamos encontrarlo.
  if (res.status === 422) {
    const existing = await findContactByEmail(lead.email);
    if (existing) return existing.id;
  }
  throw new SystemeError("crear contacto", res.status);
}

async function saveCustomFields(contactId: number, lead: LeadPayload) {
  const fields: { slug: string; value: string }[] = [
    {
      slug: SYSTEME_FIELD_SLUGS.consent,
      value: `si | ${new Date().toISOString()} | ${CONSENT_VERSION}`,
    },
  ];
  if (lead.route)
    fields.push({ slug: SYSTEME_FIELD_SLUGS.route, value: lead.route });
  for (const [key, value] of Object.entries(lead.utm)) {
    const slug = SYSTEME_FIELD_SLUGS[key as keyof typeof lead.utm];
    if (slug && value) fields.push({ slug, value });
  }

  const res = await call(`/contacts/${contactId}`, {
    method: "PATCH",
    step: "guardar campos",
    contentType: "application/merge-patch+json",
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    console.warn(
      `[lead] Systeme.io no guardó los campos personalizados (HTTP ${res.status}). ` +
        `Verifica que existan los slugs: ${Object.values(SYSTEME_FIELD_SLUGS).join(", ")}`,
    );
  }
}

async function addTag(contactId: number, tagId: number) {
  const res = await call(`/contacts/${contactId}/tags`, {
    method: "POST",
    step: "aplicar etiqueta",
    body: JSON.stringify({ tagId }),
  });
  if (res.ok) return;
  // 422 suele indicar que la etiqueta ya estaba asignada.
  if (res.status === 422) {
    console.warn(
      `[lead] Systeme.io rechazó la etiqueta ${tagId} (HTTP 422). ` +
        "Puede que ya estuviera asignada o que el ID no exista.",
    );
    return;
  }
  throw new SystemeError("aplicar etiqueta", res.status);
}

export async function sendLeadToSysteme(lead: LeadPayload): Promise<void> {
  const { tagIds } = config();
  const contactId = await upsertContact(lead);
  // Los campos personalizados nunca bloquean el registro.
  await saveCustomFields(contactId, lead).catch(() =>
    console.warn("[lead] No se pudieron guardar los campos personalizados."),
  );
  for (const tagId of tagIds) await addTag(contactId, tagId);
}

export { SystemeError };
