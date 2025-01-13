import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Define the Style interface
interface Style {
  id: string
  src: string
  avatarId: string  // To link style with specific avatar
  name?: string
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
    { id: '1', avatarId: '1', src: 'https://api.altan.ai/platform/media/d13bbbd2-8482-42f6-b495-ee63f00c1ff2?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d' },
    { id: '2', avatarId: '1', src: 'https://api.altan.ai/platform/media/d565fd78-668f-4d59-bc47-94cf7a77d41e?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d' },
    { id: '3', avatarId: '1', src: 'https://api.altan.ai/platform/media/d7b77d53-1e19-4e8b-911b-0046c93782cf?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d' },
  
  ],
  '3': [
    { id: '1', avatarId: '1', src: 'https://api.altan.ai/platform/media/fb63ffb3-b63c-4f2e-8065-29b8ac017446?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d' },
    { id: '2', avatarId: '1', src: 'https://api.altan.ai/platform/media/d0900d55-45cb-438e-996f-3014eff93994?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d' },
    
  ],
  '4': [
    { id: '1', avatarId: '1', src: 'https://api.altan.ai/platform/media/79497d6b-bc52-4fc3-99df-9f38a2cc84a2?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d' },
    { id: '2', avatarId: '1', src: 'https://api.altan.ai/platform/media/e94ae315-1eb7-4834-becd-c0c38958e74d?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d' },
    
  ],
  '5': [
    { id: '1', avatarId: '1', src: 'https://api.altan.ai/platform/media/4b817dbd-40a6-4078-a814-56ee49fc3372?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d' },
    { id: '2', avatarId: '1', src: 'https://api.altan.ai/platform/media/d7b77d53-1e19-4e8b-911b-0046c93782cf?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d' },
    
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
                className="w-[120px] h-[200px] rounded-lg object-cover"
              />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

