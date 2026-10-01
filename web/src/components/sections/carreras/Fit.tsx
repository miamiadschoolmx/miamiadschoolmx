import { BookingCta } from "@/components/conversion/Ctas";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Heading, Lead } from "@/components/ui/Typography";
import { fit } from "@/content/carreras-creativas";
import { cn } from "@/lib/cn";

function FitColumn({
  title,
  items,
  marker,
  className,
}: {
  title: string;
  items: string[];
  marker: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="display text-h3">{title}</h3>
      <ul className="mt-6 border-t-2 border-paper/30">
        {items.map((item) => (
          <li key={item} className="flex gap-4 border-b-2 border-paper/30 py-4 text-lg leading-snug sm:text-xl">
            <span aria-hidden="true" className="display w-4 shrink-0 text-magenta">
              {marker}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Fit: filtro honesto + CTA de alta intención hacia /agenda. */
export function Fit() {
  return (
    <Section tone="ink" labelledBy="fit-title">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Heading id="fit-title" className="lg:col-span-7">
            {fit.title}
          </Heading>
          <Lead className="lg:col-span-5 lg:pb-2">{fit.body}</Lead>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-0 lg:mt-20">
          <FitColumn title={fit.yes.title} items={fit.yes.items} marker="+" className="md:pr-10 lg:pr-14" />
          <FitColumn
            title={fit.no.title}
            items={fit.no.items}
            marker="–"
            className={cn("md:border-l-2 md:border-paper/30 md:pl-10 lg:pl-14")}
          />
        </div>

        <div className="mt-12 lg:mt-16">
          <BookingCta location="fit" variant="outline" surface="dark" />
        </div>
      </Container>
    </Section>
  );
}
