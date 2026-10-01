"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * El Pixel sólo registra el PageView inicial. Esta pieza registra las
 * navegaciones internas (p. ej. /carreras-creativas → /vsl).
 * GA4 lo resuelve con "Medición mejorada → cambios de historial".
 */
export function PixelPageViews() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
