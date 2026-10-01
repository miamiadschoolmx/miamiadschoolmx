/**
 * Datos del programa que deben confirmarse antes de publicarse.
 *
 * Formato de un dato pendiente: "[CONFIRMAR: valor tentativo]".
 *  - En desarrollo se muestra resaltado como pendiente.
 *  - En producción NO se publica: la frase que lo contiene usa un texto
 *    alternativo que no afirma nada (ver src/lib/confirmable.ts).
 * Cuando el dato esté confirmado, escribe sólo el valor. Ej.: "1 año".
 *
 * No uses como fuente la duración del PDF histórico.
 */
export const PROGRAM_DURATION = "[CONFIRMAR: 1 año]";

/** Modalidad (en línea, presencial, híbrida…). */
export const PROGRAM_MODALITY = "[CONFIRMAR: modalidad]";

/**
 * Paso 4 del bloque "Proceso". Sólo se muestra cuando esté confirmado.
 * Ej.: "Si tiene sentido para ambos, te compartimos los pasos de admisión."
 */
export const ADMISSION_STEP = "[CONFIRMAR: pasos de admisión]";
