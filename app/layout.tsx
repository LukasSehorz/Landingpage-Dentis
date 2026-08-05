import type { Metadata, Viewport } from "next";
import Script from "next/script";
import ConsentBanner from "@/components/ui/ConsentBanner";
import "./globals.css";

const GTM_ID = "GTM-KM4833V2";

export const metadata: Metadata = {
  title:
    "Planbar mehr qualifizierte Implantat-Patientenanfragen | Flowstate AI",
  description:
    "Performance-Marketing ausschließlich für Premium-Implantologie. Wir übernehmen die komplette Patientengewinnung für Implantatpraxen, Zahnzentren und Zahnkliniken, über Meta Ads, Google Ads und eine spezialisierte Behandlungs-Landingpage.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        {/* Google Consent Mode v2 — laeuft beim HTML-Parsing und damit garantiert
            vor dem Tag Manager. Alle messenden Kategorien starten auf "denied",
            erst die Einwilligung im Banner schaltet sie frei
            (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
try {
  var fsPrev = JSON.parse(localStorage.getItem('fs_consent') || 'null');
  if (fsPrev) {
    gtag('consent', 'update', {
      ad_storage:         fsPrev.marketing ? 'granted' : 'denied',
      ad_user_data:       fsPrev.marketing ? 'granted' : 'denied',
      ad_personalization: fsPrev.marketing ? 'granted' : 'denied',
      analytics_storage:  fsPrev.statistik ? 'granted' : 'denied'
    });
  }
} catch (e) {}
`.trim(),
          }}
        />
        {/* End Google Consent Mode v2 */}

        {/* Google Tag Manager */}
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <a
          href="#formular"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Direkt zum Formular springen
        </a>
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
