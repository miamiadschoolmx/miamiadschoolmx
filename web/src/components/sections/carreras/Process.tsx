import { Container } from "@/components/ui/Container";
import { DevTag } from "@/components/ui/DevTag";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Heading, Lead } from "@/components/ui/Typography";
import { isDevMode } from "@/config/integrations";
import { ADMISSION_STEP } from "@/config/program";
import { process } from "@/content/carreras-creativas";
import { cn } from "@/lib/cn";
import { confirmable } from "@/lib/confirmable";

/**
 * Proceso: video → ruta → llamada. El paso de admisión sólo aparece
 * cuando ADMISSION_STEP está confirmado (en desarrollo se ve como pendiente).
 */
export function Process() {
  const admission = confirmable(ADMISSION_STEP);
  const steps: { title: string; detail: React.ReactNode }[] = [...process.steps];

  if (admission.confirmed) {
    steps.push({ title: process.admissionTitle, detail: admission.value });
  } else if (isDevMode) {
    steps.push({
      title: process.admissionTitle,
      detail: <DevTag>Sólo si se confirma · {admission.raw}</DevTag>,
    });
  }

  return (
    <Section tone="blush" labelledBy="proceso-title">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Heading id="proceso-title" className="text-plum lg:col-span-7">
            {process.title}
          </Heading>
          <Lead className="lg:col-span-5 lg:pb-2">{process.body}</Lead>
        </Reveal>

        <ol
          className={cn(
            "mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:gap-8",
            steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
          )}
        >
          {steps.map((step, index) => (
            <li key={step.title} className="border-t-4 border-plum pt-6">
              <span aria-hidden="true" className="display block text-[4rem] leading-none text-plum sm:text-[5rem]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-[1.375rem] font-bold leading-tight text-plum sm:text-[1.5rem]">
                {step.title}
              </h3>
              <div className="mt-3 text-lg">{step.detail}</div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
