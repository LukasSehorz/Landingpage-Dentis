import CtaButton from "@/components/ui/CtaButton";
import Reveal from "@/components/ui/Reveal";

export default function CtaBand({
  eyebrow,
  title,
  note,
}: {
  eyebrow?: string;
  title: string;
  note?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-16 md:py-20">
      {/* faint grain + soft blue glow so the dark band reads as intentional */}
      <div className="grain" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber/20 blur-3xl"
      />
      <div className="container-page relative">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            {eyebrow && (
              <Reveal>
                <p className="eyebrow text-teal">{eyebrow}</p>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-serif text-[clamp(26px,3.4vw,40px)] leading-[1.1] text-white">
                {title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="shrink-0">
            <CtaButton href="#formular">
              Kostenlose Potenzial-Analyse anfragen
            </CtaButton>
            {note && <p className="mt-3 text-[13px] text-white/60">{note}</p>}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
