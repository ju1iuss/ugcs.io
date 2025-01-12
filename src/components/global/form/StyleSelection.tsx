import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Define the Style interface
interface Style {
  id: string
  src: string
  avatarId: string  // To link style with specific avatar
}

// Define component props
interface StyleSelectionProps {
  selectedAvatar: string
  selectedStyle: string
  onSelect: (styleId: string) => void
}

// Group styles by avatar
const styles: Record<string, Style[]> = {
  '1': [
    { id: '1', avatarId: '1', src: 'https://api.altan.ai/platform/media/4d09ba97-a861-49b0-ae2f-f5c4f7ad18a2?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d' },
    { id: '2', avatarId: '1', src: 'https://api.altan.ai/platform/media/5835ef98-11cd-4447-9e54-172f64754d10?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d' },
    { id: '3', avatarId: '1', src: 'https://api.altan.ai/platform/media/c3c23288-fb96-4436-b600-e43f867ff626?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d' },
  ],
  // Add styles for other avatars
  '2': [
    // styles for avatar 2
  ],
  '3': [
    // styles for avatar 3
  ],
  // etc...
}

export default function StyleSelection({ selectedAvatar, selectedStyle, onSelect }: StyleSelectionProps) {
  const avatarStyles = styles[selectedAvatar] || []

  return (
    <div className="w-full px-2">
      <h2 className="text-xl font-semibold mb-6 text-center">Select a Style</h2>
      <RadioGroup 
        value={selectedStyle} 
        onValueChange={onSelect} 
        className="flex flex-row flex-wrap justify-center gap-2"
      >
        {avatarStyles.map((style) => (
          <div key={style.id} className="flex flex-col items-center">
            <RadioGroupItem
              value={style.id}
              id={style.id}
              className="sr-only"
            />
            <Label
              htmlFor={style.id}
              className={`cursor-pointer transition-all duration-300 ${
                selectedStyle === style.id 
                  ? 'ring-2 ring-primary rounded-lg' 
                  : 'hover:ring-2 hover:ring-gray-600 rounded-lg'
              }`}
            >
              <img 
                src={style.src} 
                alt={`Style ${style.id}`} 
                className="w-[90px] h-[160px] rounded-lg object-cover" 
              />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

