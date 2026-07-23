import CtaButton from "@/components/ui/CtaButton";
import Reveal from "@/components/ui/Reveal";

/**
 * Compact, repeatable CTA to close out a section:
 * one short reason line + the primary button. Keeps the path to the form
 * always one tap away, wherever the reader loses momentum.
 */
export default function SectionCta({
  text,
  cta = "Kostenlose Potenzial-Analyse anfragen",
  note,
  className = "",
}: {
  text: React.ReactNode;
  cta?: string;
  note?: string;
  className?: string;
}) {
  return (
    <Reveal>
      <div
        className={`mx-auto mt-14 flex max-w-2xl flex-col items-center gap-4 text-center ${className}`}
      >
        <p className="text-[17px] leading-relaxed text-ink md:text-[18px]">
          {text}
        </p>
        <CtaButton href="#formular">{cta}</CtaButton>
        <p className="text-[13px] text-ink/55">
          {note ?? "Kostenlos & unverbindlich · Antwort innerhalb von 24 Stunden"}
        </p>
      </div>
    </Reveal>
  );
}
