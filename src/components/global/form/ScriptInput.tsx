import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ScriptInputProps {
  script: string
  onScriptChange: (value: string) => void
}

export default function ScriptInput({ script, onScriptChange }: ScriptInputProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6 text-center">Enter Script</h2>
      <Label htmlFor="script" className="text-center block mb-2">Script</Label>
      <Textarea
        id="script"
        placeholder="Enter your script here..."
        value={script}
        onChange={(e) => onScriptChange(e.target.value)}
        className="w-full h-40 text-lg"
      />
    </div>
  )
}

