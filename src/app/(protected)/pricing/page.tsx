"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CreditDrawer } from "@/components/global/pricing/credit-drawer"
import { useUser } from "@clerk/nextjs";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const { user } = useUser();

  const starterPrice = isYearly ? "280" : "28";
  const proPrice = isYearly ? "640" : "64";
  const starterLink = isYearly 
    ? `https://buy.stripe.com/bIY6pOeJR1B71XieUV?prefilled_email=${encodeURIComponent(user?.emailAddresses[0]?.emailAddress || '')}&client_reference_id=${user?.id}`
    : `https://buy.stripe.com/3cs15uatBgw1cBWeUU?prefilled_email=${encodeURIComponent(user?.emailAddresses[0]?.emailAddress || '')}&client_reference_id=${user?.id}`;

  const getVideoText = (seconds: number) => 
    isYearly ? `${seconds * 12} Video Sekunden (${seconds}/Monat)` : `${seconds} Video Sekunden pro Monat`;

  return (
    <div className="py-8 px-4">
      <div className="text-center mb-8">
        <h2 className="text-sm font-semibold leading-7 text-purple-600">Pricing</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Wähle deinen Plan
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
          Starte kostenlos und upgrade wenn du mehr brauchst. Keine versteckten Kosten.
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
        {/* Free Plan */}
        <Card className="relative p-6 ring-1 ring-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-base font-semibold leading-7">Free</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">Perfekt zum Testen</p>
          <p className="mt-4 flex items-baseline gap-x-1">
            <span className="text-3xl font-bold tracking-tight">€0</span>
            <span className="text-sm font-semibold leading-6 text-gray-600">/einmalig</span>
          </p>
          <ul role="list" className="mt-6 space-y-2 text-sm leading-6 text-gray-600">
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              15 Video Sekunden
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Basis Avatare
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Community Support
            </li>
          </ul>
          <Link href="/dashboard">
            <Button className="mt-6 w-full" size="sm">
              Kostenlos Starten
            </Button>
          </Link>
        </Card>

        {/* Starter Plan */}
        <Card className="relative p-6 bg-purple-50 ring-2 ring-purple-600 hover:shadow-lg transition-shadow">
          <div className="absolute -top-3 right-6">
            <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
              Beliebt
            </span>
          </div>
          <h3 className="text-base font-semibold leading-7">Starter</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            {isYearly ? 'Jährlicher Plan für Beginner' : 'Monatlicher Plan für Beginner'}
          </p>
          <p className="mt-4 flex items-baseline gap-x-1">
            <span className="text-3xl font-bold tracking-tight">€{starterPrice}</span>
            <span className="text-sm font-semibold leading-6 text-gray-600">/{isYearly ? 'jahr' : 'monat'}</span>
          </p>
          <ul role="list" className="mt-6 space-y-2 text-sm leading-6 text-gray-600">
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              {getVideoText(200)}
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Alle Avatare (soon)
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Priority Support
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Unbegrenzte Projekte
            </li>
          </ul>
          <a href={starterLink} target="_blank" rel="noopener noreferrer">
            <Button className="mt-6 w-full bg-purple-600 hover:bg-purple-700" size="sm">
              {isYearly ? 'Jahresplan Starten' : 'Monatsplan Starten'}
            </Button>
          </a>
        </Card>

        {/* Pro Plan */}
        <Card className="relative p-6 ring-1 ring-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-base font-semibold leading-7">Pro</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            {isYearly ? 'Jährlicher Plan für Agenturen' : 'Monatlicher Plan für Agenturen'}
          </p>
          <p className="mt-4 flex items-baseline gap-x-1">
            <span className="text-3xl font-bold tracking-tight">€{proPrice}</span>
            <span className="text-sm font-semibold leading-6 text-gray-600">/{isYearly ? 'jahr' : 'monat'}</span>
          </p>
          <ul role="list" className="mt-6 space-y-2 text-sm leading-6 text-gray-600">
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              {getVideoText(800)}
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Alle Avatare (soon)
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Premium Support
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              API Zugang
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Custom Branding
            </li>
          </ul>
          <Link href="/contact">
            <Button className="mt-6 w-full" size="sm">
              Kontaktiere uns
            </Button>
          </Link>
        </Card>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-600">
          Brauchst du einfach nur mehr Credits?{' '}
          <Link href="/dashboard" className="font-semibold text-purple-600 hover:text-purple-500">
            Klicke hier →
          </Link>
        </p>
      </div>

      <div className="flex justify-center mt-8">
        
      </div>
    </div>
  );
} 