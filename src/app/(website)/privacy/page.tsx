import { WebsiteLayout } from '@/components/global/website-layout';

export default function PrivacyPolicy() {
  return (
    <WebsiteLayout>
    
    
    <div className="max-w-3xl mx-auto px-4 py-16">
  <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

  <div className="prose prose-gray max-w-none space-y-6">
    {/* Haftungsausschluss */}
    <p><strong>Haftungsausschluss:</strong> Bitte beachten Sie, dass die folgenden Informationen sorgfältig und nach bestem Wissen erstellt wurden. Dennoch übernehmen wir keinerlei Gewähr oder Haftung für Vollständigkeit, Richtigkeit und Aktualität. Diese Datenschutzerklärung ersetzt weder eine rechtsverbindliche Beratung noch dient sie als umfassende Rechtsauskunft. Bei individuellen Fragestellungen, Unsicherheiten oder spezifischen rechtlichen Anforderungen empfehlen wir, einen fachkundigen Anwalt oder Datenschutzexperten zu konsultieren. Wir haften nicht für etwaige Schäden oder Verluste, die aus der Nutzung oder dem Vertrauen auf die hier bereitgestellten Informationen entstehen können.</p>

    {/* 1. Allgemeine Hinweise */}
    <h2 className="text-xl font-semibold mt-8">1. Allgemeine Hinweise</h2>
    <p>
      Der Schutz Ihrer persönlichen Daten ist uns, der <strong>Julius Kopp und Svenja Fröhlich Kopp GbR</strong> („wir“, „uns“), 
      ein besonderes Anliegen. Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und Zweck 
      der Verarbeitung personenbezogener Daten auf unserer Plattform und unseren Online-Diensten. Dazu gehört 
      insbesondere unsere KI-Videoerstellungssoftware mit KI-Avataren, Text-to-Video-Funktionen und Voice-Generierung.
      Darüber hinaus erläutern wir hier den Umgang mit Ihren Daten im Rahmen unseres Newsletters, 
      unseres Einsatzes von Google Analytics und Microsoft Clarity sowie sonstiger Tracking- und Analysetools.
    </p>

    {/* 2. Verantwortlicher */}
    <h2 className="text-xl font-semibold mt-8">2. Verantwortlicher</h2>
    <p>
      Verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten im Sinne der DSGVO ist:
    </p>
    <pre className="bg-gray-100 p-4">
{`Julius Kopp und Svenja Fröhlich Kopp GbR
Hauptstr. 106a
76706 Dettenheim
Deutschland
Telefon: +49 151 23402488
E-Mail: kontakt@ugcs.io
`}
    </pre>
    <p>
      Aktuell haben wir keinen Datenschutzbeauftragten benannt. Bei Fragen zum Datenschutz wenden Sie sich bitte 
      direkt an den oben genannten Ansprechpartner.
    </p>

    {/* 3. Erhobene Daten */}
    <h2 className="text-xl font-semibold mt-8">3. Erhobene Daten</h2>
    <p>
      Wir erheben und verarbeiten – abhängig von Ihrer Nutzung unserer Dienste – unterschiedliche Kategorien 
      personenbezogener Daten:
    </p>
    <ol className="list-decimal list-inside space-y-2">
      <li>
        <strong>Stammdaten / Kontaktdaten</strong><br />
        Name, E-Mail-Adresse, Telefonnummer (sofern angegeben), Rechnungs- oder Zahlungsinformationen 
        (bei kostenpflichtiger Nutzung).
      </li>
      <li>
        <strong>Login- und Authentifizierungsdaten</strong><br />
        Benutzername, Passwort (verschlüsselt) sowie Authentifizierungsdaten über externe Anbieter 
        (z. B. Clerk).
      </li>
      <li>
        <strong>Nutzungs- und Metadaten</strong><br />
        IP-Adresse, Browsertyp und -version, Betriebssystem, Datum und Uhrzeit der Zugriffe (Logfiles), 
        ggf. Standortdaten auf Basis der IP-Adresse.
      </li>
      <li>
        <strong>Inhaltsdaten (User-Generated Content)</strong><br />
        Hochgeladene Skripte/Texte zur Video- oder Voice-Erstellung (z. B. an Heygen/ElevenLabs), 
        hochgeladene Bilder oder Videos, generierte bzw. erstellte Videos (einschließlich KI-Avatare).
      </li>
      <li>
        <strong>Kommunikationsdaten</strong><br />
        Inhalte Ihrer Nachrichten, z. B. im Kontaktformular oder via E-Mail, Newsletter-Anmeldedaten 
        (E-Mail-Adresse, ggf. Uhrzeit der Anmeldung).
      </li>
    </ol>

    {/* 4. Zweck der Datenverarbeitung */}
    <h2 className="text-xl font-semibold mt-8">4. Zweck der Datenverarbeitung</h2>
    <p>
      Wir verarbeiten Ihre personenbezogenen Daten insbesondere zu folgenden Zwecken:
    </p>
    <ol className="list-decimal list-inside space-y-2">
      <li>
        <strong>Bereitstellung und Verwaltung unserer KI-Videoerstellungssoftware und Online-Dienste</strong><br />
        z. B. Erstellung und Personalisierung von KI-generierten Videos und Avataren.
      </li>
      <li>
        <strong>Zahlungsabwicklung</strong><br />
        z. B. über Stripe (bei kostenpflichtigen Diensten).
      </li>
      <li>
        <strong>Kommunikation mit Ihnen</strong><br />
        etwa bei Support-Anfragen oder für die Zustellung wichtiger Informationen.
      </li>
      <li>
        <strong>Analyse, Verbesserung und Sicherheit unserer Angebote</strong><br />
        z. B. Fehlerbehebung, technische Analysen, Performance-Optimierung.
      </li>
      <li>
        <strong>Versand von Newslettern / Marketing-Informationen</strong><br />
        Nach Ihrer Registrierung verwenden wir die von Ihnen angegebene E-Mail-Adresse, 
        um Ihnen unseren Newsletter und weitere relevante Informationen zu unseren Produkten 
        und Dienstleistungen zukommen zu lassen.
      </li>
      <li>
        <strong>Einhaltung gesetzlicher Verpflichtungen</strong><br />
        z. B. steuer- und handelsrechtliche Aufbewahrungsfristen.
      </li>
    </ol>

    {/* 5. Rechtsgrundlagen */}
    <h2 className="text-xl font-semibold mt-8">5. Rechtsgrundlagen</h2>
    <p>Die Rechtsgrundlagen für die Verarbeitung Ihrer Daten ergeben sich insbesondere aus der DSGVO:</p>
    <ul className="list-disc list-inside space-y-2">
      <li><strong>Art. 6 Abs. 1 lit. b DSGVO</strong>: Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen</li>
      <li><strong>Art. 6 Abs. 1 lit. a DSGVO</strong>: Einwilligung (z. B. für Newsletter, Cookies zu Marketingzwecken)</li>
      <li><strong>Art. 6 Abs. 1 lit. f DSGVO</strong>: Berechtigte Interessen (z. B. IT-Sicherheit, Missbrauchsprävention)</li>
      <li><strong>Art. 6 Abs. 1 lit. c DSGVO</strong>: Erfüllung gesetzlicher Pflichten</li>
    </ul>

    {/* 6. Verwendung Ihrer E-Mail-Adresse für den Newsletter */}
    <h2 className="text-xl font-semibold mt-8">6. Verwendung Ihrer E-Mail-Adresse für den Newsletter</h2>
    <p>
      Nach Ihrer Registrierung auf unserer Plattform nutzen wir Ihre E-Mail-Adresse, um Ihnen unseren Newsletter 
      zuzusenden, sofern Sie dem nicht ausdrücklich widersprochen haben. Hierbei informieren wir Sie über 
      Produktneuheiten, Angebote und andere Neuigkeiten rund um unsere Dienste.
    </p>
    <p>
      <strong>Abmeldung:</strong> Sie können sich jederzeit vom Newsletter abmelden, indem Sie den in jeder 
      Newsletter-E-Mail angegebenen Abmeldelink nutzen oder uns eine Nachricht an{" "}
      <a href="mailto:kontakt@ugcs.io">kontakt@ugcs.io</a> schicken. Die Rechtmäßigkeit der bis zum Widerruf 
      erfolgten Verarbeitung bleibt hiervon unberührt.
    </p>

    {/* 7. Datenweitergabe */}
    <h2 className="text-xl font-semibold mt-8">7. Datenweitergabe</h2>
    <p>
      Eine Weitergabe Ihrer Daten an Dritte erfolgt nur, wenn:
    </p>
    <ul className="list-disc list-inside space-y-2">
      <li>dies zur Erfüllung unserer vertraglichen Pflichten notwendig ist,</li>
      <li>Sie ausdrücklich eingewilligt haben,</li>
      <li>wir dazu gesetzlich verpflichtet sind oder</li>
      <li>unsere berechtigten Interessen (z. B. Rechtsdurchsetzung) dies erfordern.</li>
    </ul>
    <p>Zu den Empfängern Ihrer Daten können insbesondere folgende Anbieter gehören:</p>
    <ol className="list-decimal list-inside space-y-2">
      <li>Heygen / ElevenLabs (KI-Avatare &amp; Sprachgenerierung) – Verarbeitung in den USA möglich</li>
      <li>Stripe (Zahlungsdienstleister)</li>
      <li>Google Cloud / GoDaddy (Hosting und Infrastruktur)</li>
      <li>Clerk (Authentifizierungsdienst)</li>
      <li>beehiiv (Newsletter-Service)</li>
      <li>Altan.ai (zusätzliche KI-Funktionalitäten)</li>
    </ol>

    {/* 8. Cookies und Tracking-Technologien */}
    <h2 className="text-xl font-semibold mt-8">8. Cookies und Tracking-Technologien</h2>
    <p>
      Wir verwenden Cookies und ähnliche Technologien, um unsere Dienste bereitzustellen und zu verbessern. 
      Bestimmte Cookies sind für den Betrieb unserer Website technisch notwendig; andere dienen statistischen 
      oder Marketing-Zwecken.
    </p>

    {/* 8.1 Google Analytics */}
    <h3 className="text-lg font-semibold mt-6">8.1 Google Analytics</h3>
    <p>
      Wir nutzen Google Analytics, einen Webanalysedienst der Google Ireland Limited, um Ihr Nutzerverhalten 
      auf unserer Website auszuwerten. Google Analytics verwendet Cookies, die eine Analyse Ihrer Nutzung 
      der Website ermöglichen. Die dadurch erzeugten Informationen (einschließlich Ihrer IP-Adresse) werden 
      in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
    </p>
    <ul className="list-disc list-inside space-y-2">
      <li><strong>Zweck:</strong> Analyse der Website-Nutzung, Reichweitenmessung, Optimierung unseres Angebots.</li>
      <li><strong>Rechtsgrundlage:</strong> Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</li>
      <li><strong>Speicherdauer:</strong> Abhängig von Ihren Browsereinstellungen und unseren Konfigurationen in Google Analytics.</li>
    </ul>
    <p>
      Sie können der Erfassung Ihrer Daten durch Google Analytics widersprechen, indem Sie entsprechende 
      Browser-Add-ons installieren oder Ihre Cookie-Einstellungen anpassen.
    </p>

    {/* 8.2 Microsoft Clarity */}
    <h3 className="text-lg font-semibold mt-6">8.2 Microsoft Clarity</h3>
    <p>
      Wir nutzen Microsoft Clarity, ein Analysetool von Microsoft, um das Verhalten der Nutzer auf unserer 
      Website besser zu verstehen und unsere Produkte bzw. Werbemaßnahmen zu verbessern. Microsoft Clarity 
      ermöglicht u. a. Verhaltensaufzeichnungen, Heatmaps und Session-Replays.
    </p>
    <ul className="list-disc list-inside space-y-2">
      <li><strong>Zweck:</strong> Verbesserung der Nutzererfahrung, Analyse des Website-Verhaltens, Identifikation von Problemstellen.</li>
      <li><strong>Rechtsgrundlage:</strong> Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</li>
      <li><strong>Verarbeitete Daten:</strong> Verhaltensdaten (z. B. Klicks, Mausbewegungen, Scroll-Verhalten) und technische Informationen (z. B. Browser, Betriebssystem).</li>
    </ul>
    <p>
      <strong>Site Disclosure (gemäß Empfehlung von Microsoft):</strong><br />
      „Wir verbessern unsere Produkte und unsere Werbung, indem wir Microsoft Clarity einsetzen, um zu sehen, 
      wie Sie unsere Website nutzen. Durch die Nutzung unserer Seite erklären Sie sich damit einverstanden, 
      dass wir und Microsoft diese Daten sammeln und verwenden dürfen. Weitere Informationen finden Sie in 
      unserer Datenschutzerklärung sowie in der{" "}
      <a href="https://privacy.microsoft.com" target="_blank" rel="noopener noreferrer">
        Microsoft-Datenschutzerklärung
      </a>
      .“
    </p>

    {/* 8.3 Weitere Tracking-Technologien */}
    <h3 className="text-lg font-semibold mt-6">8.3 Weitere Tracking-Technologien</h3>
    <ul className="list-disc list-inside space-y-2">
      <li><strong>Facebook Pixel:</strong> Dient zur Conversion-Messung und interessenbezogenen Werbung auf Facebook/Instagram.</li>
      <li><strong>Technisch notwendige Cookies:</strong> Zur Sicherstellung grundlegender Funktionen (z. B. Login, Warenkorb).</li>
    </ul>

    {/* 9. Speicherdauer */}
    <h2 className="text-xl font-semibold mt-8">9. Speicherdauer</h2>
    <p>
      Wir speichern personenbezogene Daten nur so lange, wie dies für den jeweiligen Zweck erforderlich ist 
      oder gesetzliche Vorschriften (z. B. Aufbewahrungsfristen von bis zu 10 Jahren) es vorsehen.
    </p>
    <p>
      <strong>Wichtig:</strong> Beachten Sie, dass erstellte Videos und Inhalte bei uns nicht gelöscht werden können, 
      sobald sie generiert worden sind. Nutzerkonten können hingegen auf Anfrage oder innerhalb der Kontoeinstellungen 
      gelöscht werden. Nach einer Kontolöschung werden jedoch ggf. noch Kopien und Sicherheitsbackups innerhalb unserer 
      Systeme und der unserer Dienstleister für einen begrenzten Zeitraum gespeichert, bis auch diese routinemäßig 
      gelöscht werden.
    </p>

    {/* 10. Ihre Rechte */}
    <h2 className="text-xl font-semibold mt-8">10. Ihre Rechte</h2>
    <p>Als betroffene Person haben Sie folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
    <ul className="list-disc list-inside space-y-2">
      <li>Auskunft (Art. 15 DSGVO)</li>
      <li>Berichtigung (Art. 16 DSGVO)</li>
      <li>Löschung (Art. 17 DSGVO)</li>
      <li>Einschränkung (Art. 18 DSGVO)</li>
      <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
      <li>Widerspruch (Art. 21 DSGVO)</li>
      <li>Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
      <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
    </ul>
    <p>
      Um Ihre Rechte geltend zu machen, kontaktieren Sie uns bitte unter den angegebenen Kontaktdaten. 
      Wir sind berechtigt, weitere Informationen zur Bestätigung Ihrer Identität anzufordern, 
      um Ihre Rechte zu schützen.
    </p>

    {/* 11. Änderungen der Datenschutzerklärung */}
    <h2 className="text-xl font-semibold mt-8">11. Änderungen der Datenschutzerklärung</h2>
    <p>
      Wir behalten uns vor, diese Datenschutzerklärung jederzeit zu ändern, etwa bei neuen Rechtsgrundlagen 
      oder Änderungen unserer Dienste. Die aktuelle Fassung finden Sie stets auf unserer Website. 
      Bei wesentlichen Änderungen informieren wir Sie, soweit möglich, auf geeignete Weise (z. B. per E-Mail).
    </p>

    {/* 12. Kontakt */}
    <h2 className="text-xl font-semibold mt-8">12. Kontakt</h2>
    <p>
      Wenn Sie Fragen zur Verarbeitung Ihrer personenbezogenen Daten oder zur Ausübung Ihrer Rechte haben, 
      kontaktieren Sie uns bitte unter folgenden Kontaktdaten:
    </p>
    <pre className="bg-gray-100 p-4">
{`Julius Kopp und Svenja Fröhlich Kopp GbR
Hauptstr. 106a
76706 Dettenheim
Deutschland
E-Mail: kontakt@ugcs.io
Telefon: +49 151 23402488
`}
    </pre>
    <p>
      Wir danken Ihnen für Ihr Vertrauen und Ihre Aufmerksamkeit. Sollten sich weitere Fragen ergeben, 
      zögern Sie nicht, uns direkt zu kontaktieren.
    </p>

    <p className="mt-8 text-sm">
      <em>Stand dieser Fassung: 29. Januar 2025</em>
    </p>
  </div>
</div>


    </WebsiteLayout>
  );
} 