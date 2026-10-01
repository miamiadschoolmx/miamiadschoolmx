import { cn } from "@/lib/cn";

/**
 * Logotipo tipográfico provisional.
 * Sustituir por el SVG oficial de Miami Ad School México ([LOGO_MAS] en
 * ASSETS_NEEDED.md) cuando esté disponible.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "display inline-flex flex-col leading-[0.82] [font-stretch:75%] [word-spacing:0]",
        className,
      )}
      aria-label="Miami Ad School México"
      role="img"
    >
      <span aria-hidden="true" className="text-[1.375rem] tracking-[0.015em]">
        Miami Ad School
      </span>
      <span
        aria-hidden="true"
        className="mt-1 text-[0.8125rem] font-semibold tracking-[0.32em]"
      >
        México
      </span>
    </span>
  );
}
