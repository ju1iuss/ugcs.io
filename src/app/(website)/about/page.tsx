import { RocketIcon, CodeIcon, HeartIcon, BrainIcon } from 'lucide-react';
import Link from 'next/link';
import { WebsiteLayout } from '@/components/global/website-layout';
import Image from 'next/image';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default function About() {
  return (
    <WebsiteLayout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">
            Unsere Geschichte
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Eine Vision für die Zukunft der KI in Deutschland
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold mb-6">Die UGCS Vision</h2>
            <p className="text-lg text-gray-300">
              UGCS.io ist mehr als nur ein weiteres KI-Tool. Es ist das Ergebnis einer Vision, 
              Deutschland im Bereich künstlicher Intelligenz an die Weltspitze zu bringen. Als 
              Low-Code-Plattform kombinieren wir die besten Eigenschaften von make.com, airtable.com 
              und lovable.ai in einer einzigen, leistungsstarken Lösung.
            </p>
          </div>
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold mb-6">Innovation durch Leidenschaft</h2>
            <p className="text-lg text-gray-300">
              In erstaunlich kurzer Zeit entwickelte unser Gründer mit altan.ai eine Software, 
              die neue Maßstäbe in der deutschen KI-Landschaft setzt. Unser Ziel ist es, 
              besonders die junge Generation zu inspirieren und zu befähigen, die Zukunft der 
              KI aktiv mitzugestalten.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <FeatureCard
            icon={<CodeIcon className="w-6 h-6" />}
            title="Low-Code Plattform"
            description="Entwickelt für maximale Effizienz - keine umfangreichen Programmierkenntnisse erforderlich."
          />
          <FeatureCard
            icon={<RocketIcon className="w-6 h-6" />}
            title="Made in Germany"
            description="Entwickelt mit deutscher Ingenieurskunst und einem Fokus auf Qualität und Innovation."
          />
          <FeatureCard
            icon={<BrainIcon className="w-6 h-6" />}
            title="KI der nächsten Generation"
            description="Modernste KI-Technologie, die neue Maßstäbe in der Content-Erstellung setzt."
          />
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-8 mb-20">
          <h2 className="text-2xl font-semibold mb-6">Unsere Mission</h2>
          <p className="text-lg text-gray-300 mb-6">
            Wir glauben fest daran, dass Deutschland eine führende Rolle in der globalen 
            KI-Entwicklung spielen kann und muss. Mit UGCS.io schaffen wir nicht nur ein 
            Werkzeug für Content-Erstellung, sondern eine Plattform, die zeigt, was deutsche 
            KI-Innovation leisten kann.
          </p>
          <div className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <HeartIcon className="w-5 h-5" />
            <span className="font-medium">Entwickelt mit Leidenschaft in Deutschland</span>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Werden Sie Teil unserer Vision
          </Link>
        </div>
      </div>
    </WebsiteLayout>
  );
} 