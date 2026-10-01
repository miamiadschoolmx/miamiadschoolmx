"use client";

import { useEffect, useRef } from "react";

/**
 * Inserta un embed de terceros (Systeme.io, proveedor de video…) y vuelve a
 * ejecutar sus <script>, que React no ejecuta al usar innerHTML.
 * El HTML viene de la configuración del sitio, nunca del usuario.
 */
export function EmbedHtml({
  html,
  className,
  title,
}: {
  html: string;
  className?: string;
  title?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    host.innerHTML = html;

    host.querySelectorAll("script").forEach((original) => {
      const script = document.createElement("script");
      for (const attr of Array.from(original.attributes)) {
        script.setAttribute(attr.name, attr.value);
      }
      script.text = original.text;
      original.replaceWith(script);
    });

    // Los iframes del embed necesitan un título accesible.
    if (title) {
      host.querySelectorAll("iframe:not([title])").forEach((frame) => {
        frame.setAttribute("title", title);
      });
    }

    return () => {
      host.innerHTML = "";
    };
  }, [html, title]);

  return <div ref={ref} className={className} />;
}
