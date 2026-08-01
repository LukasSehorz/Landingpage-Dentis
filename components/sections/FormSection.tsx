"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import LeadForm, {
  TOTAL_STEPS,
  buildAnswerSummary,
  emptyLeadFormValues,
  type LeadFormValues,
} from "./LeadForm";
import CalendlySection from "./CalendlySection";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { Check } from "@/components/ui/icons";

const reassure = [
  "Kostenlose Standort- & Marktanalyse für Ihr Einzugsgebiet.",
  "Kostenloser Website- und SEO-Check Ihrer Praxis.",
  "Ehrliche Einschätzung, auch wenn sie gegen uns spricht.",
  "Termin direkt im Anschluss selbst wählen.",
];

/**
 * Ein einziger, linearer Weg: kurze Qualifizierungsfragen → Absenden →
 * Kalender. Der Kalender wird erst nach dem Absenden gerendert; Kontaktdaten
 * gibt der Besucher ausschließlich in Calendly ein.
 */
export default function FormSection() {
  const reduce = useReducedMotion();
  const [values, setValues] = useState<LeadFormValues>(emptyLeadFormValues);
  const [submitted, setSubmitted] = useState(false);
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);

  const formRef = useRef<HTMLDivElement | null>(null);
  const bookingRef = useRef<HTMLDivElement | null>(null);
  const didMount = useRef(false);
  const reduceRef = useRef<boolean | null>(reduce);
  reduceRef.current = reduce;

  const summary = useMemo(() => buildAnswerSummary(values), [values]);

  const handleSubmit = useCallback((next: LeadFormValues) => {
    setValues(next);
    setHasSubmittedOnce(true);
    setSubmitted(true);
  }, []);

  const handleEdit = useCallback(() => setSubmitted(false), []);

  /* Nach dem Umschalten sanft zum jeweils aktiven Block scrollen.
     Läuft im Effect (nicht im Handler), damit das Ziel garantiert im DOM ist. */
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const target = submitted ? bookingRef.current : formRef.current;
    target?.scrollIntoView({
      behavior: reduceRef.current ? "auto" : "smooth",
      block: "start",
    });
  }, [submitted]);

  return (
    <section
      id="formular"
      className="scroll-mt-24 border-t border-line bg-mist py-20 md:py-28"
    >
      <div className="container-page">
        {submitted ? (
          /* ---------- Nach dem Absenden: Bestätigung + Kalender ---------- */
          <div
            ref={bookingRef}
            className="mx-auto w-full max-w-[900px] scroll-mt-24"
          >
            <div className="rounded-card border border-line bg-base p-6 shadow-card md:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/15">
                  <Check className="h-5 w-5 text-success" />
                </span>
                <div>
                  <p className="font-serif text-[19px] leading-snug text-navy md:text-[21px]">
                    Ihre Angaben sind gespeichert — wählen Sie jetzt Ihren
                    Wunschtermin.
                  </p>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="mt-3 text-[14px] font-semibold text-ink/70 underline-offset-4 transition-colors hover:text-navy hover:underline"
                  >
                    ← Angaben ändern
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <CalendlySection a1={summary} />
            </div>
          </div>
        ) : (
          /* ---------- Vor dem Absenden: nur das Formular ---------- */
          <div
            ref={formRef}
            className="grid scroll-mt-24 gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14"
          >
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
                  Beantworten Sie ein paar kurze Fragen — im Anschluss wählen
                  Sie direkt Ihren Wunschtermin für die kostenlose
                  Potenzial-Analyse.
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
              <LeadForm
                initialValues={values}
                initialStep={hasSubmittedOnce ? TOTAL_STEPS : 1}
                onSubmit={handleSubmit}
              />
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
