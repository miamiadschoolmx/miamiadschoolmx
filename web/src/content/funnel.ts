/**
 * Copy de /vsl, /agenda y /gracias-agenda.
 * /vsl: no resumir ni narrar el contenido del video.
 * /agenda: no inventar duración ni horarios de la llamada.
 * /gracias-agenda: sin ofertas adicionales.
 */

export const vslPage = {
  eyebrow: "Video privado",
  title: "Mira esto antes de seguir agregando piezas a tu book.",
  videoTitle: "Video privado · Carreras Creativas · Miami Ad School México",
  nextStep: "Cuando termines, agenda tu llamada.",
  whatsapp: "¿Dudas? Escríbenos por WhatsApp",
  mechanism: {
    title: "Así se construye un book con criterio.",
    body: "Cada pieza parte de un brief, se presenta, recibe feedback y se rehace. Lo que resiste ese proceso es lo que entra a tu book.",
  },
};

export const agendaPage = {
  eyebrow: "Llamada de Dirección de Carrera",
  title: "Agenda tu llamada.",
  body: "En esta llamada revisaremos dónde está tu portafolio, hacia dónde quieres moverte y si esta ruta tiene sentido para ti.",
  note: "No necesitas tener un book terminado para agendar.",
  embedTitle: "Agenda de Llamadas de Dirección de Carrera",
  openNewTab: "Abrir la agenda en una pestaña nueva",
  whatsapp: "¿Prefieres resolver una duda antes? Escríbenos por WhatsApp",
  pending: "La agenda está en configuración.",
  pendingWhatsapp: "Mientras tanto, escríbenos por WhatsApp",
};

export const thanksPage = {
  eyebrow: "Llamada agendada",
  title: "Tu llamada está reservada.",
  body: "Gracias. La fecha y la hora quedan en la confirmación de tu agenda.",
  prepTitle: "Antes de la llamada",
  prep: [
    {
      title: "Reúne tu trabajo actual.",
      detail: "Links, PDF o piezas sueltas. No tiene que estar terminado.",
    },
    {
      title: "Define hacia dónde quieres moverte.",
      detail: "Agencia, marca, contenido, freelance o un cambio de ruta.",
    },
    {
      title: "Anota tus preguntas.",
      detail: "Ruta, modalidad, tiempo e inversión.",
    },
  ],
  backToVideo: "Volver a ver el video",
  whatsapp: "¿Dudas de logística? Escríbenos por WhatsApp",
};
