/**
 * Slots de fotografía real. NO sustituir con stock ni imágenes generadas.
 *
 * Para activar un asset:
 *  1. Copia el archivo aprobado a /public/assets/ (ej. /public/assets/hero-desktop.jpg).
 *  2. Escribe su ruta en `src` (y `srcMobile` cuando aplique).
 *  3. Escribe el texto alternativo en `alt`. Si queda vacío, en desarrollo verás
 *     "ALT PENDIENTE" y en producción la imagen se trata como decorativa.
 *
 * Ratios, crops y permisos: ASSETS_NEEDED.md
 */

export type Ratio = { w: number; h: number };

export type AssetSlotId =
  | "FOTO_MAS_HERO"
  | "FOTO_MAS_PROCESO"
  | "FOTO_MAS_FEEDBACK"
  | "GALERIA_WORK_01"
  | "GALERIA_WORK_02"
  | "GALERIA_WORK_03"
  | "GALERIA_WORK_04"
  | "GALERIA_WORK_05"
  | "GALERIA_WORK_06"
  | "FOTO_MAS_COMUNIDAD"
  | "FOTO_MAS_CIERRE";

export type AssetSlot = {
  id: AssetSlotId;
  /** Qué debe mostrar la foto. Se ve en la etiqueta de desarrollo. */
  brief: string;
  ratio: Ratio;
  /** Ratio alternativo para móvil (< 1024 px). */
  ratioMobile?: Ratio;
  src: string | null;
  srcMobile?: string | null;
  alt: string;
};

const r = (w: number, h: number): Ratio => ({ w, h });

export const assets: Record<AssetSlotId, AssetSlot> = {
  FOTO_MAS_HERO: {
    id: "FOTO_MAS_HERO",
    brief: "Crítica, presentación o clase. Deja espacio para copy.",
    ratio: r(16, 9),
    ratioMobile: r(9, 16),
    src: null,
    srcMobile: null,
    alt: "",
  },
  FOTO_MAS_PROCESO: {
    id: "FOTO_MAS_PROCESO",
    brief: "Brief, sketches, pared de trabajo o pantalla.",
    ratio: r(4, 3),
    src: null,
    alt: "",
  },
  FOTO_MAS_FEEDBACK: {
    id: "FOTO_MAS_FEEDBACK",
    brief: "Revisión uno a uno o en equipo.",
    ratio: r(3, 2),
    src: null,
    alt: "",
  },
  GALERIA_WORK_01: {
    id: "GALERIA_WORK_01",
    brief: "Trabajo de alumno autorizado.",
    ratio: r(4, 5),
    src: null,
    alt: "",
  },
  GALERIA_WORK_02: {
    id: "GALERIA_WORK_02",
    brief: "Trabajo de alumno autorizado.",
    ratio: r(1, 1),
    src: null,
    alt: "",
  },
  GALERIA_WORK_03: {
    id: "GALERIA_WORK_03",
    brief: "Trabajo de alumno autorizado.",
    ratio: r(4, 5),
    src: null,
    alt: "",
  },
  GALERIA_WORK_04: {
    id: "GALERIA_WORK_04",
    brief: "Trabajo de alumno autorizado.",
    ratio: r(1, 1),
    src: null,
    alt: "",
  },
  GALERIA_WORK_05: {
    id: "GALERIA_WORK_05",
    brief: "Trabajo de alumno autorizado.",
    ratio: r(4, 5),
    src: null,
    alt: "",
  },
  GALERIA_WORK_06: {
    id: "GALERIA_WORK_06",
    brief: "Trabajo de alumno autorizado.",
    ratio: r(1, 1),
    src: null,
    alt: "",
  },
  FOTO_MAS_COMUNIDAD: {
    id: "FOTO_MAS_COMUNIDAD",
    brief: "Actividad real de trabajo.",
    ratio: r(16, 10),
    src: null,
    alt: "",
  },
  FOTO_MAS_CIERRE: {
    id: "FOTO_MAS_CIERRE",
    brief: "Escena de trabajo con zona para CTA.",
    ratio: r(3, 2),
    src: null,
    alt: "",
  },
};

export const GALLERY_SLOTS: AssetSlotId[] = [
  "GALERIA_WORK_01",
  "GALERIA_WORK_02",
  "GALERIA_WORK_03",
  "GALERIA_WORK_04",
  "GALERIA_WORK_05",
  "GALERIA_WORK_06",
];
