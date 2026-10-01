import { VideoCta } from "@/components/conversion/Ctas";
import { AssetSlot } from "@/components/media/AssetSlot";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Heading, Lead } from "@/components/ui/Typography";
import { GALLERY_SLOTS } from "@/config/assets";
import { evidence } from "@/content/carreras-creativas";
import { cn } from "@/lib/cn";

/**
 * Evidencia visual: mosaico editorial con los seis slots de trabajo de
 * alumnos autorizado. Sin testimonios ni atribuciones.
 */
export function Evidence() {
  return (
    <Section tone="paper" labelledBy="evidencia-title">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Heading id="evidencia-title" className="lg:col-span-7">
            {evidence.title}
          </Heading>
          <Lead className="lg:col-span-5 lg:pb-2">{evidence.body}</Lead>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 items-start gap-3 sm:gap-5 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {GALLERY_SLOTS.map((id, index) => (
            <li
              key={id}
              className={cn(
                // Ritmo editorial: columnas desfasadas.
                index % 2 === 1 && "mt-10 lg:mt-0",
                (index === 1 || index === 4) && "lg:mt-24",
              )}
            >
              <AssetSlot id={id} sizes="(min-width: 1024px) 30vw, 50vw" />
            </li>
          ))}
        </ul>

        <div className="mt-12 lg:mt-16">
          <VideoCta location="evidencia" />
        </div>
      </Container>
    </Section>
  );
}
