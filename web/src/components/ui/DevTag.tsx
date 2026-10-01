import { cn } from "@/lib/cn";

/**
 * Etiqueta visible SÓLO en modo desarrollo. El componente que la usa decide
 * si renderizarla (isDev); aquí sólo vive el estilo.
 */
export function DevTag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 bg-dev px-2 py-1 font-mono text-[0.75rem] font-bold leading-tight tracking-normal text-ink normal-case",
        className,
      )}
    >
      <span aria-hidden="true">DEV</span>
      <span>{children}</span>
    </span>
  );
}

/** Valor tentativo de un dato [CONFIRMAR: …] en desarrollo. */
export function PendingValue({ value }: { value: string }) {
  return (
    <mark className="bg-dev px-1 font-mono text-[0.9em] text-ink">
      [CONFIRMAR: {value}]
    </mark>
  );
}
