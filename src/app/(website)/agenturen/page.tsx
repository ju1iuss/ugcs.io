"use client";

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from "@clerk/nextjs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AgencyPage() {
  const { userId } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Video Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <video 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="https://api.altan.ai/platform/media/73adf8a2-9382-4171-be25-18b306146388?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d" type="video/mp4" />
          </video>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl">
          <Badge className="mb-4 text-sm bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors">
            Für Performance Marketing Agenturen
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            3x deinen ROAS, während du deine Content-Kosten um 90% senkst!
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Hochperformanter UGC – automatisiert mit KI in Sekunden erstellt.
            Perfekt für TikTok Ads, Instagram & YouTube Shorts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={userId ? "/dashboard" : "/sign-up"}>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Kostenlos testen
              </Button>
            </Link>
            <a 
              href="https://calendly.com/ai-ugcs/30min" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Demo vereinbaren
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Die häufigsten Probleme von Agenturen beim UGC
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Hohe Creator-Kosten",
                description: "Teure Creator & lange Verhandlungen fressen Budget & Zeit",
                icon: "💰"
              },
              {
                title: "Schwankende Qualität",
                description: "Unzuverlässige Creator & inkonsistente Ergebnisse",
                icon: "📉"
              },
              {
                title: "Langsame Produktion",
                description: "Wochen Wartezeit für neue Creatives blockieren Kampagnen",
                icon: "⏰"
              }
            ].map((pain, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="text-4xl mb-4">{pain.icon}</div>
                  <CardTitle>{pain.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{pain.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section with Tabs */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Die Lösung: KI-UGC in Sekunden
          </h2>
          <Tabs defaultValue="creation" className="w-full">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2 mx-auto mb-8">
              <TabsTrigger value="creation">Erstellung</TabsTrigger>
              <TabsTrigger value="benefits">Vorteile</TabsTrigger>
            </TabsList>
            <TabsContent value="creation">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <video 
                    className="rounded-lg shadow-xl w-full"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  >
                    <source src="https://api.altan.ai/platform/media/b61c5c1e-c4ff-4c5d-be18-7de70a2e6307?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d" type="video/mp4" />
                  </video>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-lg">1️⃣</div>
                    <div>
                      <h3 className="font-semibold mb-2">Script eingeben oder KI generieren lassen</h3>
                      <p className="text-gray-600">Nutze unsere KI für optimierte Ad-Scripts oder gib deine eigenen ein.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-lg">2️⃣</div>
                    <div>
                      <h3 className="font-semibold mb-2">Avatar & Stimme wählen</h3>
                      <p className="text-gray-600">Wähle aus verschiedenen Avataren und Stimmen für deine Zielgruppe.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-lg">3️⃣</div>
                    <div>
                      <h3 className="font-semibold mb-2">Video generieren & nutzen</h3>
                      <p className="text-gray-600">In Sekunden generiert, sofort einsatzbereit für deine Ads.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="benefits">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "90% Kostenersparnis",
                    description: "Spare tausende Euro im Vergleich zu echten Creators",
                    icon: "💰"
                  },
                  {
                    title: "Unbegrenzte Iterationen",
                    description: "Teste verschiedene Versionen für maximale Performance",
                    icon: "🔄"
                  },
                  {
                    title: "Sofortige Ergebnisse",
                    description: "Keine Wartezeiten mehr - Videos in Sekunden",
                    icon: "⚡"
                  }
                ].map((benefit, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="text-4xl mb-4">{benefit.icon}</div>
                      <CardTitle>{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Was Performance Marketing Agenturen sagen
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "Seit wir die KI-UGC Plattform nutzen, sparen wir tausende Euro pro Monat und haben einen konstanten Strom an performanten Creatives.",
                author: "Max Mustermann",
                role: "Performance Marketing Manager",
                image: "https://api.altan.ai/platform/media/9e563482-68af-4a46-9e76-42af24259c14?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
              },
              {
                quote: "Die Möglichkeit, schnell verschiedene Versionen zu testen, hat unseren ROAS deutlich verbessert. Ein Game-Changer für unsere Agentur.",
                author: "Sarah Schmidt",
                role: "Head of Paid Social",
                image: "https://api.altan.ai/platform/media/a6fef1a0-3116-4904-96d0-0c8c6faeb055?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bereit deine UGC-Produktion zu revolutionieren?
          </h2>
          <p className="text-xl mb-8">
            Starte jetzt und erstelle deine ersten Videos kostenlos!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={userId ? "/dashboard" : "/sign-up"}>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Kostenlos testen
              </Button>
            </Link>
            <a 
              href="https://calendly.com/ai-ugcs/30min" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Demo vereinbaren
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 