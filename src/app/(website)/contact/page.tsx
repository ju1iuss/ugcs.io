import { LinkIcon, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { WebsiteLayout } from '@/components/global/website-layout';

export default function Contact() {
  return (
    <WebsiteLayout>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
        
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <Mail className="w-6 h-6 text-gray-600" />
            <div>
              <h2 className="font-semibold mb-1">Email</h2>
              <p className="text-gray-600">support@ugcs.io</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-gray-600" />
            <div>
              <h2 className="font-semibold mb-1">Location</h2>
              <p className="text-gray-600">Berlin, Germany</p>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
} 