import { isDevMode } from "@/config/integrations";
import { cn } from "@/lib/cn";

import { EmbedHtml } from "./EmbedHtml";

/**
 * Contenedor responsive 16:9 para el VSL.
 * [PEGAR AQUÍ EL EMBED DEL VSL] → variable VSL_EMBED (URL o código embed).
 */
export function VideoFrame({
  embed,
  title,
  className,
}: {
  embed: string;
  title: string;
  className?: string;
}) {
  const isUrl = /^https:\/\/\S+$/i.test(embed);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden bg-ink text-paper",
        "[&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full",
        className,
      )}
    >
      {isUrl ? (
        <iframe
          src={embed}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          loading="eager"
          className="border-0"
        />
      ) : embed ? (
        <EmbedHtml html={embed} title={title} className="absolute inset-0" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          {isDevMode ? (
            <>
              <span className="bg-dev px-3 py-2 font-mono text-sm font-bold text-ink sm:text-base">
                [PEGAR AQUÍ EL EMBED DEL VSL]
              </span>
              <span className="max-w-md font-mono text-xs text-paper/80">
                Variable VSL_EMBED · URL del reproductor o código embed · 16:9
              </span>
            </>
          ) : (
            <p className="text-lg font-semibold">Video: configuración pendiente</p>
          )}
        </div>
      )}
    </div>
  );
}
