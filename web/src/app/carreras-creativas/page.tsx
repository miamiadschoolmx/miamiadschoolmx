import type { Metadata } from "next";

import { StickyCtaBar } from "@/components/conversion/StickyCtaBar";
import { WhatsAppFloat } from "@/components/conversion/WhatsApp";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Closing } from "@/components/sections/carreras/Closing";
import { Credibility } from "@/components/sections/carreras/Credibility";
import { Diagnosis } from "@/components/sections/carreras/Diagnosis";
import { Evidence } from "@/components/sections/carreras/Evidence";
import { FaqSection } from "@/components/sections/carreras/FaqSection";
import { Fit } from "@/components/sections/carreras/Fit";
import { Hero } from "@/components/sections/carreras/Hero";
import { Mechanism } from "@/components/sections/carreras/Mechanism";
import { Process } from "@/components/sections/carreras/Process";
import { Routes } from "@/components/sections/carreras/Routes";
import { seo, site } from "@/config/site";

const ogImages = seo.ogImage
  ? [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.ogImageAlt }]
  : undefined;

export const metadata: Metadata = {
  title: { absolute: seo.landing.title },
  description: seo.landing.description,
  alternates: { canonical: site.routes.landing },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: site.routes.landing,
    title: seo.landing.title,
    description: seo.landing.description,
    images: ogImages, // [OG_IMAGE] pendiente → src/config/site.ts
  },
  twitter: {
    card: ogImages ? "summary_large_image" : "summary",
    title: seo.landing.title,
    description: seo.landing.description,
    images: ogImages?.map((i) => i.url),
  },
};

/**
 * Landing de captación. Orden de bloques y regla de CTA:
 * el CTA de video aparece en Hero, Diagnóstico, Evidencia y Cierre
 * (nunca seis bloques seguidos sin él) + barra sticky en móvil.
 */
export default function CarrerasCreativasPage() {
  return (
    <>
      <SiteHeader variant="landing" />
      <main id="contenido">
        <Hero />
        <Credibility />
        <Diagnosis />
        <Mechanism />
        <Routes />
        <Evidence />
        <Fit />
        <Process />
        <FaqSection />
        <Closing />
      </main>
      <SiteFooter className="pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0" />
      <StickyCtaBar heroId="inicio" closingId="cierre" />
      <WhatsAppFloat withStickyBar />
    </>
  );
}
