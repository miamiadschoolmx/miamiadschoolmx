"use client";

import { DevTag } from "@/components/ui/DevTag";
import { whatsappCopy } from "@/content/shared";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

import { usePublicConfig } from "./PublicConfigProvider";

/**
 * Enlace de WhatsApp (apoyo humano). Nunca compite con el CTA principal.
 * Sin WHATSAPP_URL: etiqueta en desarrollo; en producción, texto
 * "configuración pendiente" sólo si `showPending`, si no, nada.
 */
export function WhatsAppLink({
  location,
  className,
  children,
  showPending = false,
}: {
  location: string;
  className?: string;
  children: React.ReactNode;
  showPending?: boolean;
}) {
  const { whatsappUrl, isDev } = usePublicConfig();

  if (!whatsappUrl) {
    if (isDev) return <DevTag>[WHATSAPP_URL] {children}</DevTag>;
    return showPending ? <span className={className}>{whatsappCopy.pending}</span> : null;
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_clicked", { location })}
      className={className}
    >
      {children}
      <span className="sr-only"> {whatsappCopy.newTab}</span>
    </a>
  );
}

/**
 * Botón fijo y discreto. En móvil sube cuando aparece la barra sticky.
 * `withStickyBar`: en móvil sólo aparece junto con la barra (después del
 * hero), para nunca tapar el CTA principal.
 */
export function WhatsAppFloat({ withStickyBar = false }: { withStickyBar?: boolean }) {
  const { whatsappUrl, isDev } = usePublicConfig();
  if (!whatsappUrl && !isDev) return null;

  return (
    <aside
      aria-label="Atención por WhatsApp"
      className={cn(
        "fixed right-4 z-30 transition-[bottom] duration-300 lg:right-6",
        "bottom-[calc(1rem+env(safe-area-inset-bottom))] lg:bottom-6",
        "in-data-[sticky=on]:bottom-[calc(5.75rem+env(safe-area-inset-bottom))] lg:in-data-[sticky=on]:bottom-6",
        withStickyBar && "max-lg:invisible max-lg:in-data-[sticky=on]:visible",
      )}
    >
      <WhatsAppLink
        location="float"
        className="inline-flex min-h-11 items-center border border-plum/40 bg-paper px-4 text-sm font-semibold text-plum hover:bg-blush"
      >
        {whatsappCopy.float}
      </WhatsAppLink>
    </aside>
  );
}
