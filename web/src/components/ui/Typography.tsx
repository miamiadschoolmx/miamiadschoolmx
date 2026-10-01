import { cn } from "@/lib/cn";

type HeadingSize = "mega" | "h1" | "h2" | "h3";

const sizeClasses: Record<HeadingSize, string> = {
  mega: "text-mega",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
};

/** Titular editorial: grotesca condensada en mayúsculas. */
export function Heading({
  as: Tag = "h2",
  size = "h2",
  id,
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  size?: HeadingSize;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag id={id} className={cn("display", sizeClasses[size], className)}>
      {children}
    </Tag>
  );
}

/**
 * Antetítulo. `variant="tag"` usa bloque magenta con texto blanco (4.65:1),
 * legible incluso en tamaño pequeño.
 */
export function Eyebrow({
  variant = "plain",
  className,
  children,
}: {
  variant?: "plain" | "tag";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-[0.8125rem] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.14em]",
        variant === "tag" && "inline-block bg-magenta px-2.5 py-1.5 text-white",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Lead({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={cn("text-lead max-w-[38rem]", className)}>{children}</p>;
}
