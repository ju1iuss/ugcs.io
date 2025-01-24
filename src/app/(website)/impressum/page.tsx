export default function ImpressumPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Impressum</h1>
      
      <div className="prose prose-gray max-w-none">
        <p className="text-lg mb-8">
          Forever Julius Kopp und Svenja Fröhlich Kopp GbR – gegründet, um etwas zu bewegen!
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Angaben gemäß § 5 TMG
        </h2>
        <p>Verantwortlich für diese Webseite:</p>
        
        <p className="mt-4">
          Julius Kopp<br />
          Geschäftsführer
        </p>

        <h3 className="text-lg font-semibold mt-8 mb-2">Adresse:</h3>
        <p>
          Hauptstr. 106a<br />
          76706 Dettenheim
        </p>

        <h3 className="text-lg font-semibold mt-8 mb-2">Kontakt:</h3>
        <p>
          E-Mail: kontakt@ugcs.io<br />
          Telefon: 0151 234 02488
        </p>

        <h2 className="text-xl font-semibold mt-12 mb-4">
          Haftungsausschluss
        </h2>
        <p className="mb-4">
          Wir geben unser Bestes, um alle Inhalte auf dieser Seite aktuell, vollständig und 
          korrekt zu halten. Sollte uns trotzdem ein Fehler unterlaufen, freuen wir uns, 
          wenn du uns darauf hinweist – so können wir es schnellstmöglich korrigieren.
        </p>
        <p>
          Trotz sorgfältiger Kontrolle übernehmen wir keine Haftung für die Inhalte externer 
          Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber 
          verantwortlich.
        </p>
      </div>
    </main>
  );
} 