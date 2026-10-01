import {
  ROUTE_OPTIONS,
  UTM_KEYS,
  type LeadPayload,
  type RouteInterest,
  type UtmParams,
} from "./types";

export type FieldErrors = Partial<Record<"name" | "email" | "consent", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const messages = {
  nameRequired: "Escribe tu nombre.",
  nameTooLong: "Usa un nombre más corto.",
  emailRequired: "Escribe tu email.",
  emailInvalid: "Revisa tu email: parece incompleto. Ej.: nombre@correo.com",
  consentRequired: "Marca la casilla para recibir el acceso al video.",
};

export function validateLead(input: {
  name: string;
  email: string;
  consent: boolean;
}): FieldErrors {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();

  if (!name) errors.name = messages.nameRequired;
  else if (name.length > 80) errors.name = messages.nameTooLong;

  if (!email) errors.email = messages.emailRequired;
  else if (email.length > 254 || !EMAIL.test(email))
    errors.email = messages.emailInvalid;

  if (!input.consent) errors.consent = messages.consentRequired;

  return errors;
}

const routeValues = new Set<string>(ROUTE_OPTIONS.map((o) => o.value));

/** Normaliza y valida un payload que llega del navegador. */
export function parseLeadPayload(
  raw: unknown,
): { payload: LeadPayload; errors: FieldErrors } | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as Record<string, unknown>;
  const str = (v: unknown, max = 200) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const utmIn =
    data.utm && typeof data.utm === "object"
      ? (data.utm as Record<string, unknown>)
      : {};
  const utm: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = str(utmIn[key], 150);
    if (value) utm[key] = value;
  }

  const route = str(data.route, 40);
  const payload: LeadPayload = {
    name: str(data.name, 120),
    email: str(data.email, 254).toLowerCase(),
    route: routeValues.has(route) ? (route as RouteInterest) : "",
    consent: data.consent === true,
    utm,
    company: str(data.company, 120),
  };

  return { payload, errors: validateLead(payload) };
}
