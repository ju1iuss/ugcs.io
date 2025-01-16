import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ScriptInputProps {
  script: string
  onScriptChange: (value: string) => void
  credits: number
}

const exampleScripts = [
  "Kennt ihr schon dieses KI Tool, mit dem ihr UGC Ads innerhalb von nur 3 Minuten und ohne viel Kosten erstellen könnt? Kommentiere jetzt Video und Ich schicke dir den Namen davon.",
  "3 Gründe warum deine brand UGC Ads benutzten sollte. Erstens Sie kosten nur 5€ pro video, zweitens du hast Resultate innerhalb von 3 Minuten und drittens du kannst so viele Hooks testen wie du willst.",
  "POV: Du gibst jetzt nurnoch 5€ pro UGC Ad Video aus und erstellst 1000 Videos pro Monat. Kommentiere Video um zu erfahren wie.",
  "5 No-Goes im E-commerce: Du benutzt kein UGC. Du zahlst mehr als 10€ pro Ad Video. Du verbrauchst zu viel Zeit auf die Erstellung von Content. Du benutzt zu wenig Hooks. Du benutzt keine KI Tools.",
  "Stell dir vor du machst 100000€ pro Monat an UGC Ad Revenue seitdem du dich nie mehr um Creator & Content kümmern musst."
];

export default function ScriptInput({ script, onScriptChange, credits }: ScriptInputProps) {
  const wordCount = script.trim().split(/\s+/).filter(Boolean).length;
  const requiredCredits = wordCount * 0.3;
  const hasMinWords = wordCount >= 8;
  const hasEnoughCredits = requiredCredits <= credits;

  // For debugging - remove this later
  console.log('Credits available:', credits);
  console.log('Required credits:', requiredCredits);

  const handleExampleScript = () => {
    const randomIndex = Math.floor(Math.random() * exampleScripts.length);
    onScriptChange(exampleScripts[randomIndex]);
  };

  return (
    <div className="w-full px-2">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-xl font-semibold pl-4">Skript eingeben</h2>
        <Button onClick={handleExampleScript} size="sm" variant="outline" className="mr-4">
          Vorlage benutzen
        </Button>
      </div>

      <Textarea
        id="script"
        placeholder="Hier den gesprochenen Text eingeben (mindestens 8 Wörter)..."
        value={script}
        onChange={(e) => onScriptChange(e.target.value)}
        className={`w-full h-40 text-lg ${
          (!hasMinWords && script.length > 0) || (!hasEnoughCredits && hasMinWords) ? 'border-red-500 focus:border-red-500' : ''
        }`}
      />
      <div className="flex justify-between mt-2 text-xs">
        <span className={`${(!hasMinWords && script.length > 0) ? 'text-red-500' : 'text-gray-500'}`}>
          {wordCount} Wörter (minimum 8)
        </span>
        {!hasMinWords && script.length > 0 && (
          <span className="text-red-500">
            Bitte mindestens 8 Wörter eingeben
          </span>
        )}
        {hasMinWords && !hasEnoughCredits && (
          <span className="text-red-500">
            Nicht genügend Credits.{' '}
            <Link href="/pricing" className="text-purple-600 hover:text-purple-700 hover:underline">
              Mehr Credits →
            </Link>
          </span>
        )}
      </div>
    </div>
  )
}

