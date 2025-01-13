import React from 'react'
import { cn } from '@/lib/utils'

interface CreditsProps {
  credits?: number | string;
  className?: string;
}

const Credits = ({ credits = "0", className }: CreditsProps) => {
  const isLoading = credits === "0";

  return (
    <div className={cn("flex justify-between items-center p-3 rounded-lg bg-blue-50 border border-blue-100", className)}>
      <div className="flex flex-col">
        <span className="text-sm font-medium">Video Credits</span>
        <a href="#" className="text-xs text-blue-500 hover:text-blue-600">
          Upgrade
        </a>
      </div>
      {isLoading ? (
        <div className="h-4 w-6 bg-blue-200 rounded animate-pulse" />
      ) : (
        <span className="text-sm font-semibold">
          {typeof credits === 'string' ? parseInt(credits) : credits}
        </span>
      )}
    </div>
  )
}

export default Credits