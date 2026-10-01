import type { MetadataRoute } from "next";

import { integrations } from "@/config/integrations";

/**
 * Las páginas del funnel (/vsl, /agenda, /gracias-agenda) NO se bloquean
 * aquí: llevan meta robots noindex, y un Disallow impediría que los
 * buscadores lean esa etiqueta.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: integrations.SITE_URL ? `${integrations.SITE_URL}/sitemap.xml` : undefined,
  };
}
