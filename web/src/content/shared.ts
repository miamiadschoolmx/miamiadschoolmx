/**
 * Copy compartido entre páginas (CTAs, modal, WhatsApp).
 * Voz: español mexicano neutro, directo, con "tú". Una idea por frase.
 */

export const ctaLabels = {
  video: "Ver el video privado",
  booking: "Agendar una Llamada de Dirección de Carrera",
  pending: "Configuración pendiente",
} as const;

export const bigIdea = {
  first: "El talento no te consigue trabajo.",
  second: "Tu portafolio sí.",
} as const;

export const leadModalCopy = {
  eyebrow: "Video privado",
  title: "Dos datos y vas al video.",
  description:
    "Escribe tu nombre y tu email. Al registrarte, te llevamos directo al video privado.",
  titleEmbed: "Regístrate para ver el video.",
  descriptionEmbed:
    "Completa el formulario. Al registrarte, te llevamos directo al video privado.",
  fields: {
    name: "Nombre",
    email: "Email",
    route: "¿Qué ruta te interesa?",
    optional: "(opcional)",
    consent:
      "Acepto recibir el acceso al video y comunicaciones de seguimiento.",
    privacyPrefix: "Consulta el",
    privacyLink: "aviso de privacidad",
  },
  submit: "Ver el video privado",
  submitting: "Registrando…",
  success: "Listo. Te llevamos al video.",
  error:
    "No pudimos registrar tus datos. Revisa tu conexión e inténtalo de nuevo.",
  errorWhatsapp: "Si el problema sigue, escríbenos por WhatsApp.",
  summary: (n: number) =>
    n === 1 ? "Revisa 1 campo para continuar." : `Revisa ${n} campos para continuar.`,
} as const;

export const whatsappCopy = {
  float: "WhatsApp",
  floatLong: "Dudas por WhatsApp",
  newTab: "(se abre en una pestaña nueva)",
  pending: "WhatsApp: configuración pendiente",
} as const;
