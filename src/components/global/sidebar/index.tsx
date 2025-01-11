'use client' // because we’re using React features (like event handlers)

import Link from 'next/link'

export default function Sidebar({ onCreateClick }: { onCreateClick?: () => void }) {
  return (
    <aside className="w-60 border-r border-[#E5E5E5] bg-[#f7f8f2] p-4 flex flex-col h-screen">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
            <i className="fas fa-link"></i>
          </div>
          <span className="font-semibold">Ugcs.io</span>
        </div>
        <button
          onClick={onCreateClick}
          className="create-button w-full py-2 px-4 rounded-lg font-medium bg-black text-white hover:shadow-[0_0_15px_rgba(129,155,240,1.0)] transition-all duration-200"
        >
          Quick Create
        </button>
      </div>
      
      {/* ... the rest of your nav items ... */}
      
      <div className="space-y-6 mt-auto">
        {/* ... credits and user info ... */}
      </div>
    </aside>
  )
}
