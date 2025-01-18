import { WebsiteLayout } from '@/components/global/website-layout';

export default function PrivacyPolicy() {
  return (
    <WebsiteLayout>
    <div className="max-w-3xl mx-auto px-4 py-16">
  <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

  <div className="prose prose-gray max-w-none">
    {/* Langer Intro-Text mit Haftungsausschluss */}
    <p>
      <strong>Haftungsausschluss:</strong> Bitte beachten Sie, dass die folgenden Informationen sorgfältig
      und nach bestem Wissen erstellt wurden. Dennoch übernehmen wir keinerlei Gewähr oder Haftung für
      Vollständigkeit, Richtigkeit und Aktualität. Diese Datenschutzerklärung ersetzt weder eine
      rechtsverbindliche Beratung noch dient sie als umfassende Rechtsauskunft. Wir empfehlen Ihnen bei
      individuellen Fragestellungen, Unsicherheiten oder spezifischen rechtlichen Anforderungen, einen
      fachkundigen Anwalt oder Datenschutzexperten zu konsultieren. Wir haften nicht für etwaige Schäden
      oder Verluste, die aus der Nutzung oder dem Vertrauen auf die hier bereitgestellten Informationen
      entstehen können.
    </p>

    <h2>1. Allgemeine Hinweise</h2>
    <p>
      Der Schutz Ihrer persönlichen Daten ist uns, der Julius Kopp und Svenja Fröhlich Kopp GbR
      ("wir", "uns"), ein besonderes Anliegen. Diese Datenschutzerklärung informiert Sie über die Art,
      den Umfang und Zweck der Verarbeitung personenbezogener Daten auf unserer Plattform und unseren
      Online-Diensten. Dazu gehört insbesondere unsere KI-Videoerstellungssoftware mit KI-Avataren,
      Text-to-Video-Funktionen und Voice-Generierung.
    </p>

    <h2>2. Verantwortlicher</h2>
    <p>
      Verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten im Sinne der DSGVO ist:<br />
      <br />
      Julius Kopp und Svenja Fröhlich Kopp GbR<br />
      Hauptstr. 106a<br />
      76706 Dettenheim<br />
      Deutschland<br />
      Telefon: +49 151 23402488<br />
      E-Mail: <a href="mailto:kontakt@ugcs.io">kontakt@ugcs.io</a>
    </p>
    <p>
      Aktuell haben wir keinen Datenschutzbeauftragten benannt. Bei Fragen zu Ihrem Datenschutz
      wenden Sie sich bitte direkt an den oben genannten Ansprechpartner.
    </p>

    <h2>3. Erhobene Daten</h2>
    <p>
      Wir erheben und verarbeiten, je nach Nutzung unserer Dienste, unterschiedliche Kategorien
      personenbezogener Daten:
    </p>
    <p>
      <strong>(a) Stammdaten / Kontaktdaten</strong><br />
      - Name, E-Mail-Adresse, Telefonnummer (sofern angegeben)<br />
      - Rechnungs- oder Zahlungsinformationen (bei kostenpflichtiger Nutzung)
    </p>
    <p>
      <strong>(b) Login- und Authentifizierungsdaten</strong><br />
      - Benutzername, Passwort (verschlüsselt)<br />
      - Authentifizierungsdaten über externe Anbieter (z. B. Clerk)
    </p>
    <p>
      <strong>(c) Nutzungs- und Metadaten</strong><br />
      - IP-Adresse, Browsertyp und -version, Betriebssystem<br />
      - Datum und Uhrzeit der Zugriffe (Logfiles)<br />
      - ggf. Standortdaten auf Basis der IP-Adresse
    </p>
    <p>
      <strong>(d) Inhaltsdaten (User-Generated Content)</strong><br />
      - Hochgeladene Skripte/Texte zur Video- oder Voice-Erstellung (z. B. an Heygen/ElevenLabs)<br />
      - Hochgeladene Bilder oder Videos<br />
      - Generierte bzw. erstellte Videos (einschließlich KI-Avatare)
    </p>
    <p>
      <strong>(e) Kommunikationsdaten</strong><br />
      - Inhalte Ihrer Nachrichten, z. B. im Kontaktformular oder via E-Mail<br />
      - Newsletter-Anmeldedaten (E-Mail-Adresse, ggf. Uhrzeit der Anmeldung)
    </p>

    <h2>4. Zweck der Datenverarbeitung</h2>
    <p>
      Wir verarbeiten Ihre personenbezogenen Daten insbesondere zu folgenden Zwecken:
    </p>
    <p>
      (a) Zur Bereitstellung und Verwaltung unserer KI-Videoerstellungssoftware und Online-Dienste<br />
      (b) Zur Zahlungsabwicklung (z. B. via Stripe)<br />
      (c) Zur Kommunikation mit Ihnen, etwa bei Support-Anfragen<br />
      (d) Zur Analyse, Verbesserung und Sicherheit unserer Angebote (z. B. Fehlerbehebung)<br />
      (e) Zur Einhaltung gesetzlicher Verpflichtungen (z. B. steuer- und handelsrechtliche Aufbewahrung)
    </p>

    <h2>5. Rechtsgrundlagen</h2>
    <p>
      Die Rechtsgrundlagen für die Verarbeitung Ihrer Daten ergeben sich aus der DSGVO, insbesondere:
    </p>
    <p>
      (a) <strong>Art. 6 Abs. 1 lit. b DSGVO</strong>: Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen<br />
      (b) <strong>Art. 6 Abs. 1 lit. a DSGVO</strong>: Einwilligung (z. B. für Newsletter, Cookies zu Marketingzwecken)<br />
      (c) <strong>Art. 6 Abs. 1 lit. f DSGVO</strong>: Berechtigte Interessen (z. B. IT-Sicherheit, Missbrauchsprävention)<br />
      (d) <strong>Art. 6 Abs. 1 lit. c DSGVO</strong>: Erfüllung gesetzlicher Pflichten
    </p>

    <h2>6. Datenweitergabe</h2>
    <p>
      Eine Weitergabe Ihrer Daten an Dritte erfolgt nur, wenn:
    </p>
    <p>
      - dies zur Erfüllung unserer vertraglichen Pflichten notwendig ist,<br />
      - Sie ausdrücklich eingewilligt haben,<br />
      - wir dazu gesetzlich verpflichtet sind oder<br />
      - unsere berechtigten Interessen (z. B. Rechtsdurchsetzung) dies erfordern.
    </p>
    <p>
      Zu den Empfängern Ihrer Daten können insbesondere folgende Anbieter gehören:
    </p>
    <p>
      <strong>(a) Heygen / ElevenLabs</strong> (KI-Avatare & Sprachgenerierung) – Verarbeitung in den USA möglich<br />
      <strong>(b) Stripe</strong> (Zahlungsdienstleister)<br />
      <strong>(c) Google Cloud / GoDaddy</strong> (Hosting und Infrastruktur)<br />
      <strong>(d) Clerk</strong> (Authentifizierungsdienst)<br />
      <strong>(e) beehiiv</strong> (Newsletter-Service)<br />
      <strong>(f) Altan.ai</strong> (zusätzliche KI-Funktionalitäten)
    </p>

    <h2>7. Cookies</h2>
    <p>
      Wir verwenden Cookies und ähnliche Technologien, um unsere Dienste bereitzustellen und zu
      verbessern. Bestimmte Cookies sind für den Betrieb unserer Website technisch notwendig, andere
      dienen statistischen oder Marketing-Zwecken (z. B. Google Analytics, Facebook Pixel).
    </p>
    <p>
      - <strong>Google Analytics:</strong> Dient zur Analyse Ihrer Nutzung unserer Website.<br />
      - <strong>Facebook Pixel:</strong> Dient zur Conversion-Messung und interessenbezogenen Werbung auf Facebook/Instagram.
    </p>
    <p>
      Die Rechtsgrundlage für das Setzen nicht zwingend notwendiger Cookies ist Ihre Einwilligung
      (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Cookie-Einstellungen jederzeit in Ihrem Browser
      ändern oder Cookies blockieren.
    </p>

    <h2>8. Speicherdauer</h2>
    <p>
      Wir speichern personenbezogene Daten nur so lange, wie dies für den jeweiligen Zweck
      erforderlich ist oder gesetzliche Vorschriften (z. B. Aufbewahrungsfristen von bis zu 10 Jahren)
      es vorsehen. Beachten Sie jedoch, dass erstellte Videos und Inhalte bei uns nicht gelöscht
      werden können, sobald sie erstellt worden sind. Nutzerkonten können hingegen auf Anfrage
      oder innerhalb der Kontoeinstellungen gelöscht werden.
    </p>

    <h2>9. Ihre Rechte</h2>
    <p>
      Als betroffene Person haben Sie folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:
    </p>
    <p>
      (a) <strong>Auskunft (Art. 15 DSGVO)</strong><br />
      (b) <strong>Berichtigung (Art. 16 DSGVO)</strong><br />
      (c) <strong>Löschung (Art. 17 DSGVO)</strong><br />
      (d) <strong>Einschränkung (Art. 18 DSGVO)</strong><br />
      (e) <strong>Datenübertragbarkeit (Art. 20 DSGVO)</strong><br />
      (f) <strong>Widerspruch (Art. 21 DSGVO)</strong><br />
      (g) <strong>Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</strong><br />
      (h) <strong>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</strong>
    </p>
    <p>
      Um Ihre Rechte geltend zu machen, kontaktieren Sie uns bitte unter den angegebenen Kontaktdaten.
      Wir sind berechtigt, weitere Informationen zur Bestätigung Ihrer Identität anzufordern, um Ihre
      Rechte zu schützen.
    </p>

    <h2>10. Änderungen der Datenschutzerklärung</h2>
    <p>
      Wir behalten uns vor, diese Datenschutzerklärung jederzeit zu ändern, etwa bei neuen
      Rechtsgrundlagen oder Änderungen unserer Dienste. Die aktuelle Fassung finden Sie stets auf
      unserer Website. Bei wesentlichen Änderungen informieren wir Sie, soweit möglich, auf
      geeignete Weise.
    </p>

    <h2>11. Kontakt</h2>
    <p>
      Wenn Sie Fragen zur Verarbeitung Ihrer personenbezogenen Daten oder zur Ausübung Ihrer Rechte
      haben, kontaktieren Sie uns bitte unter folgenden Kontaktdaten:
    </p>
    <p>
      Julius Kopp und Svenja Fröhlich Kopp GbR<br />
      Hauptstr. 106a<br />
      76706 Dettenheim<br />
      Deutschland<br />
      E-Mail: <a href="mailto:kontakt@ugcs.io">kontakt@ugcs.io</a><br />
      Telefon: +49 151 23402488
    </p>
  </div>
</div>

    </WebsiteLayout>
  );
} 