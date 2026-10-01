import { cn } from "@/lib/cn";

export type Tone = "plum" | "magenta" | "paper" | "blush" | "ink";

const toneClasses: Record<Tone, string> = {
  plum: "bg-plum text-paper",
  magenta: "bg-magenta text-white",
  paper: "bg-paper text-ink",
  blush: "bg-blush text-ink",
  ink: "bg-ink text-paper",
};

const spacingClasses = {
  default: "py-20 sm:py-28 lg:py-36",
  tight: "py-14 sm:py-20 lg:py-24",
  none: "",
};

/**
 * Bloque de color plano. Cada sección define su tono; el foco del teclado
 * se ajusta solo (ver data-tone en globals.css).
 */
export function Section({
  tone = "paper",
  spacing = "default",
  id,
  labelledBy,
  className,
  children,
}: {
  tone?: Tone;
  spacing?: keyof typeof spacingClasses;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-tone={tone}
      className={cn("relative", toneClasses[tone], spacingClasses[spacing], className)}
    >
      {children}
    </section>
  );
}
