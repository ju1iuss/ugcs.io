import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

interface QuickCreateButtonProps {
  onCreateClick: () => void
  className?: string
}

export function QuickCreateButton({ onCreateClick, className }: QuickCreateButtonProps) {
  return (
    <Button
      onClick={onCreateClick}
      className={cn(
        "w-full bg-black text-white rounded-full",
        "flex items-center justify-center gap-2",
        "hover:scale-[1.01] active:scale-[0.98] transition-all duration-400 ease-in-out",
        className
      )}
    >
      <Plus className="h-4 w-4" />
      <span className="font-medium">Neues Video</span>
    </Button>
  )
} 