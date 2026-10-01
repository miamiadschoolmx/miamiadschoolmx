import { cn } from "@/lib/cn";

/**
 * Cadena tipográfica del mecanismo: idea → … → book.
 * Lista ordenada real; las flechas son decorativas (aria-hidden).
 */
export function ProcessChain({
  steps,
  label,
  size = "lg",
  className,
}: {
  steps: string[];
  label: string;
  size?: "lg" | "md";
  className?: string;
}) {
  return (
    <ol
      aria-label={label}
      className={cn(
        "display flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:gap-x-4",
        size === "lg"
          ? "text-[clamp(2.25rem,1.3rem+3.6vw,4.75rem)] leading-[1]"
          : "text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-[1.05]",
        className,
      )}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={step} className="flex items-baseline gap-x-3 sm:gap-x-4">
            <span
              className={cn(
                isLast && "bg-magenta px-[0.18em] text-white",
              )}
            >
              {step}
            </span>
            {!isLast && (
              <span aria-hidden="true" className="font-sans font-normal text-magenta">
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
