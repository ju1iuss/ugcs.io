"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CreditDrawer } from "@/components/global/pricing/credit-drawer"
import { useUser } from "@clerk/nextjs";
import { getStripeUrlWithParams } from '@/lib/utils/url';
import Marquee from "react-fast-marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import Image from "next/image";
export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const { user } = useUser();

  const starterPrice = isYearly ? "15.17" : "19";
  const creatorPrice = isYearly ? "39.17" : "49";
  const agencyPrice = isYearly ? "87.17" : "109";

  const getCheckoutUrl = (baseUrl: string) => {
    return getStripeUrlWithParams(
      baseUrl,
      user?.emailAddresses[0]?.emailAddress,
      user?.id
    );
  };

  const starterLink = getCheckoutUrl(
    isYearly 
      ? 'https://checkout.ugcs.io/b/4gw8xW1X5frX31m3ci'
      : 'https://checkout.ugcs.io/b/4gw29y59h5Rn0Te8wA'
  );

  const creatorLink = getCheckoutUrl(
    isYearly
      ? 'https://checkout.ugcs.io/b/dR615u59h2Fb45qbIN'
      : 'https://checkout.ugcs.io/b/3cs5lKbxF2FbbxS9AC'
  );

  const agencyLink = getCheckoutUrl(
    isYearly
      ? 'https://checkout.ugcs.io/b/3cs7tSeJRa7D45q7sA'
      : 'https://checkout.ugcs.io/b/dR63dC6dl7ZvbxSaEL'
  );

  const trialLink = getCheckoutUrl(
    'https://checkout.ugcs.io/b/cN2aG41X51B71XiaEO'
  );

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
        


     

        
        <div className="flex items-center gap-2 mt-4 bg-gray-50 px-4 py-1.5 rounded-full shadow-sm border border-black-900 max-w-sm mx-auto">
      <div className="flex -space-x-1.5 justify-center">
        {[
          "https://i.pravatar.cc/100?img=12",
          "https://i.pravatar.cc/100?img=28",
          "https://i.pravatar.cc/100?img=33",
          "https://i.pravatar.cc/100?img=45",
          "https://i.pravatar.cc/100?img=57",
        ].map((avatar, i) => (
          <img
            key={i}
            src={avatar}
            alt=""
            className="w-5 h-5 rounded-full border-[1.5px] border-white object-cover"
          />
        ))}
      </div>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <NumberTicker
        value={4592}
        decimalPlaces={0}
      className="text-gray-700 text-xs font-medium"
    />
    <p className="text-gray-700 text-xs font-medium">Videos erstellt</p>
  </div>





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
          {/* Monthly Cancellation Pill - only show when not yearly */}
          {!isYearly && (
            <div className="mt-2 mb-4 flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs w-fit">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Monatlich kündbar
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
              120 Video Sekunden (ca. 6 Videos)
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Basis Avatare
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
          {/* Monthly Cancellation Pill - only show when not yearly */}
          {!isYearly && (
            <div className="mt-2 mb-4 flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs w-fit">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Monatlich kündbar
            </div>
          )}
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
              300 Video Sekunden (ca. 20 Videos)
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Alle Avatare (soon)
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
          {/* Monthly Cancellation Pill - only show when not yearly */}
          {!isYearly && (
            <div className="mt-2 mb-4 flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs w-fit">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Monatlich kündbar
            </div>
          )}
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
              800 Video Sekunden (ca. 50 Videos)
            </li>
            <li className="flex gap-x-3">
              <Check className="h-5 w-4 flex-none text-purple-600" />
              Alle Avatare (soon)
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


      <section className="py-4 md:py-6 overflow-hidden mb-6 max-w-6xl mx-auto -mb-4">
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white via-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white via-white to-transparent z-10"></div>
          <Marquee className="[--duration:40s] p-4" pauseOnHover>
            {[
              "https://api.altan.ai/platform/media/d9ec32f7-893b-48a0-8ab9-cb557019ac0b?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/67ba118f-7010-4a59-9be6-b9ce2720baf5?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/a38661be-2aad-46bb-9311-08cbcef91b1c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/ce894453-190d-4c67-b42a-ec2b22b0a546?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/c14bfaa0-b542-40c2-9b3e-7cbb29041740?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/a38661be-2aad-46bb-9311-08cbcef91b1c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/d9ec32f7-893b-48a0-8ab9-cb557019ac0b?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/67ba118f-7010-4a59-9be6-b9ce2720baf5?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/a38661be-2aad-46bb-9311-08cbcef91b1c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/ce894453-190d-4c67-b42a-ec2b22b0a546?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/c14bfaa0-b542-40c2-9b3e-7cbb29041740?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/a38661be-2aad-46bb-9311-08cbcef91b1c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/d9ec32f7-893b-48a0-8ab9-cb557019ac0b?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/67ba118f-7010-4a59-9be6-b9ce2720baf5?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/a38661be-2aad-46bb-9311-08cbcef91b1c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/ce894453-190d-4c67-b42a-ec2b22b0a546?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/c14bfaa0-b542-40c2-9b3e-7cbb29041740?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/a38661be-2aad-46bb-9311-08cbcef91b1c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/d9ec32f7-893b-48a0-8ab9-cb557019ac0b?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/67ba118f-7010-4a59-9be6-b9ce2720baf5?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/a38661be-2aad-46bb-9311-08cbcef91b1c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/ce894453-190d-4c67-b42a-ec2b22b0a546?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/c14bfaa0-b542-40c2-9b3e-7cbb29041740?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/a38661be-2aad-46bb-9311-08cbcef91b1c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
            ].map((videoUrl, index) => (
              <div key={index} className="mx-1">
                <div className="relative w-[70px] h-[124px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    className="w-full h-full object-cover"
                    src={videoUrl}
                    alt={`Example ${index + 1}`}
                    width={70}
                    height={124}
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Enterprise text with negative margin to pull it up */}
      <div className="mt-0 text-center -mb-8">
        <p className="text-sm text-gray-600">
          Du brauchst mehr als 50 Videos im Monat?{" "}
          <a 
            href="https://calendly.com/ai-ugcs/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-700 font-medium underline underline-offset-2"
          >
            Lass uns sprechen!
          </a>
        </p>
      </div>
    </div>
  );
} 