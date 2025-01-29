'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AvatarProcessingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Dein Avatar wird erstellt
          </h1>
          <p className="text-muted-foreground text-lg">
            Du erhältst eine E-Mail-Benachrichtigung, sobald dein Avatar fertig ist.
          </p>
          <p className="text-sm text-muted-foreground">
            Hinweis: Wenn der Avatar innerhalb von 2 Tagen nicht für ein Video verwendet wird, wird er automatisch gelöscht.
          </p>
        </div>
        
        <div className="pt-8 space-y-4">
          <Button 
            className="w-full"
            onClick={() => router.push('/dashboard')}
          >
            Zurück zum Dashboard
          </Button>
          <Button 
            variant="outline"
            className="w-full"
            onClick={() => router.push('/create')}
          >
            Neuen Avatar erstellen
          </Button>
        </div>
      </div>
    </div>
  )
} 