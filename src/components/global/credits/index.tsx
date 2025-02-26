import React from 'react'
import { cn } from '@/lib/utils'
import { Coins } from 'lucide-react'
import Link from 'next/link';

interface CreditsProps {
  credits?: number | string;
  className?: string;
}

const Credits = ({ credits = "0", className }: CreditsProps) => {
  const isLoading = credits === "0";

  return (
    <div className={cn(
      "flex justify-between items-center p-3 rounded-lg border border-purple-500 bg-purple-50",
      className
    )}>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-black-600">Video Credits</span>
          <Link 
            href="/pricing"
            className="text-xs text-purple-600 hover:text-purple-700"
          >
            Upgrade
          </Link>
        </div>
      </div>
      {isLoading ? (
        <div className="h-4 w-6 bg-purple-200 rounded animate-pulse" />
      ) : (
        <span className="text-sm font-semibold text-purple-600">
          {typeof credits === 'string' ? parseInt(credits) : credits}
        </span>
      )}
    </div>
  );
}

export default Credits