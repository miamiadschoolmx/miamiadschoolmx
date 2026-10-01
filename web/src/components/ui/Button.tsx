import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "outline" | "pending";
export type ButtonSize = "lg" | "md" | "sm";
/** Superficie sobre la que vive el botón (para el hover del outline). */
export type ButtonSurface = "dark" | "light";

const base =
  "group inline-flex items-center justify-center gap-3 text-center font-semibold leading-tight transition-colors duration-200 select-none";

const sizes: Record<ButtonSize, string> = {
  lg: "min-h-[3.75rem] px-7 py-4 text-[1.0625rem] sm:text-lg",
  md: "min-h-12 px-5 py-3 text-base",
  sm: "min-h-11 px-4 py-2 text-[0.9375rem]",
};

export function buttonClasses({
  variant = "primary",
  size = "lg",
  surface = "light",
  block = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  surface?: ButtonSurface;
  block?: boolean;
  className?: string;
} = {}) {
  return cn(
    base,
    sizes[size],
    block && "w-full",
    // CTA principal: blanco sobre magenta = 4.65:1 (AA); hover 6.1:1.
    variant === "primary" &&
      "bg-magenta text-white hover:bg-magenta-press active:bg-magenta-press",
    variant === "outline" &&
      (surface === "dark"
        ? "border-2 border-paper text-paper hover:bg-paper hover:text-ink"
        : "border-2 border-ink text-ink hover:bg-ink hover:text-paper"),
    variant === "pending" &&
      "cursor-not-allowed border-2 border-dashed border-current bg-transparent",
    className,
  );
}

/** Flecha tipográfica; se desplaza en hover sólo si se permite movimiento. */
export function ButtonArrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-200 motion-safe:group-hover:translate-x-1"
    >
      →
    </span>
  );
}

/** Botón deshabilitado accesible (sigue siendo enfocable y anunciable). */
export function PendingButton({
  size = "lg",
  block,
  className,
  label = "Configuración pendiente",
  description,
}: {
  size?: ButtonSize;
  block?: boolean;
  className?: string;
  label?: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      aria-disabled="true"
      title={description}
      className={buttonClasses({ variant: "pending", size, block, className })}
    >
      {label}
    </button>
  );
}
