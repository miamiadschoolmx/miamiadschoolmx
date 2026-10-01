import type { MetadataRoute } from "next";

import { integrations } from "@/config/integrations";
import { site } from "@/config/site";

/** Sólo la landing pública. Sin SITE_URL no se publican URLs inventadas. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!integrations.SITE_URL) return [];
  return [
    {
      url: `${integrations.SITE_URL}${site.routes.landing}`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
