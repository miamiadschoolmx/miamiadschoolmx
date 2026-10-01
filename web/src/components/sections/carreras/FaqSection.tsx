import { WhatsAppLink } from "@/components/conversion/WhatsApp";
import { Faq } from "@/components/editorial/Faq";
import { Container } from "@/components/ui/Container";
import { PendingValue } from "@/components/ui/DevTag";
import { Section } from "@/components/ui/Section";
import { Heading, Lead } from "@/components/ui/Typography";
import { isDevMode } from "@/config/integrations";
import { PROGRAM_DURATION, PROGRAM_MODALITY } from "@/config/program";
import { faq, type FaqItem } from "@/content/carreras-creativas";
import { confirmable, type Confirmable } from "@/lib/confirmable";

const tokens: Record<string, Confirmable> = {
  "{duration}": confirmable(PROGRAM_DURATION),
  "{modality}": confirmable(PROGRAM_MODALITY),
};

/**
 * Sustituye {duration}/{modality}. Si el dato no está confirmado:
 * desarrollo → se marca como pendiente; producción → respuesta alternativa.
 */
function renderAnswer(item: FaqItem): React.ReactNode {
  const used = Object.keys(tokens).filter((t) => item.answer.includes(t));
  const unconfirmed = used.some((t) => !tokens[t].confirmed);

  if (unconfirmed && !isDevMode) return item.fallback ?? item.answer;

  const parts = item.answer.split(/(\{duration\}|\{modality\})/g);
  return parts.map((part, i) => {
    const token = tokens[part];
    if (!token) return part;
    return token.confirmed ? token.value : <PendingValue key={i} value={token.value} />;
  });
}

export function FaqSection() {
  return (
    <Section tone="paper" labelledBy="faq-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-10">
            <Heading id="faq-title">{faq.title}</Heading>
            <Lead className="mt-6">{faq.body}</Lead>
            <p className="mt-6">
              <WhatsAppLink
                location="faq"
                className="inline-flex min-h-11 items-center text-lg font-semibold underline underline-offset-4 hover:text-plum"
              >
                {faq.whatsappPrompt}
              </WhatsAppLink>
            </p>
          </div>
        </div>
        <Faq
          className="lg:col-span-7"
          items={faq.items.map((item) => ({
            question: item.question,
            answer: renderAnswer(item),
          }))}
        />
      </Container>
    </Section>
  );
}
