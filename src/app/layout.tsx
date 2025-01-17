import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {  ClerkProvider} from '@clerk/nextjs'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UGC VideosKI generiert",
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
      <body className={inter.className}>{children}</body>
      <Toaster />
    </html>
    </ClerkProvider>
  );
}
