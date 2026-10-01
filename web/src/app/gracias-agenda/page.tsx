import type { Metadata } from "next";
import Link from "next/link";

import { WhatsAppLink } from "@/components/conversion/WhatsApp";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ButtonArrow, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Lead } from "@/components/ui/Typography";
import { site } from "@/config/site";
import { thanksPage } from "@/content/funnel";

export const metadata: Metadata = {
  title: "Llamada agendada",
  robots: { index: false, follow: false },
};

/** Confirmación y preparación. Sin ofertas adicionales. */
export default function GraciasAgendaPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <Section tone="plum" spacing="none" labelledBy="gracias-title">
          <Container className="pb-16 pt-8 sm:pt-12 lg:pb-24">
            <Eyebrow variant="tag">{thanksPage.eyebrow}</Eyebrow>
            <Heading as="h1" id="gracias-title" size="mega" className="mt-6 max-w-[14ch]">
              {thanksPage.title}
            </Heading>
            <Lead className="mt-8">{thanksPage.body}</Lead>
          </Container>
        </Section>

        <Section tone="paper" labelledBy="preparacion-title">
          <Container>
            <Heading id="preparacion-title">{thanksPage.prepTitle}</Heading>
            <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {thanksPage.prep.map((item, index) => (
                <li key={item.title} className="border-t-4 border-ink pt-6">
                  <span aria-hidden="true" className="display block text-[3.5rem] leading-none text-magenta sm:text-[4.5rem]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-[1.375rem] font-bold leading-tight sm:text-[1.5rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-lg text-ink/85">{item.detail}</p>
                </li>
              ))}
            </ol>

            <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <Link
                href={site.routes.vsl}
                className={buttonClasses({ variant: "outline", surface: "light" })}
              >
                {thanksPage.backToVideo}
                <ButtonArrow />
              </Link>
              <WhatsAppLink
                location="gracias_agenda"
                showPending
                className="inline-flex min-h-11 items-center text-lg font-semibold underline underline-offset-4 hover:text-plum"
              >
                {thanksPage.whatsapp}
              </WhatsAppLink>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
