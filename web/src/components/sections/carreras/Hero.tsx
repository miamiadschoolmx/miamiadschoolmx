import { VideoCta } from "@/components/conversion/Ctas";
import { HeroAssetSlot } from "@/components/media/AssetSlot";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Typography";
import { hero } from "@/content/carreras-creativas";
import { bigIdea } from "@/content/shared";

/**
 * Hero. [FOTO_MAS_HERO]: 9:16 en móvil (franja superior visible) y 16:9 en
 * desktop (fondo completo, la mitad izquierda queda bajo el bloque de copy).
 * El copy siempre va sobre plum sólido: contraste AA garantizado con
 * cualquier fotografía.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      data-tone="plum"
      className="relative isolate overflow-hidden bg-plum text-paper"
    >
      <div className="absolute inset-x-0 top-0 -z-10 aspect-[9/16] lg:inset-0 lg:aspect-auto">
        <HeroAssetSlot labelClassName="items-start justify-start lg:items-end lg:text-right" />
      </div>

      <Container>
        <div className="lg:grid lg:min-h-[min(56.25vw,calc(100svh-5.5rem))] lg:grid-cols-[minmax(0,60fr)_minmax(0,40fr)] xl:grid-cols-[minmax(0,56fr)_minmax(0,44fr)]">
          <div className="relative -mx-5 mt-[40vw] bg-plum px-5 pb-14 pt-8 sm:-mx-8 sm:mt-[34vw] sm:px-8 lg:mx-0 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:px-0 lg:py-16 lg:pr-14 lg:before:absolute lg:before:inset-y-0 lg:before:right-full lg:before:w-[50vw] lg:before:bg-plum xl:py-20">
            <Eyebrow className="text-blush motion-safe:animate-rise">{hero.eyebrow}</Eyebrow>

            <h1 id="hero-title" className="display mt-5 text-h1 lg:text-[clamp(3rem,0.6rem+4.9vw,6.25rem)]">
              <span className="block">{bigIdea.first}</span>{" "}
              <span className="block text-magenta">{bigIdea.second}</span>
            </h1>

            <p className="mt-6 max-w-[34rem] text-lead text-paper motion-safe:animate-rise motion-safe:[animation-delay:120ms]">
              {hero.subheadline}
            </p>

            <div className="mt-8 motion-safe:animate-rise motion-safe:[animation-delay:220ms]">
              <VideoCta location="hero" />
              <p className="mt-3 text-sm text-paper/85">{hero.microcopy}</p>
            </div>

            <ul
              className="mt-9 flex flex-col gap-3 border-t border-paper/25 pt-6 motion-safe:animate-rise motion-safe:[animation-delay:320ms]"
            >
              {hero.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-[1.0625rem] leading-snug">
                  <span aria-hidden="true" className="mt-[0.45em] size-2 shrink-0 bg-magenta" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div aria-hidden="true" className="hidden lg:block" />
        </div>
      </Container>
    </section>
  );
}
