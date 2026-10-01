import { VideoCta } from "@/components/conversion/Ctas";
import { AssetSlot } from "@/components/media/AssetSlot";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { closing } from "@/content/carreras-creativas";
import { bigIdea } from "@/content/shared";

/**
 * Cierre: repite la Big Idea y el CTA. [FOTO_MAS_CIERRE] 3:2 con la zona
 * inferior izquierda reservada para el bloque de CTA.
 */
export function Closing() {
  return (
    <Section tone="plum" id="cierre" labelledBy="cierre-title">
      <Container>
        <Reveal>
          <Heading id="cierre-title" className="max-w-[18ch]">
            {closing.title}
          </Heading>
        </Reveal>

        <div className="relative mt-12 lg:mt-16">
          <AssetSlot
            id="FOTO_MAS_CIERRE"
            sizes="(min-width: 1440px) 1344px, 100vw"
            labelClassName="items-start justify-start lg:items-end lg:text-right"
          />
          <div
            data-tone="paper"
            className="relative mx-3 -mt-16 bg-paper p-7 text-ink sm:mx-8 sm:-mt-24 sm:p-10 lg:absolute lg:bottom-0 lg:left-0 lg:m-0 lg:w-[min(38rem,48%)] lg:p-12"
          >
            <p className="display text-h3">
              <span className="block">{bigIdea.first}</span>{" "}
              <span className="block text-magenta">{bigIdea.second}</span>
            </p>
            <div className="mt-8">
              <VideoCta location="cierre" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
