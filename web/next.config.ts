import type { NextConfig } from "next";

const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // El banner amarillo de desarrollo ya indica el modo; ocultamos el indicador de Next.
  devIndicators: false,

  async redirects() {
    return [
      // Mientras no exista la web corporativa, la raíz lleva a la landing.
      // Temporal (307) para poder reemplazarla después sin caché permanente.
      { source: "/", destination: "/carreras-creativas", permanent: false },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      // Páginas del funnel: fuera de buscadores (además del meta robots).
      { source: "/vsl", headers: noindex },
      { source: "/agenda", headers: noindex },
      { source: "/gracias-agenda", headers: noindex },
      { source: "/api/:path*", headers: noindex },
    ];
  },
};

export default nextConfig;
