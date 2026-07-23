import LeadForm from "./LeadForm";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { Check } from "@/components/ui/icons";

const reassure = [
  "Kostenlose Standort- & Marktanalyse für Ihr Einzugsgebiet.",
  "Kostenloser Website- und SEO-Check Ihrer Praxis.",
  "Ehrliche Einschätzung, auch wenn sie gegen uns spricht.",
  "Antwort innerhalb von 24 Stunden.",
];

export default function FormSection() {
  return (
    <section
      id="formular"
      className="scroll-mt-24 border-t border-line bg-mist py-20 md:py-28"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          {/* Heading column */}
          <div className="lg:pt-4">
            <Reveal>
              <Eyebrow tone="amber">Kostenlose Potenzial-Analyse</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-serif text-[clamp(28px,3.6vw,44px)] leading-[1.1] text-navy">
                In 2 Minuten prüfen, ob es zu Ihrer Praxis passt.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink">
                Beantworten Sie ein paar kurze Fragen, wir melden uns mit einer
                ehrlichen Einschätzung für Ihren Standort.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-3">
                {reassure.map((r) => (
                  <li key={r} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber/15">
                      <Check className="h-3.5 w-3.5 text-amber" />
                    </span>
                    <span className="text-[16px] text-ink">{r}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal delay={0.1} y={16}>
            <LeadForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
