"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "@/components/ui/icons";
import { prefillCalendly } from "@/components/sections/CalendlySection";

/* ------------------------------------------------------------------ */
/* Question config — copy 1:1 from the content deck                    */
/* ------------------------------------------------------------------ */

const step1 = {
  label: "Schritt 1 / 3 · Ihre Praxis",
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
  label: "Schritt 2 / 3 · Situation & Budget",
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

type Choices = Record<string, string>;
type Contact = {
  website: string;
  name: string;
  email: string;
  telefon: string;
  consent: boolean;
};

const emptyContact: Contact = {
  website: "",
  name: "",
  email: "",
  telefon: "",
  consent: false,
};

/* Fit logic — the "Nicht-Fit"-state from the content deck */
function isFit(c: Choices): boolean {
  if (c.schwerpunkt === "Nein") return false;
  if (c.beratungen === "unter 5") return false;
  if (c.budget === "unter 2.500 €") return false;
  return true;
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function Stepper({ step }: { step: number }) {
  return (
    <div className="mb-8 flex items-center gap-2" aria-hidden>
      {[1, 2, 3].map((n) => (
        <div key={n} className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
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
  name,
  options,
  value,
  onChange,
  error,
}: {
  q: string;
  name: string;
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
  error,
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
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "url";
}) {
  return (
    <div className="mt-5 first:mt-0">
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
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`mt-2 w-full rounded-xl border bg-base px-4 py-3 text-base text-navy outline-none transition-colors placeholder:text-ink/40 sm:text-[15px] ${
          error
            ? "border-amber focus:border-amber"
            : "border-line focus:border-teal"
        }`}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-[13px] text-amber-700">
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main form                                                           */
/* ------------------------------------------------------------------ */

export default function LeadForm() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(1);
  const [choices, setChoices] = useState<Choices>({});
  const [channels, setChannels] = useState<string[]>([]);
  const [channelError, setChannelError] = useState(false);
  const [contact, setContact] = useState<Contact>(emptyContact);
  const [choiceErrors, setChoiceErrors] = useState<Record<string, boolean>>({});
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<null | "fit" | "nofit">(null);

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
  const setField = (name: keyof Contact, v: string | boolean) => {
    setContact((c) => ({ ...c, [name]: v }));
    setContactErrors((e) => ({ ...e, [name]: "" }));
  };

  const validateStep = (s: number): boolean => {
    if (s === 1 || s === 2) {
      const qs = s === 1 ? step1.questions : step2.questions;
      const errs: Record<string, boolean> = {};
      qs.forEach((q) => {
        if (!choices[q.name]) errs[q.name] = true;
      });
      setChoiceErrors((e) => ({ ...e, ...errs }));
      let ok = Object.keys(errs).length === 0;
      if (s === 1 && channels.length === 0) {
        setChannelError(true);
        ok = false;
      }
      return ok;
    }
    // step 3
    const errs: Record<string, string> = {};
    if (!contact.name.trim()) errs.name = "Bitte geben Sie Ihren Namen an.";
    if (!contact.email.trim()) {
      errs.email = "Bitte geben Sie Ihre E-Mail-Adresse an.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      errs.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    }
    if (!contact.telefon.trim()) {
      errs.telefon = "Bitte geben Sie Ihre Telefonnummer an.";
    }
    if (!contact.consent) {
      errs.consent = "Bitte stimmen Sie der Datenschutzerklärung zu.";
    }
    setContactErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(3, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    const fit = isFit(choices);
    setSubmitted(fit ? "fit" : "nofit");
    if (typeof window === "undefined") return;
    /* Bewusst OHNE Vorfilterung: solange die Auslastung es zulässt, darf jede
       Anfrage buchen — auch die als nicht ideal eingestufte. Erst bei zu hohem
       Andrang wieder auf `fit` einschränken. */
    prefillCalendly(contact.name.trim(), contact.email.trim());
  };

  /* `animate` must ALWAYS be passed: the server renders the `initial`
     (hidden) styles into the HTML, so omitting `animate` under reduced
     motion would leave the step invisible forever. */
  const motionProps = {
    initial: reduce ? false : ({ opacity: 0, x: 24 } as const),
    animate: { opacity: 1, x: 0 },
    exit: reduce ? undefined : ({ opacity: 0, x: -24 } as const),
    transition: { duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] as const },
  };

  /* -------------------- Post-submit states -------------------- */
  if (submitted) return <PostSubmit variant={submitted} />;

  /* -------------------- Form -------------------- */
  return (
    <div className="rounded-card border border-line bg-base p-6 shadow-card md:p-9">
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
                  name={q.name}
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
                  name={q.name}
                  options={q.options}
                  value={choices[q.name]}
                  onChange={(v) => setChoice(q.name, v)}
                  error={choiceErrors[q.name]}
                />
              ))}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" {...motionProps}>
              <p className="eyebrow text-teal-600">Schritt 3 / 3 · Kontakt</p>
              <h3 className="mt-2 font-serif text-[24px] text-navy">
                Wohin dürfen wir unsere Einschätzung senden?
              </h3>

              <TextField
                label="Website Ihrer Praxis"
                name="website"
                type="url"
                inputMode="url"
                autoComplete="url"
                helper="Damit wir Ihren Standort vorab einschätzen können."
                placeholder="https://ihre-praxis.de"
                value={contact.website}
                onChange={(v) => setField("website", v)}
              />
              <TextField
                label="Name"
                name="name"
                autoComplete="name"
                value={contact.name}
                onChange={(v) => setField("name", v)}
                error={contactErrors.name}
              />
              <TextField
                label="Geschäftliche E-Mail-Adresse"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={contact.email}
                onChange={(v) => setField("email", v)}
                error={contactErrors.email}
              />
              <TextField
                label="Telefonnummer"
                name="telefon"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                helper="Für einen kurzen, unverbindlichen Rückruf, kein automatisches Callcenter."
                value={contact.telefon}
                onChange={(v) => setField("telefon", v)}
                error={contactErrors.telefon}
              />

              <div className="mt-6">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={contact.consent}
                    onChange={(e) => setField("consent", e.target.checked)}
                    aria-invalid={!!contactErrors.consent}
                    className="mt-0.5 h-5 w-5 shrink-0 rounded border-line accent-teal-600"
                  />
                  <span className="text-[14.5px] leading-snug text-ink">
                    Ich habe die{" "}
                    <a
                      href="/datenschutz"
                      target="_blank"
                      rel="noopener"
                      className="font-medium text-amber underline"
                    >
                      Datenschutzerklärung
                    </a>{" "}
                    gelesen und willige in die Verarbeitung meiner Angaben zur
                    Bearbeitung meiner Anfrage ein.
                  </span>
                </label>
                {contactErrors.consent && (
                  <p className="mt-1.5 text-[13px] text-amber-700">
                    {contactErrors.consent}
                  </p>
                )}
              </div>
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

          {step < 3 ? (
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

        {step === 3 && (
          <p className="mt-4 text-[13px] text-ink/65">
            Unverbindlich · Keine Weitergabe Ihrer Daten · Antwort innerhalb von
            24 Stunden
          </p>
        )}
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section 12 — after submit                                           */
/* ------------------------------------------------------------------ */

function PostSubmit({ variant }: { variant: "fit" | "nofit" }) {
  if (variant === "nofit") {
    return (
      <div className="rounded-card border border-line bg-base p-8 shadow-card md:p-10">
        <p className="eyebrow text-ink/50">Danke für Ihre Anfrage</p>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-navy">
          Danke für Ihre Zeit. Unser System spielt seine Stärken vor allem bei
          Praxen mit klarem Implantat-Schwerpunkt und freien Kapazitäten aus.
          Buchen Sie sich unten dennoch gern einen Termin — wir sagen Ihnen im
          Gespräch offen, ob sich der Einsatz für Sie lohnt.
        </p>

        <a
          href="#termin"
          className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-amber px-6 py-3.5 text-[15px] font-semibold text-white shadow-cta transition-colors hover:bg-amber-600"
        >
          Wunschtermin im Kalender wählen
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-teal/25 bg-base p-8 shadow-card md:p-10">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/15">
        <Check className="h-6 w-6 text-success" />
      </span>
      <h3 className="mt-5 font-serif text-[clamp(24px,3vw,34px)] leading-tight text-navy">
        Passt. Buchen Sie direkt Ihr kostenloses Erstgespräch.
      </h3>
      <p className="mt-4 max-w-2xl text-[16.5px] leading-relaxed text-ink">
        In 15 Minuten zeigen wir Ihnen konkret, wie wir für Ihre Praxis planbar
        qualifizierte Implantat-Patientenanfragen gewinnen würden. Ehrliche
        Einschätzung, kein Verkaufsdruck.
      </p>

      {/* Kalender: eigene Section direkt unterhalb des Formulars */}
      <a
        href="#termin"
        className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-amber px-6 py-3.5 text-[15px] font-semibold text-white shadow-cta transition-colors hover:bg-amber-600"
      >
        Wunschtermin im Kalender wählen
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </a>
      <p className="mt-3 text-[13.5px] text-ink/65">
        Ihr Kalender ist direkt unterhalb geöffnet, Name und E-Mail sind bereits
        vorausgefüllt.
      </p>
    </div>
  );
}
