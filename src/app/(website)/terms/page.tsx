import { WebsiteLayout } from '@/components/global/website-layout';

export default function TermsOfService() {
  return (
    <WebsiteLayout>
     
     
     <div className="max-w-3xl mx-auto px-4 py-16">
  <h1 className="text-3xl font-bold mb-8">Nutzungsbedingungen</h1>

  <div className="prose prose-gray max-w-none space-y-6">
    {/* Haftungsausschluss */}
    <p>
      <strong>Haftungsausschluss:</strong> Die nachfolgenden Nutzungsbedingungen ("Bedingungen") wurden 
      sorgfältig und nach bestem Wissen erstellt. Dennoch übernehmen wir keine Gewähr für Vollständigkeit, 
      Richtigkeit und Aktualität. Die Nutzung unseres Dienstes erfolgt auf eigene Verantwortung. Wir 
      übernehmen insbesondere keine Haftung für Schäden, die durch fehlerhafte KI-generierte Inhalte, 
      die Nicht-Kennzeichnung als KI oder die kommerzielle Verwendung der erstellten Videos entstehen. 
      Für rechtliche Fragen oder eine verbindliche Beratung zu Ihrem konkreten Einzelfall empfehlen wir, 
      einen Anwalt zu konsultieren.
    </p>

    {/* 1. Geltungsbereich und Vertragsgegenstand */}
    <h2 className="text-xl font-semibold mt-8">1. Geltungsbereich und Vertragsgegenstand</h2>
    <p>
      Diese Nutzungsbedingungen regeln das Verhältnis zwischen Ihnen („Nutzer“, „Sie“) und uns, der{" "}
      <strong>Forever Julius Kopp und Svenja Fröhlich Kopp GbR</strong> („wir“, „uns“), hinsichtlich der 
      Nutzung unserer KI-Videoerstellungsplattform inklusive KI-Avatare („Dienste“). Mit der Registrierung 
      und/oder Nutzung unserer Plattform erklären Sie sich mit diesen Nutzungsbedingungen einverstanden.
    </p>

    {/* 2. Leistungsbeschreibung */}
    <h2 className="text-xl font-semibold mt-8">2. Leistungsbeschreibung</h2>
    <p>
      Wir bieten Ihnen einen Dienst zur Erstellung von KI-generierten Videos (inkl. KI-Avatare und ggf. 
      Voice-Generierung). Eine Basisversion unserer Dienste ist kostenfrei, während bestimmte Funktionen 
      und Erweiterungen kostenpflichtig sein können (z. B. über Abonnements oder einmalige Zahlungen). 
      Die genauen Inhalte und Funktionsumfänge ergeben sich aus unserer Plattformbeschreibung und den 
      ggf. zugehörigen Tarifen.
    </p>
    <p>
      Die grundlegenden Rechte an den erstellten Videos liegen bei Ihnen als Nutzer, sofern dies auch im 
      Einklang mit den Nutzungsbedingungen von Drittanbietern (insbesondere Heygen) steht. Bitte beachten 
      Sie, dass Heygen als Technologieanbieter eigene Lizenzbedingungen und Einschränkungen vorgeben kann, 
      die Sie als Nutzer ebenfalls befolgen müssen. Insbesondere kann die kommerzielle Nutzung der 
      erstellten Inhalte an Vorgaben und Kennzeichnungspflichten (z. B. „KI-generiertes Video“) geknüpft sein.
    </p>

    {/* 3. Registrierung und Konten */}
    <h2 className="text-xl font-semibold mt-8">3. Registrierung und Konten</h2>
    <ol className="list-decimal list-inside space-y-2">
      <li>
        <strong>Anmeldung:</strong> Zur Nutzung unserer Plattform ist eine Registrierung mit Ihrer 
        E-Mail-Adresse erforderlich. Sie sind verpflichtet, aktuelle und wahrheitsgemäße Angaben 
        zu machen und Ihre Zugangsdaten vertraulich zu behandeln.
      </li>
      <li>
        <strong>Verantwortung:</strong> Die Weitergabe Ihrer Kontoinformationen an Dritte ist untersagt. 
        Sie tragen die Verantwortung für alle Aktivitäten, die über Ihr Konto erfolgen.
      </li>
      <li>
        <strong>Sperrung / Löschung:</strong> Wir behalten uns das Recht vor, Konten zu sperren oder zu 
        löschen, wenn konkrete Anhaltspunkte für einen Verstoß gegen diese Nutzungsbedingungen oder 
        geltendes Recht vorliegen.
      </li>
    </ol>

    {/* 4. Kostenfreie und kostenpflichtige Leistungen */}
    <h2 className="text-xl font-semibold mt-8">4. Kostenfreie und kostenpflichtige Leistungen</h2>
    <ol className="list-decimal list-inside space-y-2">
      <li>
        <strong>Kostenfreies Paket:</strong> Wir stellen ein kostenfreies Grundpaket mit 
        eingeschränktem Funktionsumfang bereit.
      </li>
      <li>
        <strong>Kostenpflichtige Pakete (Abonnements):</strong> Bestimmte Zusatzfunktionen oder 
        höhere Nutzungskontingente sind kostenpflichtig. Die Abrechnung erfolgt über unseren 
        Zahlungsdienstleister Stripe. Rückerstattungen werden nach den gesetzlichen Vorgaben 
        oder unserer Refund-Policy gewährt. Details hierzu finden Sie in den jeweiligen Angeboten 
        oder auf unserer Plattform.
      </li>
    </ol>

    {/* 5. Nutzungsregeln und unzulässige Inhalte */}
    <h2 className="text-xl font-semibold mt-8">5. Nutzungsregeln und unzulässige Inhalte</h2>
    <p>
      Bei der Nutzung unserer Plattform verpflichten Sie sich insbesondere, keine Inhalte zu erstellen 
      oder hochzuladen, die:
    </p>
    <ul className="list-disc list-inside space-y-2">
      <li>pornografisch, sexuell anstößig oder jugendgefährdend sind,</li>
      <li>illegale, diskriminierende, beleidigende, gewaltverherrlichende oder menschenverachtende Inhalte darstellen,</li>
      <li>politische Propaganda verbreiten,</li>
      <li>zu strafbaren Handlungen anleiten oder solche verherrlichen,</li>
      <li>gegen geistige Eigentumsrechte oder sonstige Rechte Dritter verstoßen,</li>
      <li>falsche, täuschende oder irreführende Angaben über die KI-Herkunft machen.</li>
    </ul>
    <p>
      Wir setzen automatisierte Filter ein, um bestimmte verbotene oder unangemessene Inhalte zu blocken. 
      Dennoch übernehmen wir keine Gewähr dafür, dass sämtliche unzulässigen Inhalte in jedem Fall erkannt 
      und verhindert werden.
    </p>

    {/* 6. Rechte an Inhalten */}
    <h2 className="text-xl font-semibold mt-8">6. Rechte an Inhalten</h2>
    <ol className="list-decimal list-inside space-y-2">
      <li>
        <strong>Eigentum bei Ihnen:</strong> Die von Ihnen erstellten Inhalte (Videos, Avatare, etc.) 
        verbleiben grundsätzlich in Ihrem Eigentum – vorbehaltlich der Bestimmungen von Heygen und 
        anderen beteiligten Drittanbietern.
      </li>
      <li>
        <strong>Rechtskonformität:</strong> Sie sind dafür verantwortlich, dass keine Rechte Dritter 
        verletzt werden (z. B. Urheberrechte, Persönlichkeitsrechte).
      </li>
      <li>
        <strong>Kennzeichnungspflicht:</strong> Sie erklären sich damit einverstanden, im Falle von 
        KI-generierten Videos oder Stimmen eine entsprechende Kennzeichnung („Dieses Video wurde mit 
        KI erstellt“) vorzunehmen, sofern dies gesetzlich vorgeschrieben ist oder wir bzw. unsere 
        Drittanbieter dies verlangen.
      </li>
      <li>
        <strong>Verarbeitungsrechte:</strong> Mit dem Einstellen oder Erstellen von Inhalten über 
        unsere Plattform räumen Sie uns und den von uns beauftragten Dienstleistern (z. B. Heygen) 
        das Recht ein, diese Inhalte zum Zwecke der Erbringung des Dienstes zu verarbeiten 
        (z. B. Zwischenspeicherung, Bearbeitung, Umwandlung).
      </li>
    </ol>

    {/* 7. Haftungsausschluss und Gewährleistung */}
    <h2 className="text-xl font-semibold mt-8">7. Haftungsausschluss und Gewährleistung</h2>
    <ol className="list-decimal list-inside space-y-2">
      <li>
        <strong>Haftungsausschluss für KI-Generierung:</strong> Wir stellen die Plattform und alle 
        KI-Funktionen „as is“ zur Verfügung und übernehmen keine Garantie für deren Richtigkeit, 
        Genauigkeit oder Eignung für einen bestimmten Zweck. KI-generierte Inhalte können fehlerhaft, 
        unvollständig oder irreführend sein.
      </li>
      <li>
        <strong>Keine Haftung für Schäden:</strong> Wir haften nicht für Schäden, die durch die Nutzung 
        (oder Nicht-Nutzung) von KI-Generierungen, fehlerhaften Angaben oder unterbliebene Kennzeichnungen 
        entstehen. Insbesondere übernehmen wir keine Haftung für direkte, indirekte, zufällige, 
        besondere oder Folgeschäden, es sei denn, diese sind auf grobe Fahrlässigkeit oder Vorsatz 
        unsererseits zurückzuführen.
      </li>
      <li>
        <strong>Haftungsausschluss für rechtswidrige Inhalte:</strong> Für Inhalte, die gegen 
        gesetzliche Vorschriften verstoßen (z. B. pornografisches Material oder Hetze), kann eine 
        Nutzersperrung erfolgen. Wir übernehmen keine Haftung für die von Nutzern erstellten oder 
        hochgeladenen Inhalte.
      </li>
    </ol>

    {/* 8. Laufzeit, Kündigung und Kontolöschung */}
    <h2 className="text-xl font-semibold mt-8">8. Laufzeit, Kündigung und Kontolöschung</h2>
    <ol className="list-decimal list-inside space-y-2">
      <li>
        <strong>Vertragslaufzeit:</strong> Dieser Nutzungsvertrag läuft auf unbestimmte Zeit.
      </li>
      <li>
        <strong>Kündigung durch den Nutzer:</strong> Sie können Ihren Account jederzeit kündigen, indem 
        Sie Ihr Konto löschen oder uns schriftlich (per E-Mail) kontaktieren. Bei Nichtnutzung Ihres 
        Accounts über einen Zeitraum von 1 Jahr sind wir berechtigt, das Konto und alle zugehörigen 
        Inhalte zu löschen.
      </li>
      <li>
        <strong>Verstöße:</strong> Verstöße gegen diese Nutzungsbedingungen können zur sofortigen 
        Sperrung oder Kündigung Ihres Accounts führen. Ein Anspruch auf Wiederherstellung besteht nicht.
      </li>
    </ol>

    {/* 9. Anwendbares Recht und Gerichtsstand */}
    <h2 className="text-xl font-semibold mt-8">9. Anwendbares Recht und Gerichtsstand</h2>
    <p>
      Es gilt das Recht der Bundesrepublik Deutschland. Sofern gesetzlich zulässig, wird als 
      Gerichtsstand der Sitz unseres Unternehmens vereinbart. Dies gilt nicht, sofern besondere 
      Verbraucherschutzvorschriften entgegenstehen.
    </p>

    {/* 10. Änderungen der Nutzungsbedingungen */}
    <h2 className="text-xl font-semibold mt-8">10. Änderungen der Nutzungsbedingungen</h2>
    <p>
      Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern. Wir werden Sie 
      über wesentliche Änderungen rechtzeitig informieren (z. B. per E-Mail-Benachrichtigung oder 
      Hinweis auf unserer Plattform). Sofern Sie den Änderungen nicht zustimmen, steht es Ihnen frei, 
      Ihr Konto zu löschen und die Dienste nicht weiter zu nutzen.
    </p>

    {/* 11. Kontakt */}
    <h2 className="text-xl font-semibold mt-8">11. Kontakt</h2>
    <p>
      Bei Fragen, Beschwerden oder sonstigen Anliegen können Sie uns per E-Mail unter folgender 
      Adresse erreichen:
    </p>
    <pre className="bg-gray-100 p-4">
{`Forever
Julius Kopp und Svenja Fröhlich Kopp GbR
E-Mail: kontakt@ugcs.io
`}
    </pre>
    <p>
      Wir bemühen uns, Ihre Anfragen zeitnah zu bearbeiten und stehen Ihnen gerne für Rückfragen 
      zur Verfügung.
    </p>

    <p className="mt-8 text-sm">
      <em>Stand dieser Fassung: 29. Januar 2025</em>
    </p>
  </div>
</div>


    </WebsiteLayout>
  );
} 