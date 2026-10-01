import { Container } from "@/components/ui/Container";
import { DevTag } from "@/components/ui/DevTag";
import { isDevMode } from "@/config/integrations";
import { site } from "@/config/site";
import { getPublicConfig } from "@/lib/public-config";
import { cn } from "@/lib/cn";

import { Logo } from "./Logo";

/** Footer mínimo: marca y aviso de privacidad. Sin navegación de salida. */
export function SiteFooter({ className }: { className?: string }) {
  const { privacyUrl } = getPublicConfig();
  const year = new Date().getFullYear();

  return (
    <footer data-tone="ink" className={cn("bg-ink text-paper", className)}>
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between">
        <Logo />
        <div className="flex flex-col gap-2 text-sm sm:items-end">
          {privacyUrl ? (
            <a
              href={privacyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
            >
              Aviso de privacidad
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          ) : isDevMode ? (
            <DevTag>[PRIVACY_URL] Aviso de privacidad</DevTag>
          ) : (
            <span>Aviso de privacidad: configuración pendiente</span>
          )}
          <p className="text-paper/80">
            © {year} {site.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
