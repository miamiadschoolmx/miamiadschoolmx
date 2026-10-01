import { VideoCta } from "@/components/conversion/Ctas";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

import { Logo } from "./Logo";

/**
 * Header sin navegación que saque de la conversión.
 * - "landing": logo + ancla "Cómo funciona" + CTA principal (desde sm).
 * - "minimal": sólo logo (páginas del funnel).
 */
export function SiteHeader({
  variant = "minimal",
  tone = "plum",
}: {
  variant?: "landing" | "minimal";
  tone?: "plum" | "paper";
}) {
  return (
    <header
      data-tone={tone}
      className={cn(tone === "plum" ? "bg-plum text-paper" : "bg-paper text-ink")}
    >
      <Container className="flex min-h-18 items-center justify-between gap-4 py-3 lg:min-h-22">
        <Logo />
        {variant === "landing" && (
          <nav aria-label="Página" className="flex items-center gap-3 sm:gap-6">
            <a
              href={`#${site.howItWorksId}`}
              className="inline-flex min-h-11 items-center text-[0.9375rem] font-semibold underline-offset-4 hover:underline"
            >
              Cómo funciona
            </a>
            <div className="hidden sm:block">
              <VideoCta location="header" size="sm" />
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
