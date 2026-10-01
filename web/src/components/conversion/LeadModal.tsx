"use client";

import { useEffect, useRef } from "react";

import { EmbedHtml } from "@/components/media/EmbedHtml";
import { DevTag } from "@/components/ui/DevTag";
import { leadModalCopy } from "@/content/shared";

import { LeadForm } from "./LeadForm";
import { usePublicConfig } from "./PublicConfigProvider";

/**
 * Modal nativo (<dialog> + showModal): bloquea el resto de la página,
 * cierra con Esc y mantiene el foco dentro del diálogo.
 */
export function LeadModal({
  isOpen,
  location,
  onClose,
}: {
  isOpen: boolean;
  location: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const { leadMode, formEmbed, isDev } = usePublicConfig();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      // Primer campo útil, no el botón de cerrar.
      const first = dialog.querySelector<HTMLElement>("[data-autofocus]");
      first?.focus();
    }
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="lead-title"
      aria-describedby="lead-desc"
      onClose={onClose}
      onClick={(event) => {
        // Clic en el fondo (fuera del panel) cierra.
        if (event.target === ref.current) onClose();
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-paper p-0 text-ink sm:m-auto sm:h-auto sm:max-h-[calc(100dvh-3rem)] sm:max-w-[36rem] motion-safe:open:animate-rise"
    >
      <div className="flex min-h-full flex-col" data-tone="paper">
        <header data-tone="plum" className="bg-plum px-6 pb-5 pt-4 text-paper sm:px-8 sm:pb-7 sm:pt-5">
          <div className="flex items-start justify-between gap-4">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-blush">
              {leadModalCopy.eyebrow}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="-mr-2 -mt-1 min-h-11 px-2 text-sm font-semibold underline underline-offset-4"
            >
              Cerrar<span className="sr-only"> el formulario</span>
            </button>
          </div>
          <h2 id="lead-title" className="display mt-2 text-[2.25rem] leading-[0.95] sm:mt-3 sm:text-[3rem]">
            {leadMode === "systeme-embed" ? leadModalCopy.titleEmbed : leadModalCopy.title}
          </h2>
          <p id="lead-desc" className="mt-3 max-w-[28rem] text-base text-paper">
            {leadMode === "systeme-embed"
              ? leadModalCopy.descriptionEmbed
              : leadModalCopy.description}
          </p>
        </header>

        <div className="flex-1 px-6 py-6 sm:px-8 sm:py-8">
          {leadMode === "dev-simulated" && isDev && (
            <p className="mb-6">
              <DevTag>
                Simulación local: no se guarda ningún dato ni se envía ningún
                correo. Un email que empiece con &quot;error&quot; simula el
                estado de error.
              </DevTag>
            </p>
          )}

          {leadMode === "systeme-embed" ? (
            <div data-autofocus tabIndex={-1} className="outline-none">
              <EmbedHtml html={formEmbed} title="Formulario de registro de Systeme.io" />
            </div>
          ) : (
            <LeadForm location={location} isOpen={isOpen} onDone={onClose} />
          )}
        </div>
      </div>
    </dialog>
  );
}
