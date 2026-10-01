import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { credibility } from "@/content/carreras-creativas";

/** Credibilidad mínima: sólo el claim autorizado. */
export function Credibility() {
  return (
    <Section tone="magenta" spacing="tight" labelledBy="credibilidad-title">
      <Container className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
        <Heading id="credibilidad-title" size="mega" className="lg:col-span-8">
          {credibility.title}
        </Heading>
        <p className="max-w-[30rem] text-lead font-medium lg:col-span-4 lg:pb-3">
          {credibility.support}
        </p>
      </Container>
    </Section>
  );
}
