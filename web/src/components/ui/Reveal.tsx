"use client";

import { useEffect, useRef } from "react";

/**
 * Movimiento ligero: el contenido sube y aparece al entrar en pantalla.
 * - El HTML del servidor siempre es visible (sin JS no se oculta nada).
 * - Con prefers-reduced-motion no hay animación.
 * - Lo que ya está en pantalla al cargar no se anima.
 */
export function Reveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
