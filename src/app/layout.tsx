import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script'
import { UserDataProvider } from '@/contexts/UserDataContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://ugcs.io'),
  title: {
    default: "Ugcs.io: KI generierte Videos | Deutschlands realistischste KI-Avatar-Videos",
    template: "%s | Ugcs.io"
  },
  description: "Erstellen Sie professionelle KI-Avatar-Videos in Minuten. Deutschlands realistischste KI-generierte Videos für Marketing, UGC und Social Media. Einfach, schnell und effizient.",
  keywords: ["KI Videos", "AI Avatar", "UGC Content", "Content Creation", "Marketing Videos", "KI Marketing", "Video Production", "AI Content"],
  authors: [{ name: "Ugcs.io Team" }],
  creator: "Ugcs.io",
  publisher: "Ugcs.io",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://ugcs.io',
    siteName: 'Ugcs.io',
    title: 'Ugcs.io: KI generierte Videos | Deutschlands realistischste KI-Avatar-Videos',
    description: 'Erstellen Sie professionelle KI-Avatar-Videos in Minuten. Deutschlands realistischste KI-generierte Videos für Marketing, UGC und Social Media.',
    images: [
      {
        url: 'https://ugcs.io/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ugcs.io KI Video Platform',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ugcs.io: KI generierte Videos',
    description: 'Deutschlands realistischste KI-Avatar-Videos für Marketing und Social Media',
    images: ['https://ugcs.io/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="de" dir="ltr">
      <head>
        {/* Google Tag Manager - placed first in head */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KTH7KWFC');`}
        </Script>
      
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

        {/* Add canonical URL */}
        <link rel="canonical" href="https://ugcs.io" />
        
        {/* Add favicon tags */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Add alternate language versions if you have them */}
        <link rel="alternate" href="https://ugcs.io" hrefLang="de-DE" />
        <link rel="alternate" href="https://ugcs.io" hrefLang="x-default" />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) - immediately after body opening tag */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-KTH7KWFC"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          ></iframe>
        </noscript>
        
        <UserDataProvider>
          {children}
        </UserDataProvider>
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
