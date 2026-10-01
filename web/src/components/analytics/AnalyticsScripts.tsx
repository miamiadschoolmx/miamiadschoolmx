import Script from "next/script";

import { integrations } from "@/config/integrations";

import { PixelPageViews } from "./PixelPageViews";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  ZONA DE ANALÍTICA
 *  Sólo se carga lo que tenga ID configurado. No hay IDs por defecto.
 *  - GA4: GA4_MEASUREMENT_ID (formato G-XXXXXXXXXX)
 *  - Meta Pixel: META_PIXEL_ID (sólo dígitos)
 *  Los eventos del funnel se envían desde src/lib/analytics.ts (sin PII).
 *  Si tu aviso de privacidad o tu región requieren consentimiento previo
 *  para cookies de analítica, agrega aquí tu banner/CMP antes de cargar.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function AnalyticsScripts() {
  const ga4 = integrations.GA4_MEASUREMENT_ID;
  const pixel = integrations.META_PIXEL_ID;
  const ga4Valid = /^G-[A-Z0-9]{4,}$/.test(ga4);
  const pixelValid = /^\d{6,20}$/.test(pixel);

  return (
    <>
      {/* ── GA4 ─────────────────────────────────────────────────────── */}
      {ga4Valid && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga4}');`}
          </Script>
        </>
      )}

      {/* ── Meta Pixel ──────────────────────────────────────────────── */}
      {pixelValid && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}
          </Script>
          <PixelPageViews />
        </>
      )}
    </>
  );
}
