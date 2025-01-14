import { LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { WebsiteLayout } from '@/components/global/website-layout';

export default function About() {
  return (
    <WebsiteLayout>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">About Us</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-lg mb-6">
            Ugcs.io is revolutionizing the way businesses create UGC content through AI technology.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            We're making professional UGC content creation accessible to everyone, regardless of their video production experience.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Our Technology</h2>
          <p>
            Using cutting-edge AI, we generate ultra-realistic avatar videos that look and feel like authentic UGC content.
          </p>
        </div>
      </div>
    </WebsiteLayout>
  );
} 