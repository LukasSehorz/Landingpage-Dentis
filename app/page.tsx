import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import PainPoint from "@/components/sections/PainPoint";
import Mechanism from "@/components/sections/Mechanism";
import CtaBand from "@/components/sections/CtaBand";
import Package from "@/components/sections/Package";
import Fit from "@/components/sections/Fit";
import Differentiation from "@/components/sections/Differentiation";
import Faq from "@/components/sections/Faq";
import FormSection from "@/components/sections/FormSection";
import CalendlySection from "@/components/sections/CalendlySection";
import Footer from "@/components/sections/Footer";
import MobileStickyCta from "@/components/sections/MobileStickyCta";

export default function Home() {
  return (
    <>
      {/* 01 · Sticky Header — Logo + single CTA, no navigation */}
      <Header />

      <main>
        {/* 02 · Hero (video-first) + 03 Founder-Video embedded */}
        <Hero />

        {/* 04 · Spezialisierungs-Leiste / Trust-Bar */}
        <TrustBar />

        {/* 05 · Pain Point — Problem → Lösung */}
        <PainPoint />

        {/* 06 · Unser Mechanismus — So funktioniert’s */}
        <Mechanism />

        {/* Navy CTA band (repeated primary CTA) */}
        <CtaBand
          eyebrow="Ein System statt Zufall"
          title="Bereit für planbar qualifizierte Implantat-Anfragen?"
          note="Kostenlos & unverbindlich · Antwort innerhalb von 24 Stunden"
        />

        {/* 07 · Leistungspaket */}
        <Package />

        {/* 08 · Zielgruppe / Fit-Klarheit */}
        <Fit />

        {/* 09 · Differenzierung — Warum Lukas & Jannik */}
        <Differentiation />

        {/* 11 · Mehrstufiges Qualifikationsformular  +  12 · Nach dem Absenden */}
        <FormSection />

        {/* 13 · Terminbuchung — Calendly-Kalender direkt unter dem Formular */}
        <CalendlySection />

        {/* FAQ — Einwand-Behandlung (jetzt letzte Section vor dem Footer) */}
        <Faq />
      </main>

      {/* Minimal footer */}
      <Footer />

      {/* Mobile sticky CTA bar */}
      <MobileStickyCta />
    </>
  );
}
