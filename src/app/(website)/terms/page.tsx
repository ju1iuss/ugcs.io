import { WebsiteLayout } from '@/components/global/website-layout';

export default function TermsOfService() {
  return (
    <WebsiteLayout>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none">
          <h2>1. Terms</h2>
          <p>By accessing this website, you agree to be bound by these terms...</p>

          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily download...</p>
        </div>
      </div>
    </WebsiteLayout>
  );
} 