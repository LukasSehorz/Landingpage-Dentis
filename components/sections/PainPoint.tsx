import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaButton from "@/components/ui/CtaButton";

const questions = [
  "Bekommen Sie vor allem Preisjäger, die nach dem Kostenvoranschlag wieder verschwinden?",
  "Hängen neue Fälle fast nur an Empfehlungen und Überweisungen, sodass sich kein Monat wirklich planen lässt?",
  "Ist Ihr Terminkalender voll mit gering vergüteten Fällen, während die hochwertigen Selbstzahler für Implantate ausbleiben?",
  "Haben Sie mit einer Agentur ohne Dental-Verständnis schon Budget verbrannt: viel versprochen, wenig geliefert?",
];

export default function PainPoint() {
  return (
    <section className="section-pad border-t border-line bg-base">
      <div className="container-page">
        <SectionHeading
          index="01"
          eyebrow="Das eigentliche Problem"
          eyebrowTone="amber"
          title="Ihr Problem sind nicht zu wenige Anfragen, sondern die falschen."
          intro="Kommt Ihnen einer dieser Punkte bekannt vor?"
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {questions.map((q, i) => (
            <Reveal
              as="li"
              key={q}
              delay={i * 0.06}
              className="flex gap-4 rounded-card border border-line bg-base p-6 shadow-soft"
            >
              <span
                aria-hidden
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-amber text-[13px] font-bold text-amber"
              >
                ?
              </span>
              <p className="text-[16px] font-medium leading-relaxed text-navy">
                {q}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl border-l-2 border-amber pl-5 text-[17px] leading-relaxed text-navy">
            Wenn Sie mindestens einmal genickt haben, sind Sie hier richtig.{" "}
            <span className="font-semibold">
              Genau das lösen wir, spezialisiert und planbar.
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col items-start gap-3">
            <CtaButton href="#formular">
              Kostenlose Potenzial-Analyse anfragen
            </CtaButton>
            <p className="text-[13px] text-ink/55">
              Kostenlos &amp; unverbindlich · Antwort innerhalb von 24 Stunden
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
