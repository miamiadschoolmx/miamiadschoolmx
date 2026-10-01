import type { Metadata } from "next";

import { TrackEvent } from "@/components/analytics/TrackEvent";
import { BookingCta } from "@/components/conversion/Ctas";
import { WhatsAppFloat, WhatsAppLink } from "@/components/conversion/WhatsApp";
import { ProcessChain } from "@/components/editorial/ProcessChain";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { VideoFrame } from "@/components/media/VideoFrame";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Lead } from "@/components/ui/Typography";
import { integrations } from "@/config/integrations";
import { mechanism } from "@/content/carreras-creativas";
import { vslPage } from "@/content/funnel";

/**
 * Página posterior al registro. NO es indexable.
 * Importante: noindex no protege la URL. Cualquiera con el enlace puede
 * abrirla; la protección real del acceso se configura en Systeme.io.
 */
export const metadata: Metadata = {
  title: "Video privado",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function VslPage() {
  return (
    <>
      <TrackEvent event="vsl_page_viewed" props={{ location: "vsl" }} />
      <SiteHeader />
      <main id="contenido">
        <Section tone="plum" spacing="none" labelledBy="vsl-title">
          <Container className="pb-16 pt-8 sm:pt-12 lg:pb-24">
            <Eyebrow variant="tag">{vslPage.eyebrow}</Eyebrow>
            <Heading as="h1" id="vsl-title" className="mt-5 max-w-[22ch]">
              {vslPage.title}
            </Heading>

            <VideoFrame
              embed={integrations.VSL_EMBED}
              title={vslPage.videoTitle}
              className="mt-10 lg:mt-14"
            />

            <div className="mt-10 flex flex-col gap-6 lg:mt-12 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="mb-4 text-lead font-semibold">{vslPage.nextStep}</p>
                <BookingCta location="vsl" />
              </div>
              <WhatsAppLink
                location="vsl"
                showPending
                className="inline-flex min-h-11 items-center text-lg font-semibold underline underline-offset-4 hover:text-blush"
              >
                {vslPage.whatsapp}
              </WhatsAppLink>
            </div>
          </Container>
        </Section>

        <Section tone="blush" labelledBy="vsl-mecanismo-title">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <Heading id="vsl-mecanismo-title" className="text-plum lg:col-span-7">
                {vslPage.mechanism.title}
              </Heading>
              <Lead className="lg:col-span-5 lg:pb-2">{vslPage.mechanism.body}</Lead>
            </div>
            <ProcessChain
              steps={mechanism.steps}
              label={mechanism.chainLabel}
              size="md"
              className="mt-12 border-y-2 border-plum py-8 text-plum"
            />
            <div className="mt-12">
              <BookingCta location="vsl_mecanismo" />
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
