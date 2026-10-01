import { ProcessChain } from "@/components/editorial/ProcessChain";
import { AssetSlot } from "@/components/media/AssetSlot";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Lead } from "@/components/ui/Typography";
import { site } from "@/config/site";
import { mechanism } from "@/content/carreras-creativas";

/** Mecanismo (ancla "Cómo funciona"). Sin módulos, calendario ni temario. */
export function Mechanism() {
  return (
    <Section tone="blush" id={site.howItWorksId} labelledBy="mecanismo-title">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow className="text-plum">{mechanism.eyebrow}</Eyebrow>
            <Heading id="mecanismo-title" className="mt-4 text-plum">
              {mechanism.title}
            </Heading>
          </div>
          <Lead className="lg:col-span-5 lg:pb-2">{mechanism.body}</Lead>
        </Reveal>

        <Reveal className="mt-14 border-y-2 border-plum py-10 text-plum lg:mt-20 lg:py-14">
          <ProcessChain steps={mechanism.steps} label={mechanism.chainLabel} />
          <p className="mt-8 text-lg font-medium text-ink">{mechanism.loopNote}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <AssetSlot
            id="FOTO_MAS_PROCESO"
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="lg:col-span-7"
          />
          <AssetSlot
            id="FOTO_MAS_FEEDBACK"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="w-[86%] justify-self-end lg:col-span-5 lg:mt-40 lg:w-full"
          />
        </div>
      </Container>
    </Section>
  );
}
