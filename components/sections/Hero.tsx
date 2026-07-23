import FounderVideo from "@/components/ui/FounderVideo";
import CtaButton from "@/components/ui/CtaButton";
import Reveal from "@/components/ui/Reveal";
import { Check } from "@/components/ui/icons";

const freebies = [
  "Standort- & Marktanalyse",
  "Website-Check",
  "SEO-Check",
];

export default function Hero() {
  return (
    <section id="top" className="relative bg-base">
      {/*
        PRIMARY BLOCK — fills the viewport (minus the ~72px sticky header) so
        headline → subheadline → video → button are all visible above the fold,
        and the value-prop paragraph below only appears once the user scrolls.
      */}
      <div className="container-page flex min-h-[calc(100svh-72px)] flex-col justify-center py-8 md:justify-between md:py-12">
        {/* 1 · HEADLINE + SUBHEADLINE */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/50">
              <span>Implantatpraxen</span>
              <span aria-hidden className="h-3 w-px bg-line" />
              <span>Zahnzentren</span>
              <span aria-hidden className="h-3 w-px bg-line" />
              <span>Zahnkliniken</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="nums mt-5 font-serif text-[clamp(30px,4.2vw,50px)] font-bold leading-[1.07] text-navy">
              Ø&nbsp;20.000&nbsp;Euro Mehrumsatz pro Monat durch planbare
              Selbstzahler.
              <span className="mt-3 block text-[0.62em] font-bold leading-tight text-amber">
                Was würde das für Ihre Praxis bedeuten?
              </span>
            </h1>
          </Reveal>
        </div>

        {/* 2 · VIDEO — compact on desktop (mobile stays full width), corner brackets */}
        <Reveal delay={0.1} y={16} className="mx-auto mt-8 w-full max-w-[520px] md:mt-0">
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-3 -top-3 h-6 w-6 border-l-2 border-t-2 border-navy sm:-left-4 sm:-top-4 sm:h-8 sm:w-8"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-3 -top-3 h-6 w-6 border-r-2 border-t-2 border-navy sm:-right-4 sm:-top-4 sm:h-8 sm:w-8"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-3 -left-3 h-6 w-6 border-b-2 border-l-2 border-navy sm:-bottom-4 sm:-left-4 sm:h-8 sm:w-8"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-navy sm:-bottom-4 sm:-right-4 sm:h-8 sm:w-8"
            />
            <FounderVideo />
          </div>
        </Reveal>

        {/* 3 · CTA — directly under the video */}
        <Reveal delay={0.15}>
          <div className="mt-7 flex flex-col items-center md:mt-0">
            <CtaButton href="#formular">
              Kostenlose Potenzial-Analyse anfragen
            </CtaButton>
            <p className="mt-3 text-center text-[13px] text-ink/60">
              Kostenlos &amp; unverbindlich · Nur für Praxen mit
              Implantat-Schwerpunkt · Antwort innerhalb von 24 Stunden
            </p>
          </div>
        </Reveal>
      </div>

      {/*
        BELOW-THE-FOLD — value proposition + free deliverables.
        Intentionally placed after the full-height primary block so it only
        becomes visible on scroll (on desktop and mobile alike).
      */}
      <div className="container-page pb-16 md:pb-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span
              aria-hidden
              className="mx-auto mb-6 block h-px w-12 bg-amber/60"
            />
            <p className="text-[19px] leading-relaxed text-navy md:text-[21px] md:leading-relaxed">
              Wir übernehmen die{" "}
              <span className="font-semibold">komplette Patientengewinnung</span>{" "}
              für Implantatpraxen, Zahnzentren und Zahnkliniken über Meta Ads,
              Google Ads und eine spezialisierte Behandlungs-Landingpage. Für
              Praxen mit freien Beratungs- und Behandlungskapazitäten.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-9 max-w-2xl rounded-xl border border-line bg-[#F5F7FB] px-5 py-4 text-center">
            <p className="eyebrow text-amber-600">
              Kostenlos vorab, ohne Gegenleistung
            </p>
            <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {freebies.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber/10">
                    <Check className="h-3 w-3 text-amber" />
                  </span>
                  <span className="text-[15px] font-semibold text-navy">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
