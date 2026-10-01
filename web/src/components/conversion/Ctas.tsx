"use client";

import Link from "next/link";

import {
  ButtonArrow,
  buttonClasses,
  PendingButton,
  type ButtonSize,
  type ButtonSurface,
  type ButtonVariant,
} from "@/components/ui/Button";
import { DevTag } from "@/components/ui/DevTag";
import { ctaLabels } from "@/content/shared";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { withUtm } from "@/lib/utm";

import { useLeadCapture } from "./LeadCapture";
import { usePublicConfig } from "./PublicConfigProvider";

/**
 * CTA principal de la landing: "Ver el video privado".
 * Abre el modal de registro, o lleva a la página de Systeme.io (modo URL).
 * En producción sin integración muestra "Configuración pendiente".
 */
export function VideoCta({
  location,
  size = "lg",
  block = false,
  className,
}: {
  location: string;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
}) {
  const { leadMode, formUrl } = usePublicConfig();
  const { open } = useLeadCapture();
  const classes = buttonClasses({ variant: "primary", size, block, className });

  if (leadMode === "pending") {
    return (
      <PendingButton
        size={size}
        block={block}
        className={className}
        description="El formulario de registro aún no está conectado."
      />
    );
  }

  if (leadMode === "systeme-url") {
    return (
      <a
        href={formUrl}
        className={classes}
        onClick={(event) => {
          track("vsl_cta_clicked", { location, lead_mode: leadMode });
          event.currentTarget.href = withUtm(formUrl);
        }}
      >
        {ctaLabels.video}
        <ButtonArrow />
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      className={classes}
      onClick={() => {
        track("vsl_cta_clicked", { location, lead_mode: leadMode });
        open(location);
      }}
    >
      {ctaLabels.video}
      <ButtonArrow />
    </button>
  );
}

/**
 * CTA hacia /agenda. En producción sin BOOKING_URL muestra
 * "Configuración pendiente" en lugar de llevar a una agenda vacía.
 */
export function BookingCta({
  location,
  variant = "primary",
  surface = "light",
  size = "lg",
  block = false,
  className,
}: {
  location: string;
  variant?: Exclude<ButtonVariant, "pending">;
  surface?: ButtonSurface;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
}) {
  const { bookingUrl, isDev } = usePublicConfig();

  if (!bookingUrl && !isDev) {
    return (
      <PendingButton
        size={size}
        block={block}
        className={className}
        description="La agenda aún no está conectada."
      />
    );
  }

  return (
    <span
      className={cn(
        "flex-col gap-2",
        block ? "flex w-full" : "inline-flex items-start",
      )}
    >
      <Link
        href={site.routes.agenda}
        onClick={() => track("booking_cta_clicked", { location })}
        className={buttonClasses({ variant, surface, size, block, className })}
      >
        {ctaLabels.booking}
        <ButtonArrow />
      </Link>
      {!bookingUrl && isDev && <DevTag>[BOOKING_URL] pendiente</DevTag>}
    </span>
  );
}
