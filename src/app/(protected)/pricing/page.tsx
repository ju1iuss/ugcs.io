"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CreditDrawer } from "@/components/global/pricing/credit-drawer"
import { useUser } from "@clerk/nextjs";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const { user } = useUser();

  const starterPrice = isYearly ? "15.17" : "19";
  const creatorPrice = isYearly ? "39.17" : "49";
  const agencyPrice = isYearly ? "87.17" : "109";

  const urlParams = `?prefilled_email=${encodeURIComponent(user?.emailAddresses[0]?.emailAddress || '')}&client_reference_id=${user?.id}`;

  const starterLink = isYearly 
    ? `https://buy.stripe.com/4gw8xW1X5frX31m3ci${urlParams}`
    : `https://buy.stripe.com/4gw29y59h5Rn0Te8wA${urlParams}`;

  const creatorLink = isYearly
    ? `https://buy.stripe.com/dR615u59h2Fb45qbIN${urlParams}`
    : `https://buy.stripe.com/3cs5lKbxF2FbbxS9AC${urlParams}`;

  const agencyLink = isYearly
    ? `https://buy.stripe.com/3cs7tSeJRa7D45q7sA${urlParams}`
    : `https://buy.stripe.com/dR63dC6dl7ZvbxSaEL${urlParams}`;

  const getVideoText = (seconds: number) => 
    isYearly ? `${seconds} Video Sekunden pro Monat` : `${seconds} Video Sekunden pro Monat`;

  return (
    <div className="py-8 px-4 relative">
      {/* Close Button */}
      <div className="absolute right-4 top-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <X className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-sm font-semibold leading-7 text-purple-600">Pricing</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Wähle deinen Plan
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
        Einfacher & schneller Zahlungs Prozess. Keine versteckten Kosten.


        </p>

        {/* Billing Toggle */}
        <div className="mt-6 flex justify-center items-center gap-4">
          <span className={`text-sm ${!isYearly ? 'text-purple-900' : 'text-gray-500'}`}>Monatlich</span>
          <button
            type="button"
            className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isYearly ? 'bg-purple-600' : 'bg-gray-200'
            }`}
            onClick={() => setIsYearly(!isYearly)}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isYearly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-sm ${isYearly ? 'text-purple-900' : 'text-gray-500'}`}>
            Jährlich <span className="text-purple-600 font-medium">(2 Monate gespart)</span>
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {/* Starter Plan */}
        <Card className="relative p-6 ring-1 ring-gray-200 hover:shadow-lg transition-shadow">
          {/* Sale Badge */}
          {!isYearly && (
            <div className="absolute -top-3 right-4 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
              34% Rabatt
            </div>
          )}
          <h3 className="text-base font-semibold leading-7">Starter</h3>
          <p className="text-sm leading-6 text-gray-600">Perfekt zum Starten</p>
          <p className="mt-4 flex items-baseline gap-x-1">
            <span className="text-3xl font-bold tracking-tight">€{starterPrice}</span>
            <span className="text-sm font-semibold leading-6 text-gray-600">/monat</span>
          </p>
          {!isYearly && (
            <div className="mb-4 text-sm">
              <span className="line-through text-gray-400 mr-2">€29/mo</span>
              <span className="text-green-600 font-medium">LinkedIn Sale!</span>
            </div>
          )}
          {isYearly && (
            <div className="mb-4 text-xs text-gray-600">
              <div>€182/Jahr (20% gespart)</div>
            </div>
          )}
          <ul role="list" className="mt-6 space-y-2 text-sm leading-6 text-gray-600">
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              70 Video Sekunden (ca. 5 Videos)
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Basis Avatare
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              HD Videos
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Verfügbar in 47 Sprachen
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Sound Effects
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Exportieren ohne Wasserzeichen
            </li>
          </ul>
          <a href={starterLink} target="_blank" rel="noopener noreferrer">
            <Button className="mt-6 w-full" variant="outline" size="sm">
              Jetzt Starten
            </Button>
          </a>
        </Card>

        {/* Creator Plan */}
        <Card className="relative p-6 border-2 border-purple-600 bg-white hover:shadow-lg transition-shadow">
          <div className="absolute -top-3 right-4 bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
            Beliebt
          </div>
          <h3 className="text-base font-semibold leading-7">Creator</h3>
          <p className="text-sm leading-6 text-gray-600">Für Content Creator</p>
          <p className="mt-4 flex items-baseline gap-x-1">
            <span className="text-3xl font-bold tracking-tight">€{creatorPrice}</span>
            <span className="text-sm font-semibold leading-6 text-gray-600">/monat</span>
          </p>
          {isYearly && (
            <div className="mb-4 text-xs text-gray-600">
              <div>€470/Jahr (20% gespart)</div>
            </div>
          )}
          <ul role="list" className="mt-6 space-y-2 text-sm leading-6 text-gray-600">
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              200 Video Sekunden (ca. 12 Videos)
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Alle Avatare (soon)
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              HD Videos
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Verfügbar in 47 Sprachen
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Sound Effects
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Exportieren ohne Wasserzeichen
            </li>
            <li className="flex gap-x-3 text-gray-400">
              <Check className="h-5 w-4 flex-none" />
              AI Skript Generation (soon)
            </li>
            <li className="flex gap-x-3 text-gray-400">
              <Check className="h-5 w-4 flex-none" />
              Untertitel (soon)
            </li>
          </ul>
          <a href={creatorLink} target="_blank" rel="noopener noreferrer">
            <Button className="mt-6 w-full bg-purple-600 hover:bg-purple-700" size="sm">
              Jetzt Starten
            </Button>
          </a>
        </Card>

        {/* Agency Plan */}
        <Card className="relative p-6 ring-1 ring-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-base font-semibold leading-7">Agentur</h3>
          <p className="text-sm leading-6 text-gray-600">Für Agenturen & Teams</p>
          <p className="mt-4 flex items-baseline gap-x-1">
            <span className="text-3xl font-bold tracking-tight">€{agencyPrice}</span>
            <span className="text-sm font-semibold leading-6 text-gray-600">/monat</span>
          </p>
          {isYearly && (
            <div className="mb-4 text-xs text-gray-600">
              <div>€1046/Jahr (20% gespart)</div>
            </div>
          )}
          <ul role="list" className="mt-6 space-y-2 text-sm leading-6 text-gray-600">
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              600 Video Sekunden (ca. 25 Videos)
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Alle Avatare (soon)
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              HD Videos
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Verfügbar in 47 Sprachen
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Sound Effects
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Exportieren ohne Wasserzeichen
            </li>
            <li className="flex gap-x-3 text-gray-400">
              <Check className="h-5 w-4 flex-none" />
              AI Script Generation (soon)
            </li>
            <li className="flex gap-x-3 text-gray-400">
              <Check className="h-5 w-4 flex-none" />
              Untertitel (soon)
            </li>
          </ul>
          <a href={agencyLink} target="_blank" rel="noopener noreferrer">
            <Button className="mt-6 w-full" variant="outline" size="sm">
              Jetzt Starten
            </Button>
          </a>
        </Card>
      </div>

      {/* Enterprise Plan */}
      <div className="mt-12">
        <div className="rounded-lg border bg-gradient-to-r from-purple-50 via-white to-purple-50 p-6 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                Enterprise
                <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
                  Custom
                </span>
              </h3>
              <p className="text-gray-600 text-sm mb-4">Brauchst du mehr als 25 Videos pro Monat?</p>
              <ul className="space-y-2 mb-0 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-4 flex-none text-purple-600" />
                  <span>Eigene Menge an Video Sekunden</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-4 flex-none text-purple-600" />
                  <span>Alle Premium Features und Extra Support</span>
                </li>
              </ul>
            </div>
            <div className="flex-shrink-0">
              <a 
                href="https://calendly.com/ai-ugcs/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="whitespace-nowrap px-8">
                  Book A Call
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 