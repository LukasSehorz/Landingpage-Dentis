"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

/**
 * Terminart: "Kostenlose Potenzialanalyse für Ihre Implantatpraxis" (30 Min.).
 * Der Slug lautet bewusst weiterhin "...fur-implantat-patienten", damit
 * bestehende Links gültig bleiben — NICHT ändern.
 */
export const CALENDLY_URL =
  "https://calendly.com/jannikvomhofe-flowstate-ai/kostenlose-potenzialanalyse-fur-implantat-patienten";

const WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

/** Custom-Event, über das das Lead-Formular den Kalender vorausfüllt. */
const PREFILL_EVENT = "calendly:prefill";

type CalendlyPrefillDetail = { name?: string; email?: string };

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
      initInlineWidgets?: () => void;
    };
  }
  interface WindowEventMap {
    [PREFILL_EVENT]: CustomEvent<CalendlyPrefillDetail>;
  }
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/**
 * Baut die Calendly-URL: Vorausfüllung (Name/E-Mail) + Durchreichen der
 * UTM-Parameter aus der Seiten-URL (Traffic kommt aus Meta Ads).
 */
export function buildCalendlyUrl(
  baseUrl: string,
  name?: string,
  email?: string,
): string {
  const params = new URLSearchParams(window.location.search);
  const url = new URL(baseUrl);
  if (name) url.searchParams.set("name", name);
  if (email) url.searchParams.set("email", email);
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value !== null) url.searchParams.set(key, value);
  });
  /* URLSearchParams kodiert Leerzeichen als "+". Calendly übernimmt das "+"
     wörtlich in die Vorausfüllung ("Dr.+Max+Mustermann") — deshalb auf %20. */
  url.search = url.searchParams.toString().replace(/\+/g, "%20");
  return url.toString();
}

/**
 * Wird nach erfolgreichem Formular-Submit aufgerufen: lädt das Widget mit
 * vorausgefülltem Namen / E-Mail neu und scrollt den Kalender in den Blick.
 */
export function prefillCalendly(name: string, email: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<CalendlyPrefillDetail>(PREFILL_EVENT, {
      detail: { name, email },
    }),
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function CalendlySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  /** Aktuell gewünschte Widget-URL (inkl. Prefill/UTM), sobald clientseitig bekannt. */
  const urlRef = useRef<string | null>(null);

  /**
   * Initialisiert das Inline-Widget.
   * `force` = bestehendes Widget verwerfen und mit neuer URL neu aufbauen.
   * Ohne `force` wird nichts getan, wenn bereits ein Widget im Container hängt
   * — das verhindert Doppel-Widgets bei StrictMode-/Doppel-Mount und wenn
   * widget.js den Container bereits selbst initialisiert hat.
   */
  const mountWidget = useCallback((force = false) => {
    const el = containerRef.current;
    if (!el || !window.Calendly) return;
    if (!force && el.childElementCount > 0) return;

    const url = urlRef.current ?? buildCalendlyUrl(CALENDLY_URL);
    el.innerHTML = "";
    el.removeAttribute("data-processed");
    window.Calendly.initInlineWidget({ url, parentElement: el });
    // markiert den Container auch für Calendlys eigenen Auto-Init als erledigt
    el.setAttribute("data-processed", "true");
  }, []);

  /* UTM-Parameter direkt beim ersten Client-Render in die data-url übernehmen,
     damit auch der Auto-Init von widget.js bereits die richtige URL nutzt. */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!urlRef.current) urlRef.current = buildCalendlyUrl(CALENDLY_URL);
    el.setAttribute("data-url", urlRef.current);
    mountWidget();
  }, [mountWidget]);

  /* Vorausfüllung nach erfolgreichem Formular-Submit */
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const detail = (event as CustomEvent<CalendlyPrefillDetail>).detail ?? {};
      urlRef.current = buildCalendlyUrl(
        CALENDLY_URL,
        detail.name,
        detail.email,
      );
      containerRef.current?.setAttribute("data-url", urlRef.current);
      // Läuft ins Leere, solange widget.js noch lädt — der onLoad-Handler
      // baut das Widget dann mit der bereits gemerkten URL auf.
      mountWidget(true);

      window.requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    };

    window.addEventListener(PREFILL_EVENT, onPrefill as EventListener);
    return () =>
      window.removeEventListener(PREFILL_EVENT, onPrefill as EventListener);
  }, [mountWidget]);

  return (
    <section
      id="termin"
      ref={sectionRef}
      className="scroll-mt-24 border-t border-line bg-base py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-[900px] px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Terminbuchung"
          title="Sichern Sie sich Ihren Wunschtermin"
          intro="Wählen Sie im Kalender einfach den Termin, der Ihnen am besten passt. Sie erhalten eine ehrliche Einschätzung für Ihren Standort, kostenlos und unverbindlich."
          align="center"
        />

        <Reveal delay={0.1} y={16}>
          <div className="mt-10 overflow-hidden rounded-card border border-line bg-base shadow-card">
            <div
              id="calendly-embed"
              ref={containerRef}
              className="calendly-inline-widget h-[840px] sm:h-[880px] md:h-[700px]"
              data-url={CALENDLY_URL}
              style={{ minWidth: "320px" }}
            />
          </div>
        </Reveal>

        <p className="mt-4 text-center text-[13px] text-ink/65">
          Kostenlos &amp; unverbindlich · Kein Verkaufsdruck · Termin jederzeit
          verschiebbar
        </p>
        <p className="mx-auto mt-2 max-w-xl text-center text-[12.5px] leading-relaxed text-ink/50">
          Die Terminvergabe läuft über Calendly (Calendly LLC, USA); dabei
          werden die von Ihnen im Buchungsformular angegebenen Daten an Calendly
          übermittelt. Näheres in unserer{" "}
          <Link
            href="/datenschutz#calendly"
            className="underline underline-offset-2 transition-colors hover:text-navy"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>
      </div>

      {/* widget.js wird über die feste id pro Seite nur einmal geladen */}
      <Script
        id="calendly-widget-js"
        src={WIDGET_SRC}
        strategy="lazyOnload"
        onLoad={() => mountWidget()}
        onReady={() => mountWidget()}
      />
    </section>
  );
}
