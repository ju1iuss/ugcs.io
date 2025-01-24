"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-20">
        {/* Guide Pill */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium">
            GUIDE
          </div>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 md:mb-6 tracking-tight">
          Wie du UGC Videos mit KI erstellst, die realistisch aussehen.
        </h1>
        <p className="text-gray-600 text-center mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
          Lerne Schritt für Schritt, wie du professionelle UGC Videos mit KI erstellst
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
          <Link href="#content">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-black hover:bg-gray-800 text-sm md:text-base py-4 md:py-6 px-6 md:px-8"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('content');
                const offset = 100; // Adjust this value to control scroll distance
                const elementPosition = element?.getBoundingClientRect().top ?? 0;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
                });
              }}
            >
              Guide Lesen
            </Button>
          </Link>
          <Link href="https://www.loom.com/share/2a269098ea7042e49425b17bc7c6cf3b?sid=f142a92d-b7ed-46e7-b32c-7c84f9531ac7">
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto text-sm md:text-base py-4 md:py-6 px-6 md:px-8"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              Video ansehen
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div id="content" className="max-w-3xl mx-auto px-4 pb-12 md:pb-20">
        <Accordion type="single" collapsible className="w-full space-y-4 md:space-y-6">
          <AccordionItem value="section-1" className="border rounded-xl px-6 py-2 shadow-sm">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  1
                </div>
                <span>Die richtige KI-UGC-Plattform</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-4">
                  Damit deine Anzeigen wirklich performen, brauchst du eine Plattform mit diesen Eigenschaften:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-600">
                  <li>
                    <strong>Lizenzierte Creator:</strong> Damit deine Anzeigen nicht gesperrt werden
                  </li>
                  <li>
                    <strong>Realistische Avatare:</strong> Die authentisch wirken und nicht wie Roboter
                  </li>
                  <li>
                    <strong>Schnelle Erstellung:</strong> Unter 10 Minuten vom Konzept zum fertigen Video
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Tipp:</strong> ugcs.io ist die momentan beste Deutsche Software für KI generierte 
                    Talking Head Videos. <a 
  href="https://ugcs.io" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-blue-800 hover:text-purple-800 underline"
>
  Jetzt ausprobieren.
</a>
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section-2" className="border rounded-xl px-6 py-2 shadow-sm">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  2
                </div>
                <span>Ein Skript, das funktioniert</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="font-medium mb-4">Die perfekte Skript-Struktur:</p>
                <ul className="list-disc pl-6 space-y-3 text-gray-600">
                  <li>
                    <strong>Hook:</strong> Schockiere den Zuschauer – sag etwas, das ihn zum Nachdenken bringt. 
                    Nutze einfache Sprache.
                  </li>
                  <li>
                    <strong>Line:</strong> Warum sollte er weiterschauen? Liefere sofort Mehrwert.
                  </li>
                  <li>
                    <strong>Features:</strong> Stelle 1-2 wichtige Eigenschaften oder Vorteile heraus.
                  </li>
                  <li>
                    <strong>Angebot:</strong> Warum sollte der Zuschauer jetzt handeln? Rabatt, Mehrwert oder Boni.
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section-3" className="border rounded-xl px-6 py-2 shadow-sm">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  3
                </div>
                <span>Creator auswählen & Videos erstellen</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-4">
                  Der Prozess ist einfach: Skript einfügen, Video generieren – fertig.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Tipp:</strong> Auf <a 
  href="https://ugcs.io" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-blue-800 hover:text-purple-800 underline"
>
Ugcs.io
</a> hast du die Auswahl aus über 15+ KI-Creators.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section-4" className="border rounded-xl px-6 py-2 shadow-sm">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  4
                </div>
                <span>Inhalte posten und clever nutzen</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="font-medium mb-4">Beispiele, wie du die Videos verwenden kannst:</p>
                <ul className="list-disc pl-6 space-y-3 text-gray-600">
                  <li>
                    <strong>Talking-Head-Style:</strong> Person spricht direkt zur Kamera
                  </li>
                  <li>
                    <strong>Produktvideos:</strong> Avatar hält dein Produkt in die Kamera
                  </li>
                  <li>
                    <strong>Recycelte Inhalte:</strong> z. B. B-Roll mit deinen bisherigen Clips
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section-5" className="border rounded-xl px-6 py-2 shadow-sm">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  5
                </div>
                <span>Optimierung & Export</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="font-medium mb-4">Finale Schritte:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Überprüfe die Lippensynchronisation</li>
                  <li>Stelle sicher, dass die Botschaft klar ist</li>
                  <li>Füge bei Bedarf Untertitel hinzu</li>
                  <li>Exportiere in der gewünschten Qualität</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section-6" className="border rounded-xl px-6 py-2 shadow-sm">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  6
                </div>
                <span>Best Practices</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="font-medium mb-4">Tipps für gute Praktiken:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Teste verschiedene Avatare und Stile</li>
                  <li>Halte die Videos kurz und fokussiert</li>
                  <li>Nutze authentische Sprache</li>
                  <li>Experimentiere mit verschiedenen Formaten</li>
                  <li>Analysiere die Performance deiner Videos</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 text-center bg-gradient-to-b from-purple-50 to-white rounded-xl md:rounded-2xl p-6 md:p-8">
          <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium w-fit mx-auto mb-4">
            🎉 LinkedIn SALE: 34% Rabatt auf den Starter Plan
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            Bereit dein erstes Video zu erstellen?
          </h2>
          <p className="text-gray-600 mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">
            Starte jetzt und erstelle dein erstes KI-generiertes UGC Video in weniger als 5 Minuten
          </p>
          <Link href="/sign-up">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-black hover:bg-gray-800 text-sm md:text-base py-4 md:py-6 px-6 md:px-8"
            >
              👉 Jetzt ausprobieren
            </Button>
          </Link>
        </div>
      </div>

      {/* Example Videos Section - Moved to bottom */}
      <div className="w-full bg-gray-50 py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-xl md:text-2xl font-semibold text-center mb-6 md:mb-8">
            Beispiel Videos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              "https://api.altan.ai/platform/media/69677eaa-d241-4ec0-8cb5-4895d0aa1c12?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/87b85fae-2944-463c-9b9c-aa2f77bccd28?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
           
              "https://api.altan.ai/platform/media/eaf1fc38-c7e1-4da8-b8eb-3a16a584ecf6?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/17af25f8-5f4c-4ceb-9262-38444b2f9906?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
            ].map((src, index) => (
              <div key={index} className="aspect-[9/16] relative rounded-lg overflow-hidden shadow-sm">
                <Image 
                  src={src}
                  alt={`Example ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8 md:py-12 border-t">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
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
            <h4 className="font-semibold mb-3 md:mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/#examples">Demo</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 md:mb-4">Unternehmen</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about">Über uns</Link></li>
              <li><Link href="/contact">Kontakt</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 md:mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/privacy">Datenschutzerklärung</Link></li>
              <li><Link href="/terms">Nutzungsbedingungen</Link></li>
              <li><Link href="/impressum">Impressum</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-8 md:mt-12 text-center text-sm text-gray-600">
          @ 2025 Forever.
        </div>
      </footer>
    </div>
  );
} 