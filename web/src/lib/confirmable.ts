const PENDING = /^\[CONFIRMAR:\s*(.*?)\s*\]$/i;

export type Confirmable = {
  /** true cuando el valor ya no lleva el prefijo [CONFIRMAR: …] */
  confirmed: boolean;
  /** Valor tentativo (sin corchetes) o valor confirmado. */
  value: string;
  /** Texto original del config. */
  raw: string;
};

export function confirmable(raw: string): Confirmable {
  const match = raw.trim().match(PENDING);
  if (match) return { confirmed: false, value: match[1], raw: raw.trim() };
  return { confirmed: raw.trim().length > 0, value: raw.trim(), raw: raw.trim() };
}
