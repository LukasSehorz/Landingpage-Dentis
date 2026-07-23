import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionCta from "@/components/ui/SectionCta";
import { Check } from "@/components/ui/icons";

const services = [
  {
    title: "Wir gewinnen die richtigen Patienten",
    sub: "Gezielt Menschen mit echtem Wunsch nach festen Zähnen und Implantaten.",
  },
  {
    title: "Nur ernsthafte Selbstzahler",
    sub: "Wir filtern vor, Sie sprechen nicht mit Preisjägern.",
  },
  {
    title: "Komplettes System, fertig aufgesetzt",
    sub: "Von der Landingpage bis zur Technik im Hintergrund, laufend optimiert.",
  },
  {
    title: "Rundum betreut, ein Ansprechpartner",
    sub: "Done-for-you: Sie müssen nichts selbst aufsetzen oder koordinieren.",
  },
];

export default function Package() {
  return (
    <section className="section-pad border-t border-line bg-base">
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow="Leistungspaket"
          title="Die komplette Patientengewinnung. Aus einer Hand."
          intro="Wir bauen Ihnen ein komplettes, betreutes System für planbar mehr Umsatz, Monat für Monat. Sie behandeln, um alles andere kümmern wir uns."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={(i % 2) * 0.05}
              className="flex gap-4 rounded-card border border-line bg-mist p-6 md:p-7"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber/10">
                <Check className="h-4 w-4 text-amber" />
              </span>
              <div>
                <p className="text-[18px] font-semibold leading-snug text-navy">
                  {s.title}
                </p>
                <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink/75">
                  {s.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <SectionCta text="Genau dieses System bauen wir für Ihre Praxis auf — schlüsselfertig und laufend betreut. Lassen Sie uns unverbindlich prüfen, was für Sie drin ist." />
      </div>
    </section>
  );
}
