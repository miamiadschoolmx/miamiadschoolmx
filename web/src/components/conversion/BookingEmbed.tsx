"use client";

import { DevTag } from "@/components/ui/DevTag";
import { agendaPage } from "@/content/funnel";
import { track } from "@/lib/analytics";

import { usePublicConfig } from "./PublicConfigProvider";
import { WhatsAppLink } from "./WhatsApp";

/**
 * Agenda externa (BOOKING_URL, p. ej. Google Calendar). No se inventan
 * horarios ni se simula disponibilidad: sin URL no hay calendario.
 */
export function BookingEmbed() {
  const { bookingUrl, whatsappUrl, isDev } = usePublicConfig();

  if (!bookingUrl) {
    return (
      <div className="flex min-h-[26rem] flex-col items-start justify-center gap-4 border-2 border-dashed border-ink/40 bg-paper p-8 text-ink">
        {isDev ? (
          <>
            <DevTag>[BOOKING_URL]</DevTag>
            <p className="max-w-md font-mono text-sm">
              Aquí se incrusta la agenda conectada a Google Calendar. Sin URL no
              se muestran horarios: no se simula disponibilidad.
            </p>
          </>
        ) : (
          <>
            <p className="text-xl font-semibold">Configuración pendiente</p>
            <p className="max-w-md text-lg">{agendaPage.pending}</p>
            {whatsappUrl && (
              <WhatsAppLink
                location="agenda_pendiente"
                className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
              >
                {agendaPage.pendingWhatsapp}
              </WhatsAppLink>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white">
        <iframe
          src={bookingUrl}
          title={agendaPage.embedTitle}
          className="block h-[44rem] w-full border-0 sm:h-[48rem]"
        />
      </div>
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("booking_cta_clicked", { location: "agenda_nueva_pestana" })}
        className="inline-flex min-h-11 items-center self-start font-semibold underline underline-offset-4"
      >
        {agendaPage.openNewTab}
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
    </div>
  );
}
