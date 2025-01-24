import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 w-screen -mx-[calc((100vw-100%)/2)] px-[calc((100vw-100%)/2)]">
        <header className="max-w-5xl mx-auto flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/favicon.ico"
              alt="Ugcs.io Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-semibold">Ugcs.io</span>
          </div>
            
          <nav className="flex items-center space-x-8">
            <Link 
              href="/#examples" 
              className="text-gray-600 hover:text-gray-900"
            >
              Produkt
            </Link>
            <Link 
              href="/#pricing" 
              className="text-gray-600 hover:text-gray-900"
            >
              Pricing
            </Link>
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                Einloggen
              </Link>
              <Link href="/pricing">
                <Button variant="default" className="bg-black hover:bg-gray-800 text-white">
                  Registrieren
                </Button>
              </Link>
            </div>
          </nav>
        </header>
      </div>

      {/* Main Content */}
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

      {/* Footer */}
      <footer className="px-6 py-12 border-t">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/favicon.ico"
                alt="Ugcs.io Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-semibold">Ugcs.io</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/#examples">Demo</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Unternehmen</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about">Über uns</Link></li>
              <li><Link href="/contact">Kontakt</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/privacy">Datenschutzerklärung</Link></li>
              <li><Link href="/terms">Nutzungsbedingungen</Link></li>
              <li><Link href="/impressum">Impressum</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-12 text-center text-sm text-gray-600">
          @ 2025 Forever.
        </div>
      </footer>
    </div>
  );
} 