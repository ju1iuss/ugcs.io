import { WebsiteLayout } from '@/components/global/website-layout';

export default function PrivacyPolicy() {
  return (
    <WebsiteLayout>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <h2>1. Data Collection</h2>
          <p>We collect information that you provide directly to us...</p>

          <h2>2. Use of Information</h2>
          <p>We use the information we collect to...</p>
        </div>
      </div>
    </WebsiteLayout>
  );
} 