import { VideoCta } from "@/components/conversion/Ctas";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Heading, Lead } from "@/components/ui/Typography";
import { diagnosis } from "@/content/carreras-creativas";

export function Diagnosis() {
  return (
    <Section tone="paper" labelledBy="diagnostico-title">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Heading id="diagnostico-title" className="lg:col-span-7">
            {diagnosis.title}
          </Heading>
          <Lead className="lg:col-span-5 lg:pb-2">{diagnosis.body}</Lead>
        </Reveal>

        <ol className="mt-14 grid border-t-2 border-ink md:grid-cols-3 md:gap-10 md:border-t-0 lg:mt-20">
          {diagnosis.symptoms.map((symptom, index) => (
            <li
              key={symptom.title}
              className="border-b-2 border-ink py-8 md:border-b-0 md:border-t-2 md:pt-6"
            >
              <span aria-hidden="true" className="display block text-[3.5rem] leading-none text-magenta sm:text-[4.5rem]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-[1.5rem] font-bold leading-tight sm:text-[1.75rem]">
                {symptom.title}
              </h3>
              <p className="mt-3 text-lg text-ink/85">{symptom.detail}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 lg:mt-16">
          <VideoCta location="diagnostico" />
        </div>
      </Container>
    </Section>
  );
}
