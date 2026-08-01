"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
}

/* ------------------------------------------------------------------ */
/* URL-Bau                                                             */
/* ------------------------------------------------------------------ */

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/**
 * Baut die Calendly-URL:
 * - `a1` = zusammengefasste Antworten aus dem Qualifikationsformular
 *   (Calendly füllt damit die erste Freitextfrage der Buchungsseite vor).
 * - UTM-Parameter der Seiten-URL werden durchgereicht (Traffic aus Meta Ads).
 *
 * Kontaktdaten (Name, E-Mail, Telefon) werden bewusst NICHT übergeben — die
 * erhebt ausschließlich Calendly im Buchungsschritt.
 */
export function buildCalendlyUrl(baseUrl: string, a1?: string): string {
  const url = new URL(baseUrl);
  const pageSearch =
    typeof window === "undefined" ? "" : window.location.search;
  const params = new URLSearchParams(pageSearch);

  const summary = a1?.trim();
  if (summary) url.searchParams.set("a1", summary);

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) url.searchParams.set(key, value);
  });

  /* URLSearchParams kodiert Leerzeichen als "+". Calendly übernimmt das "+"
     wörtlich in die Vorausfüllung ("Zu+wenige+Anfragen") — deshalb auf %20. */
  url.search = url.searchParams.toString().replace(/\+/g, "%20");
  return url.toString();
}

/* ------------------------------------------------------------------ */
/* Lazy-Loader für widget.js                                           */
/* ------------------------------------------------------------------ */

/**
 * Einmaliges Promise: widget.js wird garantiert nur ein einziges Mal in die
 * Seite gehängt — auch bei StrictMode-Doppelmount oder wenn Vorwärmen und
 * Formular-Submit gleichzeitig laufen.
 */
let widgetPromise: Promise<void> | null = null;

export function loadCalendlyWidget(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (widgetPromise) return widgetPromise;

  widgetPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-calendly-widget="true"]',
    );
    const script = existing ?? document.createElement("script");

    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener(
      "error",
      () => {
        // Laden darf später erneut versucht werden.
        widgetPromise = null;
        reject(new Error("Calendly widget.js konnte nicht geladen werden."));
      },
      { once: true },
    );

    if (!existing) {
      script.src = WIDGET_SRC;
      script.async = true;
      script.dataset.calendlyWidget = "true";
      document.head.appendChild(script);
    }
  });

  return widgetPromise;
}

/**
 * Vorwärmen: wird aufgerufen, sobald der Nutzer in die Nähe des Formulars
 * scrollt, damit der Kalender nach dem Absenden sofort steht.
 */
export function prewarmCalendlyWidget(): void {
  void loadCalendlyWidget().catch(() => {
    /* stiller Fehlschlag — beim Absenden wird erneut versucht */
  });
}

/* ------------------------------------------------------------------ */
/* Skeleton                                                            */
/* ------------------------------------------------------------------ */

function CalendarSkeleton() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-10 flex flex-col gap-5 rounded-card bg-base p-6 md:p-8"
    >
      <div className="h-4 w-32 animate-pulse rounded-full bg-line" />
      <div className="h-7 w-2/3 animate-pulse rounded-full bg-line" />
      <div className="h-4 w-1/2 animate-pulse rounded-full bg-line" />
      <div className="mt-2 grid grid-cols-7 gap-2.5">
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="h-9 animate-pulse rounded-lg bg-mist"
            style={{ animationDelay: `${(i % 7) * 60}ms` }}
          />
        ))}
      </div>
      <div className="mt-auto h-4 w-40 animate-pulse rounded-full bg-line" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section — wird erst NACH dem Absenden des Formulars gerendert        */
/* ------------------------------------------------------------------ */

export default function CalendlySection({ a1 }: { a1?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  /** URL, mit der das aktuell hängende Widget aufgebaut wurde. */
  const mountedUrlRef = useRef<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [fallbackUrl, setFallbackUrl] = useState(CALENDLY_URL);

  useEffect(() => {
    let cancelled = false;
    const url = buildCalendlyUrl(CALENDLY_URL, a1);
    setFallbackUrl(url);

    loadCalendlyWidget()
      .then(() => {
        if (cancelled) return;
        const el = containerRef.current;
        if (!el || !window.Calendly) {
          setStatus("error");
          return;
        }
        // Nur aufbauen, wenn noch kein Widget hängt oder sich die URL geändert
        // hat — verhindert Doppel-Widgets bei StrictMode-Doppelmount.
        if (mountedUrlRef.current !== url || el.childElementCount === 0) {
          el.innerHTML = "";
          el.removeAttribute("data-processed");
          window.Calendly.initInlineWidget({ url, parentElement: el });
          // markiert den Container auch für Calendlys eigenen Auto-Init
          el.setAttribute("data-processed", "true");
          mountedUrlRef.current = url;
        }
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [a1]);

  return (
    <section id="termin" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Terminbuchung"
        title="Sichern Sie sich Ihren Wunschtermin"
        intro="Wählen Sie im Kalender einfach den Termin, der Ihnen am besten passt. Sie erhalten eine ehrliche Einschätzung für Ihren Standort, kostenlos und unverbindlich."
        align="center"
      />

      {/* overflow-visible: der Kalender darf KEINE eigene innere Scrollleiste
          bekommen — die Höhe reicht aus, damit er vollständig hineinpasst. */}
      <div className="relative mt-8 overflow-visible rounded-card border border-line bg-base shadow-card">
        {status === "loading" && <CalendarSkeleton />}

        {status === "error" ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="max-w-md text-[15px] leading-relaxed text-ink">
              Der Kalender konnte nicht geladen werden. Sie können die
              Buchungsseite direkt öffnen — Ihre Angaben sind dort bereits
              hinterlegt.
            </p>
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3.5 text-[15px] font-semibold text-white shadow-cta transition-colors hover:bg-amber-600"
            >
              Termin in neuem Tab wählen
            </a>
          </div>
        ) : (
          <div
            id="calendly-embed"
            ref={containerRef}
            /* Bewusst OHNE die Klasse "calendly-inline-widget": widget.js
               scannt beim Laden alle Elemente mit dieser Klasse und liest
               deren data-url. Ohne data-url wirft der Auto-Init null.split,
               bricht ab — und window.Calendly wird nie gesetzt. */
            className="h-[900px] w-full md:h-[780px]"
            style={{ minWidth: "320px", overflow: "visible" }}
          />
        )}
      </div>

      <p className="mt-4 text-center text-[13px] text-ink/65">
        Kostenlos &amp; unverbindlich · Kein Verkaufsdruck · Termin jederzeit
        verschiebbar
      </p>
      <p className="mx-auto mt-2 max-w-xl text-center text-[12.5px] leading-relaxed text-ink/50">
        Die Terminvergabe läuft über Calendly (Calendly LLC, USA); dabei werden
        Ihre Formularangaben als Zusammenfassung sowie die von Ihnen im
        Buchungsformular angegebenen Daten an Calendly übermittelt. Näheres in
        unserer{" "}
        <Link
          href="/datenschutz#calendly"
          className="underline underline-offset-2 transition-colors hover:text-navy"
        >
          Datenschutzerklärung
        </Link>
        .
      </p>
    </section>
  );
}
