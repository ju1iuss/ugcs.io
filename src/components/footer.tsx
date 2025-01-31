import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 py-12 mt-24">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
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
            <li><Link href="/#pricing">Preise</Link></li>
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
      <div className="max-w-4xl mx-auto mt-12 text-center text-sm text-gray-600 px-4">
        @ 2025 Forever.
      </div>
    </footer>
  );
} 