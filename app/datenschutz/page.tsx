import type { Metadata } from "next";
import LegalShell, { Ph } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Flowstate AI",
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <LegalShell title="Datenschutzerklärung" stand="Juli 2026">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
      </p>
      <p>
        Sehorz Lukas und vom Hofe Jannik GbR
        <br />
        Orlfing 1
        <br />
        84405 Dorfen
        <br />
        E-Mail:{" "}
        <a href="mailto:lukas.sehorz@flowstate-ai.net">
          lukas.sehorz@flowstate-ai.net
        </a>
        <br />
        Telefon: 0172 3465896
      </p>

      <h2>2. Allgemeine Hinweise</h2>
      <p>
        Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend
        den gesetzlichen Datenschutzvorschriften sowie dieser
        Datenschutzerklärung. Die Nutzung dieser Website ist ohne Angabe
        personenbezogener Daten möglich; Daten werden nur erhoben, soweit Sie
        uns diese aktiv mitteilen (insbesondere über unser Anfrageformular)
        oder soweit dies technisch erforderlich ist.
      </p>

      <h2>3. Hosting und Server-Logfiles</h2>
      <p>
        Diese Website wird gehostet bei Netlify, Inc., 512 2nd Street, Suite
        200, San Francisco, CA 94107, USA („Netlify"). Mit Netlify besteht ein
        Vertrag über Auftragsverarbeitung nach Art. 28 DSGVO. Soweit dabei
        personenbezogene Daten in die USA übermittelt werden, erfolgt dies auf
        Grundlage der EU-Standardvertragsklauseln nach Art. 46 DSGVO. Weitere
        Informationen finden Sie in der Datenschutzerklärung von Netlify:{" "}
        <a
          href="https://www.netlify.com/privacy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          netlify.com/privacy
        </a>
        .
      </p>
      <p>
        Beim Aufruf der Website verarbeitet der Server automatisch technische
        Zugriffsdaten (sogenannte Server-Logfiles), insbesondere IP-Adresse,
        Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Browsertyp und
        Betriebssystem. Diese Daten dienen der Sicherstellung eines
        störungsfreien Betriebs sowie der Sicherheit der Website und werden
        nach kurzer Zeit gelöscht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
        DSGVO (berechtigtes Interesse an der sicheren Bereitstellung der
        Website).
      </p>

      <h2>4. Anfrage- und Qualifikationsformular</h2>
      <p>
        Wenn Sie unser Formular „Kostenlose Potenzial-Analyse" nutzen,
        verarbeiten wir die von Ihnen angegebenen Daten:
      </p>
      <ul>
        <li>
          Angaben zu Ihrer Praxis (Behandlungsschwerpunkt, Anzahl der
          Behandler, bisherige Wege der Patientengewinnung, aktuelle
          Herausforderung, Beratungskapazität, Werbebudget, Ihre Rolle in der
          Praxis, Website Ihrer Praxis)
        </li>
        <li>Name</li>
        <li>Geschäftliche E-Mail-Adresse</li>
        <li>Telefonnummer</li>
      </ul>
      <p>
        Zweck der Verarbeitung ist die Bearbeitung Ihrer Anfrage, die
        Erstellung der kostenlosen Potenzial-, Website- und SEO-Analyse, die
        Kontaktaufnahme zur Terminvereinbarung sowie die Anbahnung einer
        möglichen Zusammenarbeit. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. b
        DSGVO (vorvertragliche Maßnahmen auf Ihre Anfrage) sowie Ihre
        Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO, die Sie im Formular
        erteilen.
      </p>
      <p>
        Ihre Daten werden gelöscht, sobald sie für die genannten Zwecke nicht
        mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten
        entgegenstehen. Eine Weitergabe an Dritte erfolgt nicht, ausgenommen
        die unter dieser Erklärung genannten Auftragsverarbeiter.
      </p>

      <h2 id="calendly">5. Terminbuchung (Calendly)</h2>
      <p>
        Für die Vereinbarung des kostenlosen Erstgesprächs nutzen wir den
        Terminbuchungsdienst Calendly des Anbieters Calendly LLC, 271 17th St
        NW, Atlanta, Georgia 30363, USA („Calendly"). Der Buchungskalender ist
        unterhalb des Anfrageformulars unmittelbar in unsere Startseite
        eingebunden, sodass Sie Ihren Termin direkt selbst auswählen können.
      </p>
      <p>
        Der Kalender wird als iFrame bereits beim Aufruf der Seite geladen.
        Dabei wird eine Verbindung zu Servern von Calendly aufgebaut und es
        werden technisch notwendige Verbindungsdaten übermittelt – insbesondere
        Ihre IP-Adresse, Informationen zu Browser und Endgerät, die
        Referrer-URL sowie Datum und Uhrzeit des Abrufs. Calendly setzt dabei
        eigene Cookies bzw. vergleichbare Technologien, die für den Betrieb der
        Buchungsfunktion erforderlich sind.
      </p>
      <p>
        Haben Sie zuvor das Anfrageformular abgesendet, werden Ihr Name und
        Ihre E-Mail-Adresse in den Kalender vorausgefüllt, damit Sie diese
        Angaben nicht erneut eingeben müssen. Sofern Sie über eine
        Werbeanzeige zu uns gelangt sind, werden zusätzlich die in der
        Seiten-URL enthaltenen Kampagnenparameter (utm_source, utm_medium,
        utm_campaign, utm_content, utm_term) an Calendly übergeben, damit wir
        Buchungen der jeweiligen Kampagne zuordnen können. Diese Parameter
        enthalten keine personenbezogenen Angaben zu Ihnen, sondern
        ausschließlich Bezeichnungen unserer Anzeigen.
      </p>
      <p>
        Buchen Sie einen Termin, verarbeitet Calendly darüber hinaus die von
        Ihnen im Kalender eingegebenen Daten (Name, E-Mail-Adresse, gewählter
        Zeitpunkt, Zeitzone sowie etwaige Freitextangaben) und erzeugt
        automatisch einen Videokonferenz-Link. Der Termin wird in unseren
        Kalender übernommen; Sie erhalten von Calendly eine Bestätigung sowie
        Erinnerungs-E-Mails.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Terminvereinbarung als
        vorvertragliche Maßnahme auf Ihre Anfrage) sowie hinsichtlich der
        Bereitstellung des Kalenders Art. 6 Abs. 1 lit. f DSGVO; unser
        berechtigtes Interesse liegt in einer unmittelbaren und komfortablen
        Terminvereinbarung ohne zusätzlichen Abstimmungsaufwand. Die für die
        Buchungsfunktion erforderlichen Informationen auf Ihrem Endgerät
        stützen wir auf § 25 Abs. 2 Nr. 2 TDDDG, da sie für den von Ihnen
        gewünschten Dienst unbedingt erforderlich sind. Der Kalender dient
        nicht der Reichweitenmessung oder Werbung; eine Profilbildung findet
        über ihn nicht statt.
      </p>
      <p>
        Mit Calendly besteht ein Vertrag über Auftragsverarbeitung nach Art. 28
        DSGVO. Da Calendly seinen Sitz in den USA hat, kommt es zu einer
        Übermittlung personenbezogener Daten in ein Drittland. Calendly ist
        nach dem EU-U.S. Data Privacy Framework zertifiziert; ergänzend gelten
        die EU-Standardvertragsklauseln nach Art. 46 DSGVO. Ein Zugriff
        US-amerikanischer Behörden auf diese Daten lässt sich trotz dieser
        Maßnahmen nicht vollständig ausschließen.
      </p>
      <p>
        Möchten Sie keine Daten an Calendly übermitteln, nutzen Sie den
        Kalender bitte nicht. Sie erreichen uns jederzeit auch per E-Mail an{" "}
        <a href="mailto:lukas.sehorz@flowstate-ai.net">
          lukas.sehorz@flowstate-ai.net
        </a>{" "}
        oder telefonisch unter 0172 3465896; wir stimmen den Termin dann
        persönlich mit Ihnen ab. Weitere Informationen:{" "}
        <a
          href="https://calendly.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          calendly.com/privacy
        </a>
        .
      </p>

      <h2>6. Cookies</h2>
      <p>
        Diese Website setzt derzeit keine Cookies ein, die einer Einwilligung
        bedürfen. Es werden keine Analyse- oder Marketing-Cookies gesetzt. Die
        vom Buchungskalender nach Ziffer 5 gesetzten Informationen sind für den
        Betrieb der von Ihnen angeforderten Terminvereinbarung unbedingt
        erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG) und dienen weder der Analyse
        noch der Werbung. Sollten wir künftig einwilligungspflichtige Dienste
        einbinden (z. B. Analyse- oder Werbetools), werden wir Sie vor dem
        Setzen solcher Cookies über ein Einwilligungsbanner um Ihre Zustimmung
        nach § 25 TDDDG bitten und diese Erklärung aktualisieren.
      </p>

      <h2>7. Conversion-Tracking und Werbeanzeigen</h2>
      <p>
        <Ph>Nur aufnehmen, wenn Meta Pixel / Google Ads Tag tatsächlich
        eingebunden werden — dann zwingend zusätzlich ein Consent-Banner
        einsetzen und hier Anbieter, Zweck, Rechtsgrundlage (Einwilligung,
        Art. 6 Abs. 1 lit. a DSGVO), Speicherdauer und Widerrufsmöglichkeit
        beschreiben.</Ph>
      </p>

      <h2>8. Ihre Rechte</h2>
      <p>Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
      <ul>
        <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
      </ul>
      <p>
        Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die
        Zukunft widerrufen, etwa formlos per E-Mail an{" "}
        <a href="mailto:lukas.sehorz@flowstate-ai.net">
          lukas.sehorz@flowstate-ai.net
        </a>
        . Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung
        bleibt unberührt.
      </p>
      <p>
        Ihnen steht zudem ein Beschwerderecht bei einer
        Datenschutz-Aufsichtsbehörde zu (Art. 77 DSGVO). Für unseren Sitz
        zuständig ist das Bayerische Landesamt für Datenschutzaufsicht
        (BayLDA), Promenade 18, 91522 Ansbach.
      </p>

      <h2>9. SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung.
        Eine verschlüsselte Verbindung erkennen Sie daran, dass die
        Adresszeile des Browsers mit „https://" beginnt. Daten, die Sie über
        unser Formular übermitteln, können nicht von Dritten mitgelesen
        werden.
      </p>

      <h2>10. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie
        stets den aktuellen rechtlichen Anforderungen entspricht oder um
        Änderungen unserer Leistungen umzusetzen. Für Ihren erneuten Besuch
        gilt dann die neue Datenschutzerklärung.
      </p>
    </LegalShell>
  );
}
