import { UTM_KEYS, type UtmParams } from "@/lib/lead/types";

const STORAGE_KEY = "mas:utm";

/** Guarda los UTM de la URL actual (si los hay) para esta sesión. */
export function captureUtm(search: string) {
  const params = new URLSearchParams(search);
  const found: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) found[key] = value.slice(0, 150);
  }
  if (Object.keys(found).length === 0) return;
  try {
    // Último toque con UTM gana dentro de la sesión.
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // Almacenamiento bloqueado: seguimos sin UTM persistentes.
  }
}

export function readUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as UtmParams;
  } catch {
    // Ignorado: seguimos con los de la URL.
  }
  const fromUrl = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = fromUrl.get(key);
    if (value) utm[key] = value;
  }
  return utm;
}

/** Agrega los UTM guardados a una URL externa (p. ej. página de Systeme.io). */
export function withUtm(url: string): string {
  const utm = readUtm();
  if (Object.keys(utm).length === 0) return url;
  try {
    const target = new URL(url, window.location.href);
    for (const [key, value] of Object.entries(utm)) {
      if (value && !target.searchParams.has(key))
        target.searchParams.set(key, value);
    }
    return target.toString();
  } catch {
    return url;
  }
}
