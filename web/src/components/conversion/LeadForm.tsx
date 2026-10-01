"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { ButtonArrow, buttonClasses } from "@/components/ui/Button";
import { leadModalCopy as copy } from "@/content/shared";
import { track } from "@/lib/analytics";
import {
  ROUTE_OPTIONS,
  UTM_KEYS,
  type LeadResponse,
  type RouteInterest,
  type UtmParams,
} from "@/lib/lead/types";
import { validateLead, type FieldErrors } from "@/lib/lead/validation";
import { cn } from "@/lib/cn";
import { readUtm } from "@/lib/utm";

import { usePublicConfig } from "./PublicConfigProvider";
import { WhatsAppLink } from "./WhatsApp";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "block h-14 w-full border-2 border-ink/80 bg-white px-4 text-base text-ink placeholder:text-ink/60 aria-[invalid=true]:border-magenta-press";

export function LeadForm({
  location,
  isOpen,
  onDone,
}: {
  location: string;
  isOpen: boolean;
  onDone: () => void;
}) {
  const id = useId();
  const router = useRouter();
  const { leadMode, privacyUrl, successUrl, whatsappUrl } = usePublicConfig();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [route, setRoute] = useState<RouteInterest | "">("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // UTM de la sesión → campos ocultos (se leen al abrir el modal).
  useEffect(() => {
    if (!isOpen || !formRef.current) return;
    const utm = readUtm();
    for (const key of UTM_KEYS) {
      const input = formRef.current.elements.namedItem(key) as HTMLInputElement | null;
      if (input) input.value = utm[key] ?? "";
    }
  }, [isOpen]);

  const fieldId = (field: string) => `${id}-${field}`;
  const errorId = (field: string) => `${id}-${field}-error`;

  function revalidate(field: keyof FieldErrors, next: Partial<{ name: string; email: string; consent: boolean }>) {
    if (!errors[field]) return;
    const result = validateLead({ name, email, consent, ...next });
    setErrors((prev) => ({ ...prev, [field]: result[field] }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || status === "success") return;

    const found = validateLead({ name, email, consent });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setShowSummary(true);
      if (found.name) nameRef.current?.focus();
      else if (found.email) emailRef.current?.focus();
      else consentRef.current?.focus();
      return;
    }

    setShowSummary(false);
    setStatus("submitting");
    const honeypot =
      (event.currentTarget.elements.namedItem("company") as HTMLInputElement | null)
        ?.value ?? "";

    const utm: UtmParams = readUtm();

    try {
      let redirectTo = successUrl;

      if (leadMode === "dev-simulated") {
        // Simulación SOLO en desarrollo: no guarda nada, no envía correos.
        await new Promise((resolve) => setTimeout(resolve, 900));
        if (email.trim().toLowerCase().startsWith("error")) throw new Error("simulado");
      } else {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            route,
            consent,
            utm,
            company: honeypot,
          }),
        });
        const data = (await res.json().catch(() => null)) as LeadResponse | null;
        if (!data || !data.ok) {
          if (data && !data.ok && data.fields) setErrors(data.fields);
          throw new Error(data && !data.ok ? data.error : `HTTP ${res.status}`);
        }
        redirectTo = data.redirectTo;
      }

      track("lead_form_submitted", {
        location,
        lead_mode: leadMode,
        route_interest: route || undefined,
      });
      setStatus("success");

      window.setTimeout(() => {
        onDone();
        if (redirectTo.startsWith("/")) router.push(redirectTo);
        else window.location.assign(redirectTo);
      }, 450);
    } catch {
      setStatus("error");
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const isBusy = status === "submitting" || status === "success";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-6"
      aria-busy={isBusy}
    >
      {showSummary && errorCount > 0 && (
        <p role="alert" className="border-l-4 border-magenta-press bg-white px-4 py-3 font-semibold text-magenta-press">
          {copy.summary(errorCount)}
        </p>
      )}

      {/* Nombre */}
      <div>
        <label htmlFor={fieldId("name")} className="mb-2 block font-semibold">
          {copy.fields.name}
        </label>
        <input
          ref={nameRef}
          data-autofocus
          id={fieldId("name")}
          name="name"
          type="text"
          autoComplete="given-name"
          required
          aria-required="true"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? errorId("name") : undefined}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            revalidate("name", { name: e.target.value });
          }}
          className={inputClasses}
        />
        {errors.name && (
          <p id={errorId("name")} className="mt-2 text-[0.9375rem] font-semibold text-magenta-press">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor={fieldId("email")} className="mb-2 block font-semibold">
          {copy.fields.email}
        </label>
        <input
          ref={emailRef}
          id={fieldId("email")}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required
          aria-required="true"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? errorId("email") : undefined}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            revalidate("email", { email: e.target.value });
          }}
          className={inputClasses}
        />
        {errors.email && (
          <p id={errorId("email")} className="mt-2 text-[0.9375rem] font-semibold text-magenta-press">
            {errors.email}
          </p>
        )}
      </div>

      {/* Ruta (opcional) */}
      <fieldset>
        <legend className="mb-2 font-semibold">
          {copy.fields.route}{" "}
          <span className="font-normal text-ink/80">{copy.fields.optional}</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {ROUTE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex min-h-12 cursor-pointer items-center gap-3 border-2 border-ink/80 bg-white px-4 py-2 has-[:checked]:border-plum has-[:checked]:bg-plum has-[:checked]:text-paper has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-plum"
            >
              <input
                type="radio"
                name="route"
                value={option.value}
                checked={route === option.value}
                onChange={() => setRoute(option.value)}
                className="size-4 accent-magenta focus-visible:outline-none"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Consentimiento (vacío por defecto) */}
      <div>
        <div className="flex items-start gap-3">
          <input
            ref={consentRef}
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={cn(
              fieldId("privacy"),
              errors.consent && errorId("consent"),
            )}
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              revalidate("consent", { consent: e.target.checked });
            }}
            className="mt-0.5 size-6 shrink-0 cursor-pointer accent-magenta"
          />
          <div className="text-[0.9375rem] leading-snug">
            <label htmlFor={fieldId("consent")} className="cursor-pointer">
              {copy.fields.consent}
            </label>{" "}
            <span id={fieldId("privacy")}>
              {copy.fields.privacyPrefix}{" "}
              {privacyUrl ? (
                <a
                  href={privacyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2"
                >
                  {copy.fields.privacyLink}
                  <span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
              ) : (
                <span className="font-semibold">
                  {copy.fields.privacyLink} (configuración pendiente)
                </span>
              )}
              .
            </span>
          </div>
        </div>
        {errors.consent && (
          <p id={errorId("consent")} className="mt-2 text-[0.9375rem] font-semibold text-magenta-press">
            {errors.consent}
          </p>
        )}
      </div>

      {/* UTM: campos ocultos que viajan con el registro. */}
      {UTM_KEYS.map((key) => (
        <input key={key} type="hidden" name={key} defaultValue="" />
      ))}

      {/* Honeypot anti-spam: invisible para personas y lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("company")}>Empresa</label>
        <input id={fieldId("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        aria-disabled={isBusy}
        className={buttonClasses({ size: "lg", block: true, className: isBusy ? "cursor-progress" : "" })}
      >
        {status === "submitting"
          ? copy.submitting
          : status === "success"
            ? copy.success
            : (
              <>
                {copy.submit}
                <ButtonArrow />
              </>
            )}
      </button>

      {/* Región viva siempre presente; vacía no ocupa espacio. */}
      <div role="status" aria-live="polite" className="empty:-mt-6">
        {status === "success" && <p className="font-semibold">{copy.success}</p>}
        {status === "error" && (
          <div className="border-l-4 border-magenta-press bg-white px-4 py-3">
            <p className="font-semibold text-magenta-press">{copy.error}</p>
            {whatsappUrl && (
              <p className="mt-1 text-[0.9375rem]">
                <WhatsAppLink location="lead_form_error" className="font-semibold underline underline-offset-2">
                  {copy.errorWhatsapp}
                </WhatsAppLink>
              </p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
