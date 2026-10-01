import Image, { getImageProps } from "next/image";

import { assets, type AssetSlotId, type Ratio } from "@/config/assets";
import { isDevMode } from "@/config/integrations";
import { cn } from "@/lib/cn";

const ratioText = (r: Ratio) => `${r.w}:${r.h}`;

/**
 * Espacio para fotografía real aprobada.
 * - Con `src` configurado: imagen optimizada (next/image).
 * - Sin `src` en desarrollo: bloque plano con la etiqueta visible del slot.
 * - Sin `src` en producción: bloque plano sin texto (nunca stock ni IA).
 *
 * `fill` hace que ocupe el contenedor padre (el padre define el ratio);
 * si no, el propio slot mantiene su ratio.
 */
export function AssetSlot({
  id,
  sizes,
  fill = false,
  preload = false,
  className,
  labelClassName,
}: {
  id: AssetSlotId;
  sizes: string;
  fill?: boolean;
  /** Sólo para la imagen principal de la página (LCP). */
  preload?: boolean;
  className?: string;
  /** Posición de la etiqueta de desarrollo (p. ej. arriba en el hero). */
  labelClassName?: string;
}) {
  const slot = assets[id];
  const ratioStyle = fill
    ? undefined
    : { aspectRatio: `${slot.ratio.w} / ${slot.ratio.h}` };
  const missingAlt = !slot.alt.trim();

  if (slot.src) {
    return (
      <div
        className={cn("overflow-hidden", fill ? "absolute inset-0" : "relative", className)}
        style={ratioStyle}
      >
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
        {isDevMode && missingAlt && (
          <span className="absolute left-3 top-3 bg-dev px-2 py-1 font-mono text-xs font-bold text-ink">
            [{id}] ALT PENDIENTE
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      aria-hidden={isDevMode ? undefined : true}
      role={isDevMode ? "img" : undefined}
      aria-label={isDevMode ? `Espacio para fotografía ${id}` : undefined}
      className={cn(
        "overflow-hidden bg-[color-mix(in_srgb,currentColor_9%,transparent)]",
        fill ? "absolute inset-0" : "relative",
        className,
      )}
      style={ratioStyle}
      data-asset-slot={id}
    >
      {isDevMode && (
        <div
          className={cn(
            "absolute inset-2 flex flex-col gap-1.5 border border-dashed border-current/40 p-3 sm:inset-3 sm:p-4",
            labelClassName ?? "items-start justify-end",
          )}
        >
          <span className="bg-dev px-2 py-1 font-mono text-xs font-bold text-ink sm:text-sm">
            [{id}]
          </span>
          <span className="font-mono text-[0.7rem] leading-snug opacity-80 sm:text-xs">
            {slot.ratioMobile
              ? `${ratioText(slot.ratio)} desktop · ${ratioText(slot.ratioMobile)} móvil`
              : ratioText(slot.ratio)}
            {" · "}
            {slot.brief}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Variante con dirección de arte para el hero: un archivo 16:9 para desktop
 * y uno 9:16 para móvil, servidos con <picture>.
 */
export function HeroAssetSlot({
  className,
  labelClassName,
}: {
  className?: string;
  labelClassName?: string;
}) {
  const slot = assets.FOTO_MAS_HERO;
  if (!slot.src) {
    return (
      <AssetSlot
        id="FOTO_MAS_HERO"
        sizes="100vw"
        fill
        className={className}
        labelClassName={labelClassName}
      />
    );
  }

  const common = { alt: slot.alt, sizes: "100vw" };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: slot.src, width: 1920, height: 1080 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    src: slot.srcMobile ?? slot.src,
    width: 900,
    height: 1600,
  });

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <picture>
        <source media="(min-width: 1024px)" srcSet={desktop} />
        <source srcSet={mobile} />
        {/* Sólo se descarga la versión que corresponde; fetchPriority para el LCP. */}
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt viene de getImageProps */}
        <img
          {...rest}
          fetchPriority="high"
          className="h-full w-full object-cover lg:object-[70%_50%]"
        />
      </picture>
    </div>
  );
}
