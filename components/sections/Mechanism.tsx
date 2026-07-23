import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { Plus } from "@/components/ui/icons";

const steps = [
  {
    title: "Kostenlose Potenzial-Analyse",
    body: "Wir schauen uns Ihre Praxis, Ihr Einzugsgebiet und Ihr Ziel an, inklusive kostenlosem Website- und SEO-Check, und sagen ehrlich, ob und wie wir für Sie planbar Patienten gewinnen können. Völlig unverbindlich.",
  },
  {
    title: "Onboarding-Call",
    body: "Stimmen beide Seiten einer Zusammenarbeit zu, arbeiten wir Ihre konkreten Angebote und Wunschpatienten heraus: wo Sie heute stehen und wo Sie hinwollen.",
  },
  {
    title: "Kampagne erstellen & Live-Gang",
    body: "Wir bauen Anzeigen, Landingpage und Technik komplett auf und bringen Ihre Kampagne live. Sie müssen nichts selbst aufsetzen.",
  },
  {
    title: "Laufende Optimierung & Betreuung",
    body: "Wir betreuen und optimieren fortlaufend, damit Ihre Anfragen planbar und in gleichbleibender Qualität kommen.",
  },
];

const optionals = [
  {
    title: "Automatische Terminbuchung",
    sub: "Kalender-Integration, Patienten buchen direkt einen Termin.",
  },
  {
    title: "Voice-Agent",
    sub: "Neue Anfragen werden sofort automatisch angerufen und zum Termin geführt, rund um die Uhr, ohne zusätzliche Praxiskraft.",
  },
  {
    title: "Automatische Erinnerungen & Follow-up",
    sub: "Vor jedem Termin eine Erinnerung, danach automatisches Nachfassen, per E-Mail und SMS, für weniger Ausfälle.",
  },
  {
    title: "Neue oder optimierte Website",
    sub: "Auf Wunsch komplett neu oder überarbeitet.",
  },
  {
    title: "CRM- & Lead-Management",
    sub: "Alle Anfragen sauber und nachverfolgbar an einem Ort.",
  },
  {
    title: "Reaktivierung Ihrer Bestandspatienten",
    sub: "Bestehende Kartei gezielt für neue Fälle nutzen.",
  },
  {
    title: "Google-Bewertungen & Reputation",
    sub: "Mehr Vertrauen und bessere Sichtbarkeit vor Ort.",
  },
  {
    title: "Corporate LLM & Wissensmanagement",
    sub: "Das gesamte Wissen Ihrer Praxis DSGVO-konform gespeichert und per KI jederzeit abrufbar.",
  },
];

export default function Mechanism() {
  return (
    <section className="section-pad border-t border-line bg-mist">
      <div className="container-page">
        <SectionHeading
          index="02"
          eyebrow="Ablauf · So läuft die Zusammenarbeit"
          title="Ein spezialisiertes System statt Zufallstreffer."
          intro="Von der ersten Analyse bis zur laufenden Betreuung, in vier klaren Schritten."
        />

        <ol className="mt-12 grid gap-y-2 md:gap-y-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.05}>
              <div className="group relative flex gap-5 rounded-card border border-transparent p-4 transition-colors hover:border-line hover:bg-white md:gap-7 md:p-5">
                {/* Number + connector */}
                <div className="relative flex flex-col items-center">
                  <span className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy font-serif text-[20px] font-bold text-white">
                    {i + 1}
                  </span>
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute top-12 h-[calc(100%+0.75rem)] w-px bg-line"
                    />
                  )}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-serif text-[22px] font-bold leading-tight text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[16.5px] leading-relaxed text-ink">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Optional add-ons */}
        <Reveal delay={0.1}>
          <div className="mt-14 rounded-card border border-line bg-white p-6 shadow-soft md:p-9">
            <p className="eyebrow text-amber-600">Optional dazu</p>
            <p className="mt-1.5 text-[16px] text-ink/75">
              Bausteine, die wir bei Bedarf ergänzen:
            </p>
            <ul className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {optionals.map((o) => (
                <li key={o.title} className="flex gap-3.5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber/10">
                    <Plus className="h-4 w-4 text-amber" />
                  </span>
                  <div>
                    <p className="text-[16.5px] font-semibold leading-snug text-navy">
                      {o.title}
                    </p>
                    <p className="mt-1 text-[15px] leading-snug text-ink/70">
                      {o.sub}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
