import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface ScriptInputProps {
  script: string
  onScriptChange: (value: string) => void
}

export default function ScriptInput({ script, onScriptChange }: ScriptInputProps) {
  const wordCount = script.trim().split(/\s+/).filter(Boolean).length;
  const isValid = wordCount >= 8;

  const handleExampleScript = () => {
    onScriptChange("I can't believe how good AI is getting with this tool.");
  };

  return (
    <div className="w-full px-2">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-xl font-semibold pl-4">Enter Script</h2>
        <Button onClick={handleExampleScript} size="sm" variant="outline" className="mr-4">
          Use Example Script
        </Button>
      </div>

      <Textarea
        id="script"
        placeholder="Enter your script here (minimum 8 words)..."
        value={script}
        onChange={(e) => onScriptChange(e.target.value)}
        className={`w-full h-40 text-lg ${!isValid && script.length > 0 ? 'border-red-500 focus:border-red-500' : ''}`}
      />
      <div className="flex justify-between mt-2 text-xs">
        <span className={`${!isValid && script.length > 0 ? 'text-red-500' : 'text-gray-500'}`}>
          {wordCount} words (minimum 8)
        </span>
        {!isValid && script.length > 0 && (
          <span className="text-red-500">
            Please enter at least 8 words
          </span>
        )}
      </div>
    </div>
  )
}

