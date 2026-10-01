/** Datos de marca y rutas. Seguro para servidor y navegador. */
export const site = {
  name: "Miami Ad School México",
  locale: "es_MX",
  lang: "es-MX",
  routes: {
    landing: "/carreras-creativas",
    vsl: "/vsl",
    agenda: "/agenda",
    thanks: "/gracias-agenda",
  },
  /** Ancla de "Cómo funciona" en la landing. */
  howItWorksId: "como-funciona",
} as const;

export const seo = {
  landing: {
    title: "Carreras Creativas | Miami Ad School México",
    description:
      "El talento no te consigue trabajo. Tu portafolio sí. Explora las Carreras Creativas de Miami Ad School México en Art Direction y Copywriting.",
  },
  /**
   * [OG_IMAGE] 1200×630. Copia el archivo aprobado a /public/og/ y escribe su
   * ruta aquí, ej. "/og/carreras-creativas.jpg". Vacío = sin og:image.
   */
  ogImage: "" as string,
  ogImageAlt: "" as string,
};
