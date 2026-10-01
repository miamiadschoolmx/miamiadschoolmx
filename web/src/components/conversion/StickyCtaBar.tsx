"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

import { VideoCta } from "./Ctas";

/**
 * Barra inferior fija sólo en móvil. Aparece después del hero y se oculta
 * cuando el bloque de cierre (que ya tiene su CTA) está en pantalla.
 * Requiere elementos con id `heroId` y `closingId`.
 */
export function StickyCtaBar({
  heroId,
  closingId,
}: {
  heroId: string;
  closingId: string;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [closingVisible, setClosingVisible] = useState(false);
  const visible = pastHero && !closingVisible;

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const closing = document.getElementById(closingId);
    if (!hero || !("IntersectionObserver" in window)) return;

    const heroObserver = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    heroObserver.observe(hero);

    const closingObserver = new IntersectionObserver(
      ([entry]) => setClosingVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );
    if (closing) closingObserver.observe(closing);

    return () => {
      heroObserver.disconnect();
      closingObserver.disconnect();
    };
  }, [heroId, closingId]);

  // El botón de WhatsApp lee este atributo para no quedar encimado.
  useEffect(() => {
    const root = document.documentElement;
    if (visible) root.dataset.sticky = "on";
    else delete root.dataset.sticky;
    return () => {
      delete root.dataset.sticky;
    };
  }, [visible]);

  return (
    <aside
      aria-label="Acceso al video privado"
      data-tone="plum"
      inert={!visible}
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 bg-plum px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden",
        "transition-[transform,visibility] duration-300",
        visible ? "visible translate-y-0" : "invisible translate-y-full",
      )}
    >
      <VideoCta location="sticky" size="md" block />
    </aside>
  );
}
