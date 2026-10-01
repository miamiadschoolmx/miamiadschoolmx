import { Container } from "@/components/ui/Container";
import { PendingValue } from "@/components/ui/DevTag";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Heading, Lead } from "@/components/ui/Typography";
import { isDevMode } from "@/config/integrations";
import { PROGRAM_DURATION } from "@/config/program";
import { routes } from "@/content/carreras-creativas";
import { confirmable } from "@/lib/confirmable";

/** Rutas: dos columnas paritarias, sin diferencias curriculares. */
export function Routes() {
  const duration = confirmable(PROGRAM_DURATION);
  const showDuration = duration.confirmed || isDevMode;

  return (
    <Section tone="plum" labelledBy="rutas-title">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Heading id="rutas-title" className="lg:col-span-7">
            {routes.title}
          </Heading>
          <div className="lg:col-span-5 lg:pb-2">
            <Lead>{routes.body}</Lead>
            {showDuration && (
              <p className="mt-5 text-lg font-semibold text-blush">
                {routes.durationLabel}:{" "}
                {duration.confirmed ? duration.value : <PendingValue value={duration.value} />}
              </p>
            )}
          </div>
        </Reveal>

        <ul className="mt-14 grid border-t-2 border-paper/30 sm:grid-cols-2 lg:mt-20">
          {routes.items.map((route) => (
            <li
              key={route.name}
              className="border-b-2 border-paper/30 py-10 sm:border-b-0 sm:py-14 sm:pr-8 sm:even:border-l-2 sm:even:pl-8 sm:even:pr-0 lg:py-20 lg:pr-12 lg:even:pl-12"
            >
              <h3 className="display text-[clamp(3rem,1.4rem+5.4vw,7.25rem)] leading-[0.88]">
                {route.name}
              </h3>
              <p className="mt-6 text-lead text-blush">{route.note}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
