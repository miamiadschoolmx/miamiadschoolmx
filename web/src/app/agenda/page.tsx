import type { Metadata } from "next";

import { BookingEmbed } from "@/components/conversion/BookingEmbed";
import { WhatsAppFloat, WhatsAppLink } from "@/components/conversion/WhatsApp";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AssetSlot } from "@/components/media/AssetSlot";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Lead } from "@/components/ui/Typography";
import { agendaPage } from "@/content/funnel";

export const metadata: Metadata = {
  title: "Agenda tu Llamada de Dirección de Carrera",
  robots: { index: false, follow: false },
};

/**
 * Agenda. Las preguntas de calificación (ruta, WhatsApp, país/ciudad,
 * situación, objetivo, estado del book, disponibilidad, URL de portafolio)
 * viven en el formulario de la herramienta de agenda. Ver README.md.
 */
export default function AgendaPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <Section tone="plum" spacing="none" labelledBy="agenda-title">
          <Container className="grid gap-10 pb-16 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-12 lg:pb-24">
            <div className="lg:col-span-5 lg:row-start-1">
              <Eyebrow className="text-blush">{agendaPage.eyebrow}</Eyebrow>
              <Heading as="h1" id="agenda-title" className="mt-5">
                {agendaPage.title}
              </Heading>
              <Lead className="mt-6">{agendaPage.body}</Lead>
              <p className="mt-5 text-lg font-semibold text-blush">{agendaPage.note}</p>
              <p className="mt-8">
                <WhatsAppLink
                  location="agenda"
                  className="inline-flex min-h-11 items-center text-[1.0625rem] font-semibold underline underline-offset-4 hover:text-blush"
                >
                  {agendaPage.whatsapp}
                </WhatsAppLink>
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
              <BookingEmbed />
            </div>

            <AssetSlot
              id="FOTO_MAS_COMUNIDAD"
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="lg:col-span-5 lg:row-start-2 lg:self-start"
            />
          </Container>
        </Section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
