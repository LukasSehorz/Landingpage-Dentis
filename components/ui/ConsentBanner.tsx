"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Cookie-Einwilligung nach § 25 Abs. 1 TDDDG.
 *
 * Der Google Tag Manager liegt fest im <head> und laedt sofort, damit der
 * Container erreichbar ist. Seine messenden Tags stehen jedoch ueber den
 * Google Consent Mode v2 auf "denied" (siehe app/layout.tsx) und feuern erst,
 * wenn hier zugestimmt wird. Ohne Zustimmung wird also nichts gemessen.
 */

const STORAGE_KEY = "fs_consent";

type Consent = { statistik: boolean; marketing: boolean };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __fsOpenConsent?: () => void;
  }
}

function pushConsent(c: Consent) {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
    analytics_storage: c.statistik ? "granted" : "denied",
  });
}

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [statistik, setStatistik] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    let stored: Consent | null = null;
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch {
      stored = null;
    }

    if (stored) {
      setStatistik(!!stored.statistik);
      setMarketing(!!stored.marketing);
    } else {
      setOpen(true);
    }

    // Ueber den Footer-Link jederzeit wieder erreichbar
    window.__fsOpenConsent = () => {
      let cur: Consent | null = null;
      try {
        cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      } catch {
        cur = null;
      }
      setStatistik(cur ? !!cur.statistik : true);
      setMarketing(cur ? !!cur.marketing : true);
      setOpen(true);
    };
  }, []);

  const decide = useCallback((c: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    } catch {
      /* localStorage gesperrt — Auswahl gilt dann nur fuer diesen Aufruf */
    }
    pushConsent(c);
    setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-line bg-base p-5 shadow-lift sm:p-6"
    >
      <div className="mx-auto max-w-content">
        <h2
          id="consent-title"
          className="font-serif text-lg font-semibold text-navy"
        >
          Dürfen wir messen, wie diese Seite genutzt wird?
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          Für den Betrieb der Seite brauchen wir keine Cookies. Freiwillig können
          Sie uns erlauben, zu messen, wie viele Menschen die Seite besuchen und
          ob unsere Anzeigen ankommen. Die Seite funktioniert vollständig, wenn
          Sie ablehnen. Details in der{" "}
          <a
            href="/datenschutz"
            className="font-medium text-teal underline underline-offset-2"
          >
            Datenschutzerklärung
          </a>
          .
        </p>

        <div className="mt-4 border-t border-line">
          <label className="flex cursor-pointer items-start gap-3 border-b border-line py-3">
            <input
              type="checkbox"
              checked={statistik}
              onChange={(e) => setStatistik(e.target.checked)}
              className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer accent-teal"
            />
            <span className="text-sm leading-snug">
              <strong className="block font-semibold text-navy">Statistik</strong>
              <span className="text-ink/60">
                Auswertung mit Google Analytics über den Google Tag Manager, wie
                viele Besucher die Seite hat und woher sie kommen.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3 border-b border-line py-3">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer accent-teal"
            />
            <span className="text-sm leading-snug">
              <strong className="block font-semibold text-navy">Marketing</strong>
              <span className="text-ink/60">
                Messung, welche unserer Anzeigen zu einer Anfrage geführt haben.
              </span>
            </span>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => decide({ statistik: false, marketing: false })}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-mist"
          >
            Alle ablehnen
          </button>
          <button
            type="button"
            onClick={() => decide({ statistik, marketing })}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-mist"
          >
            Auswahl speichern
          </button>
          <button
            type="button"
            onClick={() => decide({ statistik: true, marketing: true })}
            className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-teal-600"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
