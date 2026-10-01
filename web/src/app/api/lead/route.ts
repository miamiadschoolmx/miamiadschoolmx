import { integrations } from "@/config/integrations";
import {
  isSystemeApiConfigured,
  sendLeadToSysteme,
  SystemeError,
} from "@/lib/lead/systeme-api";
import type { LeadResponse } from "@/lib/lead/types";
import { parseLeadPayload } from "@/lib/lead/validation";
import { getPublicConfig } from "@/lib/public-config";

/**
 * POST /api/lead
 * Recibe el formulario propio y lo envía a Systeme.io desde el servidor.
 * La llave SYSTEME_API_KEY nunca sale de aquí.
 */

const json = (body: LeadResponse, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

function isAllowedOrigin(request: Request): boolean {
  if (!integrations.SITE_URL) return true;
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(integrations.SITE_URL).host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" && !isAllowedOrigin(request)) {
    return json({ ok: false, error: "forbidden" }, 403);
  }

  if (!isSystemeApiConfigured()) {
    return json({ ok: false, error: "not_configured" }, 503);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "validation" }, 400);
  }

  const parsed = parseLeadPayload(raw);
  if (!parsed) return json({ ok: false, error: "validation" }, 400);
  if (Object.keys(parsed.errors).length > 0) {
    return json({ ok: false, error: "validation", fields: parsed.errors }, 422);
  }

  const { successUrl } = getPublicConfig();

  // Honeypot: un bot llenó el campo oculto. Respondemos como éxito sin guardar.
  if (parsed.payload.company) {
    return json({ ok: true, redirectTo: successUrl }, 200);
  }

  try {
    await sendLeadToSysteme(parsed.payload);
    return json({ ok: true, redirectTo: successUrl }, 200);
  } catch (error) {
    // Registramos sólo el paso y el código HTTP: nada de datos personales.
    if (error instanceof SystemeError) {
      console.error(`[lead] ${error.message}`);
    } else {
      console.error("[lead] Error de red o tiempo de espera con Systeme.io");
    }
    return json({ ok: false, error: "upstream" }, 502);
  }
}
