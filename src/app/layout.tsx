import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {  ClerkProvider} from '@clerk/nextjs'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UGC Videos - KI generiert",
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
        <Script
          async
          src="https://cdn.tolt.io/tolt.js"
          data-tolt="pk_ov6C9novegme6jPovu7z6UW8"
          strategy="afterInteractive"
        />
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
      </head>
      <body className={inter.className}>{children}</body>
      <Toaster />
    </html>
    </ClerkProvider>
  );
}
