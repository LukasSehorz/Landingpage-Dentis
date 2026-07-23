"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionCta from "@/components/ui/SectionCta";
import { Plus } from "@/components/ui/icons";

type Item = {
  q: React.ReactNode;
  a: React.ReactNode;
  note?: string;
};

const items: Item[] = [
  {
    q: "Was kostet die Zusammenarbeit?",
    a: "Das legen wir gemeinsam im Erstgespräch fest, abgestimmt auf Umfang und Ziele Ihrer Praxis. Das Werbebudget für Meta und Google (ab ca. 2.500–4.000 €/Monat) kommt separat hinzu und fließt direkt an die Plattformen, nicht an uns.",
  },
  {
    q: "Lohnt sich das für meine Praxis?",
    a: "Eine umfangreiche Implantatbehandlung bringt häufig zwischen 8.000 und über 20.000 € Umsatz. Bereits ein bis zwei zusätzliche Fälle refinanzieren in der Regel Honorar und Werbebudget.",
  },
  {
    q: "Wie schnell sehen wir erste Anfragen?",
    a: "Nach sauberem Kampagnenstart laufen die Anzeigen meist innerhalb weniger Tage; erste Anfragen entstehen in der Regel in den ersten Wochen. Eine belastbare Bewertung ergibt sich über die ersten Wochen hinweg.",
  },
  {
    q: "Brauchen wir eine eigene Website?",
    a: "Nein. Für den Start genügt unsere spezialisierte Landingpage. Auf Wunsch optimieren wir Ihre Website oder erstellen eine neue.",
  },
  {
    q: "Wie stellt ihr die Qualität der Anfragen sicher?",
    a: "Durch mehrstufige Vorqualifizierung (Einzugsgebiet, Behandlungswunsch, Zeitfenster, verifizierte Telefonnummer) und enge Betreuung. Konkrete Ziele legen wir gemeinsam transparent im Erstgespräch fest.",
  },
  {
    q: "Ist das rechtlich sauber?",
    a: "Ja. Wir arbeiten konform mit dem Heilmittelwerbegesetz und der DSGVO, inklusive korrekter Einwilligung bei der Datenerhebung.",
  },
  {
    q: "Bindet ihr uns langfristig?",
    a: "Nein. Faire Laufzeiten, keine Knebelverträge. Wir setzen darauf, durch Ergebnisse zu überzeugen.",
  },
  {
    q: "Arbeitet ihr mit mehreren Praxen in meiner Region?",
    a: "Pro Einzugsgebiet arbeiten wir mit einer begrenzten Anzahl an Praxen, damit sich die Anfragen nicht gegenseitig verwässern.",
  },
];

function AccordionRow({ item, index }: { item: Item; index: number }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = `faq-panel-${index}`;

  return (
    <div className="rounded-card border border-line bg-base shadow-soft">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="font-serif text-[19px] leading-snug text-navy">
            {item.q}
          </span>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-navy transition-transform duration-300 ${
              open ? "rotate-45 bg-navy text-white" : "bg-base"
            }`}
          >
            <Plus className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <p className="max-w-2xl text-[15.5px] leading-relaxed text-ink">
                {item.a}
              </p>
              {item.note && (
                <p className="mt-3 rounded-md border border-dashed border-line bg-cream px-3 py-2 font-mono text-[12px] text-ink/60">
                  {item.note}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  return (
    <section className="section-pad border-t border-line bg-base">
      <div className="container-page">
        <SectionHeading index="06" eyebrow="Einwand-Behandlung" title="Häufige Fragen" />
        <div className="mt-10 grid gap-3.5">
          {items.map((item, i) => (
            <AccordionRow key={i} item={item} index={i} />
          ))}
        </div>

        <SectionCta text="Noch eine Frage offen? Die klären wir am schnellsten direkt, im kostenlosen Erstgespräch mit ehrlicher Einschätzung für Ihren Standort." />
      </div>
    </section>
  );
}
