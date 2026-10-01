import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";

import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { LeadCaptureProvider } from "@/components/conversion/LeadCapture";
import { PublicConfigProvider } from "@/components/conversion/PublicConfigProvider";
import { DevBanner } from "@/components/layout/DevBanner";
import { integrations } from "@/config/integrations";
import { site } from "@/config/site";
import { getPublicConfig } from "@/lib/public-config";

import "./globals.css";

/**
 * Tipografías abiertas (OFL) en lugar de fuentes con licencia:
 * - Archivo (eje de anchura 62–125) → titulares condensados.
 * - Inter → texto corrido.
 * next/font las descarga en build y las sirve desde el propio dominio.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(integrations.SITE_URL || "http://localhost:3000"),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  applicationName: site.name,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#2d133c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const publicConfig = getPublicConfig();

  return (
    <html lang={site.lang} className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only z-50 bg-ink px-4 py-3 font-semibold text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido
        </a>
        <DevBanner />
        <PublicConfigProvider value={publicConfig}>
          <LeadCaptureProvider>{children}</LeadCaptureProvider>
        </PublicConfigProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
