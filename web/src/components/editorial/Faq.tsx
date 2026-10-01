import { cn } from "@/lib/cn";

/**
 * Preguntas frecuentes con <details>: accesible por teclado y sin JS.
 */
export function Faq({
  items,
  className,
}: {
  items: { question: string; answer: React.ReactNode }[];
  className?: string;
}) {
  return (
    <div className={cn("border-t-2 border-current", className)}>
      {items.map((item) => (
        <details key={item.question} className="group border-b-2 border-current">
          <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 text-[1.1875rem] font-semibold leading-snug sm:text-[1.3125rem]">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="display shrink-0 text-[2rem] leading-none transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="max-w-[40rem] pb-7 pr-8 text-[1.0625rem] leading-relaxed sm:text-lg">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
