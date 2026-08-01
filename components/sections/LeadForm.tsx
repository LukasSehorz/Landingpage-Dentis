"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@/components/ui/icons";
import { prewarmCalendlyWidget } from "@/components/sections/CalendlySection";

/* ------------------------------------------------------------------ */
/* Question config — copy 1:1 from the content deck                    */
/* ------------------------------------------------------------------ */

export const TOTAL_STEPS = 2;

const step1 = {
  label: "Schritt 1 / 2 · Ihre Praxis",
  title: "Kurz zu Ihrer Praxis",
  questions: [
    {
      name: "schwerpunkt",
      q: "Bieten Sie feste Zähne, All-on-X oder umfangreiche Implantatversorgungen an?",
      options: ["Ja, Schwerpunkt", "Teilweise", "Nein"],
    },
    {
      name: "behandler",
      q: "Wie viele Behandler arbeiten in Ihrer Praxis?",
      options: ["1", "2–3", "4+"],
    },
  ],
} as const;

const channelOptions = [
  "Empfehlungen",
  "Überweisungen",
  "Website / Google (organisch)",
  "Google Ads",
  "Social Media",
  "Bewertungsportale",
  "Aktuell kein aktives Marketing",
] as const;

const step2 = {
  label: "Schritt 2 / 2 · Situation & Budget",
  title: "Ihre aktuelle Situation",
  questions: [
    {
      name: "herausforderung",
      q: "Was ist aktuell Ihre größte Herausforderung bei der Patientengewinnung?",
      options: [
        "Zu wenige Anfragen",
        "Anfragen, aber die falschen",
        "Kein planbarer Zulauf",
        "Abhängig von Empfehlungen",
        "Zeit fürs Marketing",
      ],
    },
    {
      name: "beratungen",
      q: "Wie viele zusätzliche Implantatberatungen können Sie monatlich annehmen?",
      options: ["unter 5", "5–10", "10+"],
    },
    {
      name: "budget",
      q: "Mögliches monatliches Patienten-Werbebudget?",
      options: ["unter 2.500 €", "2.500–4.000 €", "4.000 €+"],
    },
    {
      name: "rolle",
      q: "Ihre Rolle in der Praxis?",
      options: ["Inhaber / Geschäftsführer", "Praxismanagement", "Angestellt"],
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Werte + Zusammenfassung für Calendly (a1)                           */
/* ------------------------------------------------------------------ */

type Choices = Record<string, string>;

export type LeadFormValues = {
  /** Einfachauswahl-Fragen (schwerpunkt, behandler, herausforderung, …) */
  choices: Choices;
  /** Mehrfachauswahl "Wie gewinnen Sie aktuell neue Patienten?" */
  channels: string[];
  /** Optionale Freitextangabe */
  website: string;
};

export const emptyLeadFormValues: LeadFormValues = {
  choices: {},
  channels: [],
  website: "",
};

/**
 * Reihenfolge und Beschriftung der Zusammenfassung, die als `a1` an Calendly
 * übergeben wird. Format: "Label: Wert" mit " | " getrennt,
 * Mehrfachauswahlen mit ", " verbunden, leere Felder werden weggelassen.
 */
const SUMMARY_FIELDS: {
  label: string;
  value: (v: LeadFormValues) => string;
}[] = [
  { label: "Website", value: (v) => v.website },
  { label: "Implantat-Schwerpunkt", value: (v) => v.choices.schwerpunkt ?? "" },
  { label: "Behandler", value: (v) => v.choices.behandler ?? "" },
  { label: "Patientengewinnung", value: (v) => v.channels.join(", ") },
  {
    label: "Größte Herausforderung",
    value: (v) => v.choices.herausforderung ?? "",
  },
  { label: "Beratungen/Monat", value: (v) => v.choices.beratungen ?? "" },
  { label: "Werbebudget", value: (v) => v.choices.budget ?? "" },
  { label: "Rolle", value: (v) => v.choices.rolle ?? "" },
];

export function buildAnswerSummary(values: LeadFormValues): string {
  return SUMMARY_FIELDS.map((f) => ({
    label: f.label,
    value: f.value(values).trim(),
  }))
    .filter((f) => f.value.length > 0)
    .map((f) => `${f.label}: ${f.value}`)
    .join(" | ");
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function Stepper({ step }: { step: number }) {
  return (
    <div className="mb-8 flex items-center gap-2" aria-hidden>
      {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => (
        <div
          key={n}
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
        >
          <motion.div
            className="h-full rounded-full bg-teal"
            initial={false}
            animate={{ width: step >= n ? "100%" : "0%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      ))}
    </div>
  );
}

function ChipGroup({
  q,
  options,
  value,
  onChange,
  error,
}: {
  q: string;
  options: readonly string[];
  value?: string;
  onChange: (v: string) => void;
  error?: boolean;
}) {
  return (
    <fieldset className="mt-6 first:mt-0">
      <legend className="text-[15px] font-semibold text-navy">{q}</legend>
      <div
        role="radiogroup"
        aria-label={q}
        className="mt-3 flex flex-wrap gap-2.5"
      >
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt)}
              className={`rounded-full border px-4 py-2.5 text-[14px] font-medium transition-all duration-150 ${
                active
                  ? "border-navy bg-navy text-white shadow-soft"
                  : "border-line bg-base text-ink hover:border-navy/40 hover:bg-cream/60"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-2 text-[13px] text-amber-700">
          Bitte wählen Sie eine Option aus.
        </p>
      )}
    </fieldset>
  );
}

function MultiChipGroup({
  q,
  hint,
  options,
  values,
  onToggle,
  error,
}: {
  q: string;
  hint?: string;
  options: readonly string[];
  values: string[];
  onToggle: (v: string) => void;
  error?: boolean;
}) {
  return (
    <fieldset className="mt-6 first:mt-0">
      <legend className="text-[15px] font-semibold text-navy">{q}</legend>
      {hint && <p className="mt-1 text-[13px] text-ink/70">{hint}</p>}
      <div aria-label={q} className="mt-3 flex flex-wrap gap-2.5">
        {options.map((opt) => {
          const active = values.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(opt)}
              className={`rounded-full border px-4 py-2.5 text-[14px] font-medium transition-all duration-150 ${
                active
                  ? "border-navy bg-navy text-white shadow-soft"
                  : "border-line bg-base text-ink hover:border-navy/40 hover:bg-cream/60"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-2 text-[13px] text-amber-700">
          Bitte wählen Sie mindestens eine Option aus.
        </p>
      )}
    </fieldset>
  );
}

function TextField({
  label,
  name,
  type = "text",
  value,
  onChange,
  helper,
  placeholder,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  helper?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "url";
}) {
  return (
    <div className="mt-6">
      <label htmlFor={name} className="text-[15px] font-semibold text-navy">
        {label}
      </label>
      {helper && <p className="mt-1 text-[13px] text-ink/70">{helper}</p>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="mt-2 w-full rounded-xl border border-line bg-base px-4 py-3 text-base text-navy outline-none transition-colors placeholder:text-ink/40 focus:border-teal sm:text-[15px]"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main form                                                           */
/* ------------------------------------------------------------------ */

export default function LeadForm({
  initialValues = emptyLeadFormValues,
  initialStep = 1,
  onSubmit,
}: {
  initialValues?: LeadFormValues;
  initialStep?: number;
  /** Übergibt die gesammelten Antworten an die Elternkomponente — es wird
   *  bewusst NICHTS an einen Server gesendet. */
  onSubmit: (values: LeadFormValues) => void;
}) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(initialStep);
  const [choices, setChoices] = useState<Choices>(initialValues.choices);
  const [channels, setChannels] = useState<string[]>(initialValues.channels);
  const [website, setWebsite] = useState(initialValues.website);
  const [channelError, setChannelError] = useState(false);
  const [choiceErrors, setChoiceErrors] = useState<Record<string, boolean>>({});
  const cardRef = useRef<HTMLDivElement | null>(null);

  /* Widget vorwärmen, sobald der Nutzer in die Nähe des Formulars scrollt —
     dann steht der Kalender nach dem Absenden sofort. */
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          prewarmCalendlyWidget();
          obs.disconnect();
        }
      },
      { rootMargin: "400px 0px 400px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const setChoice = (name: string, v: string) => {
    setChoices((c) => ({ ...c, [name]: v }));
    setChoiceErrors((e) => ({ ...e, [name]: false }));
  };
  const toggleChannel = (opt: string) => {
    setChannels((prev) =>
      prev.includes(opt) ? prev.filter((c) => c !== opt) : [...prev, opt],
    );
    setChannelError(false);
  };

  const validateStep = (s: number): boolean => {
    const qs = s === 1 ? step1.questions : step2.questions;
    const errs: Record<string, boolean> = {};
    qs.forEach((q) => {
      if (!choices[q.name]) errs[q.name] = true;
    });
    setChoiceErrors((e) => ({ ...e, ...errs }));
    let ok = Object.keys(errs).length === 0;
    /* Die Mehrfachauswahl "Patientengewinnung" steht in Schritt 1. */
    if (s === 1 && channels.length === 0) {
      setChannelError(true);
      ok = false;
    }
    return ok;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(TOTAL_STEPS)) return;
    /* Kein Backend, kein fetch: die Antworten wandern ausschließlich als
       Zusammenfassung in die Calendly-URL. */
    onSubmit({ choices, channels, website: website.trim() });
  };

  /* `animate` must ALWAYS be passed: the server renders the `initial`
     (hidden) styles into the HTML, so omitting `animate` under reduced
     motion would leave the step invisible forever. */
  const motionProps = {
    initial: reduce ? false : ({ opacity: 0, x: 24 } as const),
    animate: { opacity: 1, x: 0 },
    exit: reduce ? undefined : ({ opacity: 0, x: -24 } as const),
    transition: {
      duration: reduce ? 0 : 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  return (
    <div
      ref={cardRef}
      className="rounded-card border border-line bg-base p-6 shadow-card md:p-9"
    >
      <Stepper step={step} />

      <form onSubmit={submit} noValidate>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" {...motionProps}>
              <p className="eyebrow text-teal-600">{step1.label}</p>
              <h3 className="mt-2 font-serif text-[24px] text-navy">
                {step1.title}
              </h3>
              {step1.questions.map((q) => (
                <ChipGroup
                  key={q.name}
                  q={q.q}
                  options={q.options}
                  value={choices[q.name]}
                  onChange={(v) => setChoice(q.name, v)}
                  error={choiceErrors[q.name]}
                />
              ))}
              <MultiChipGroup
                q="Wie gewinnen Sie aktuell neue Patienten?"
                hint="Mehrfachauswahl möglich."
                options={channelOptions}
                values={channels}
                onToggle={toggleChannel}
                error={channelError}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" {...motionProps}>
              <p className="eyebrow text-teal-600">{step2.label}</p>
              <h3 className="mt-2 font-serif text-[24px] text-navy">
                {step2.title}
              </h3>
              {step2.questions.map((q) => (
                <ChipGroup
                  key={q.name}
                  q={q.q}
                  options={q.options}
                  value={choices[q.name]}
                  onChange={(v) => setChoice(q.name, v)}
                  error={choiceErrors[q.name]}
                />
              ))}

              <TextField
                label="Website Ihrer Praxis"
                name="website"
                type="url"
                inputMode="url"
                autoComplete="url"
                helper="Optional — damit wir Ihren Standort vorab einschätzen können."
                placeholder="https://ihre-praxis.de"
                value={website}
                onChange={setWebsite}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={back}
              className="text-[14px] font-semibold text-ink/70 transition-colors hover:text-navy"
            >
              ← Zurück
            </button>
          ) : (
            <span />
          )}

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={next}
              className="group inline-flex items-center gap-2.5 rounded-full bg-navy px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-navy-700"
            >
              Weiter
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </button>
          ) : (
            <button
              type="submit"
              className="group inline-flex items-center gap-2.5 rounded-full bg-amber px-6 py-3.5 text-[15px] font-semibold text-white shadow-cta transition-colors hover:bg-amber-600"
            >
              Kostenlose Potenzial-Analyse anfragen
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </button>
          )}
        </div>

        {step === TOTAL_STEPS && (
          <p className="mt-4 text-[13px] text-ink/65">
            Im nächsten Schritt wählen Sie direkt Ihren Wunschtermin ·
            Kostenlos &amp; unverbindlich
          </p>
        )}
      </form>
    </div>
  );
}
