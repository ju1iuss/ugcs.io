import { Button } from "@/components/ui/button"

interface QuickCreateButtonProps {
  onCreateClick: () => void
  className?: string
}

export function QuickCreateButton({ onCreateClick, className = "" }: QuickCreateButtonProps) {
  return (
    <Button
      onClick={onCreateClick}
      variant="default"
      className={className}
    >
      Quick Create
    </Button>
  )
} 