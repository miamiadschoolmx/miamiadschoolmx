/**
 * Copy de /carreras-creativas.
 * Regla de bloque: un headline, máximo 45 palabras de texto y tres bullets
 * o una visual dominante. No agregar premios, cifras, testimonios, nombres
 * ni promesas (empleo, sueldo, admisión, beca, cupo, fechas límite).
 */

export const hero = {
  eyebrow: "Carreras Creativas · Miami Ad School México",
  subheadline:
    "Construye un book que demuestre cómo piensas, no sólo lo que sabes ejecutar. Explora si la ruta creativa de Miami Ad School es para ti.",
  bullets: [
    "Qué le falta a un book para abrir conversaciones",
    "Cómo convertir una idea en evidencia",
    "Si Art Direction o Copywriting encaja contigo",
  ],
  microcopy: "Sólo te pedimos nombre y email.",
};

/** Claim autorizado. No agregar otros premios ni cifras. */
export const credibility = {
  title: "Escuela del Año en Cannes Lions",
  support:
    "En 2025, Miami Ad School fue reconocida como Escuela del Año en Future Lions, Cannes Lions. Por séptima vez.",
};

export const diagnosis = {
  title: "Tu book no está mal. Está mal dirigido.",
  body: "Casi nunca falta talento. Falta dirección: qué piezas entran, qué historia cuentan juntas y qué demuestran de tu forma de pensar.",
  symptoms: [
    {
      title: "Aplicas y recibes silencio.",
      detail: "Tu book llega, pero no abre conversaciones.",
    },
    {
      title: "Tus piezas se ven bien, pero no cuentan una idea.",
      detail: "Quien las revisa ve ejecución. No ve criterio.",
    },
    {
      title: "Tu trabajo no representa el nivel al que quieres llegar.",
      detail: "Muestra dónde estuviste, no hacia dónde vas.",
    },
  ],
};

export const mechanism = {
  eyebrow: "Cómo funciona",
  title: "La idea no termina cuando se ve bonita.",
  body: "Una pieza de portafolio no sale a la primera. Partes de un brief, la presentas, recibes feedback y vuelves a hacerla. Lo que entra a tu book es lo que resistió ese proceso.",
  steps: [
    "Idea",
    "Concepto",
    "Sistema",
    "Ejecución",
    "Presentación",
    "Feedback",
    "Iteración",
    "Book",
  ],
  loopNote: "Entre feedback e iteración casi siempre hay más de una vuelta.",
  chainLabel: "Proceso de una pieza de portafolio",
};

export const routes = {
  title: "Elige el lenguaje que quieres dominar.",
  body: "Las dos rutas parten de una idea. Si todavía no sabes cuál es la tuya, está bien: lo exploramos contigo en la llamada.",
  durationLabel: "Duración de la carrera",
  items: [
    { name: "Art Direction", note: "Explora la ruta con un asesor en tu llamada." },
    { name: "Copywriting", note: "Explora la ruta con un asesor en tu llamada." },
  ],
};

export const evidence = {
  title: "Un portafolio se entiende a primera vista.",
  body: "Quien revisa un book decide rápido. Cada pieza tiene que dejar clara la idea, el criterio y el oficio, sin que tengas que explicarla.",
};

export const fit = {
  title: "No es para quien sólo busca un diploma.",
  body: "Esta ruta pide trabajo propio, constancia y apertura al feedback. Si eso te entusiasma más de lo que te asusta, vale la pena hablar.",
  yes: {
    title: "Es para ti si",
    items: [
      "Quieres producir trabajo propio, no sólo verlo.",
      "Estás dispuesto a rehacer una idea hasta que funcione.",
      "Buscas feedback directo, aunque incomode.",
      "Quieres construir evidencia de cómo piensas.",
    ],
  },
  no: {
    title: "No es para ti si",
    items: [
      "Sólo buscas aprender un software.",
      "Esperas resultados instantáneos.",
      "Quieres un empleo garantizado.",
      "Quieres un certificado sin hacer trabajo propio.",
    ],
  },
};

export const process = {
  title: "Primero entiende tu siguiente movimiento.",
  body: "No tienes que decidir hoy. Primero entiendes qué le falta a tu book. Después hablamos de si esta ruta tiene sentido para ti.",
  steps: [
    {
      title: "Ve el video privado.",
      detail: "Entiende qué le falta a tu book para abrir conversaciones.",
    },
    {
      title: "Explora tu ruta.",
      detail: "Art Direction, Copywriting o todavía no lo sabes. Las tres respuestas sirven.",
    },
    {
      title: "Agenda tu Llamada de Dirección de Carrera.",
      detail: "Revisamos dónde está tu portafolio y hacia dónde quieres moverte.",
    },
  ],
  admissionTitle: "Pasos de admisión.",
};

export type FaqItem = {
  question: string;
  /** Texto de la respuesta. `{duration}` / `{modality}` se sustituyen. */
  answer: string;
  /** Respuesta alternativa si el dato aún no está confirmado (producción). */
  fallback?: string;
};

export const faq = {
  title: "Preguntas antes de decidir.",
  body: "Respuestas cortas y honestas. Lo que dependa de tu caso lo revisamos en la llamada.",
  whatsappPrompt: "¿Otra duda? Escríbenos por WhatsApp",
  items: [
    {
      question: "¿Es en línea o presencial?",
      answer:
        "Modalidad: {modality}. Los detalles de horario los revisamos contigo en tu Llamada de Dirección de Carrera.",
      fallback:
        "Te confirmamos la modalidad y los horarios en tu Llamada de Dirección de Carrera.",
    },
    {
      question: "¿Cuánto tiempo real necesito?",
      answer:
        "La carrera dura {duration}. Además de las sesiones, necesitas tiempo para producir, rehacer y presentar. En la llamada revisamos si tu agenda actual lo permite.",
      fallback:
        "Además de las sesiones, necesitas tiempo para producir, rehacer y presentar. En la llamada revisamos la duración y si tu agenda actual lo permite.",
    },
    {
      question: "¿Y si no soy lo suficientemente creativo?",
      answer:
        "La pregunta útil no es si eres creativo, sino si estás dispuesto a trabajar una idea hasta que se sostenga. El criterio se entrena con trabajo y feedback. En la llamada revisamos tu punto de partida con honestidad.",
    },
    {
      question: "¿Qué diferencia hay entre Art Direction y Copywriting?",
      answer:
        "En la industria, Art Direction suele resolver las ideas desde la imagen y Copywriting desde la palabra; en la práctica, ambos piensan conceptos juntos. Las diferencias concretas de cada ruta las exploras con un asesor en tu llamada.",
    },
    {
      question: "¿En qué se diferencia de un curso de software o de una universidad?",
      answer:
        "Un curso de software te enseña una herramienta. Una universidad te da una formación amplia. Aquí el foco es otro: producir ideas, presentarlas, recibir feedback y convertirlas en un portafolio que demuestre criterio.",
    },
    {
      question: "¿Cuánto cuesta?",
      answer:
        "La inversión la revisamos contigo en la Llamada de Dirección de Carrera, después de entender tu punto de partida y si esta ruta tiene sentido para ti.",
    },
    {
      question: "¿Me garantiza empleo?",
      answer:
        "No hay garantía de empleo; el foco es desarrollar evidencia y criterio en tu portafolio.",
    },
  ] satisfies FaqItem[],
};

export const closing = {
  title: "Tu siguiente trabajo no debería depender de explicar tu potencial.",
};
