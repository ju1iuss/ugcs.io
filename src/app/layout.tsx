import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {  ClerkProvider} from '@clerk/nextjs'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ugcs.io: KI generierte Videos",
  description: "Deutschlands realistischste KI-Avatar-Videos. Einfacher, schneller und besser gehts nicht.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <head>
      
      {/* Cookiebot Script */}
      <Script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid="162a8ef8-82f3-43af-b9b4-96156913b6e6"
            data-blockingmode="auto"
            type="text/javascript"
            strategy="beforeInteractive"
          />

        {/* Microsoft Clarity Script */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "q4550srry7");

            // Cookiebot integration
            window.addEventListener('CookiebotOnAccept', function (e) {
              if (Cookiebot.consent.statistics) {
                if(typeof clarity === 'function') {
                  clarity("consent");
                }
              }
            });

            window.addEventListener('CookiebotOnDecline', function (e) {
              if (!Cookiebot.consent.statistics) {
                if(typeof clarity === 'function') {
                  clarity("consent", false);
                }
              }
            });
          `}
        </Script>

        <Script id="tolt-stripe" strategy="afterInteractive">
          {`
            function updateButtonUrls() {
              var buttons = document.querySelectorAll('a[href^="https://checkout.ugcs.io"]');
              if (window.tolt_referral) {
                for (var i = 0; i < buttons.length; i++) {
                  var btn = buttons[i];
                  var separator = btn.href.indexOf("?") === -1 ? "?" : "&";
                  if (btn.href.indexOf("client_reference_id") === -1) {
                    btn.href = btn.href + separator + 'client_reference_id=' + window.tolt_referral;
                  }
                }
              }
            }  

            setTimeout(updateButtonUrls, 1000);
            setTimeout(updateButtonUrls, 1900);
            setTimeout(updateButtonUrls, 2600);  

            window.addEventListener("tolt_referral_ready", function() {
              if (window.tolt_referral) {
                updateButtonUrls();
              }
            });
          `}
        </Script>

        {/* Google Analytics Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HLKCF0GL9C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-HLKCF0GL9C');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}</body>
      <Toaster />
    </html>
    </ClerkProvider>
  );
}
