// Import necessary UI components from our component library
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// Define what an Avatar object looks like in TypeScript
// This ensures every avatar has an id and src property
interface Avatar {
  id: string    // Unique identifier for each avatar
  src: string   // URL/path to the avatar's image
  name: string  // Added name property
}

// Define what props this component accepts
// This is like a contract saying "this component needs these exact props"
interface AvatarSelectionProps {
  selectedAvatar: string                // The currently selected avatar's ID
  onSelect: (avatarId: string) => void  // Function to call when an avatar is selected
}

// Our array of avatar data
// Each avatar has an id and src property matching our Avatar interface
const avatars: Avatar[] = [
  { 
    id: '1', 
    src: 'https://api.altan.ai/platform/media/48e8ac65-73e3-482e-a480-c70b377cef2e?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Laura'
  },
  { 
    id: '2', 
    src: 'https://api.altan.ai/platform/media/d13bbbd2-8482-42f6-b495-ee63f00c1ff2?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Paul'
  },
  { 
    id: '3', 
    src: 'https://api.altan.ai/platform/media/fb63ffb3-b63c-4f2e-8065-29b8ac017446?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Hannah'
  },
  { 
    id: '5', 
    src: 'https://api.altan.ai/platform/media/79497d6b-bc52-4fc3-99df-9f38a2cc84a2?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Sophie'
  },
  { 
    id: '6', 
    src: 'https://api.altan.ai/platform/media/6eb32482-9037-4858-8abd-f2ce8d09df1f?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Noah'
  },
]

// The main component function that accepts our defined props
export default function AvatarSelection({ selectedAvatar, onSelect }: AvatarSelectionProps) {
  return (
    <div className="w-full px-6">
      <h2 className="text-xl font-semibold mb-6 text-center">Select an Avatar</h2>
      
      <RadioGroup 
        value={selectedAvatar} 
        onValueChange={onSelect} 
        className="flex flex-row justify-between items-center"
      >
        {avatars.map((avatar) => (
          <div key={avatar.id} className="flex flex-col items-center">
            <RadioGroupItem
              value={avatar.id}
              id={avatar.id}
              className="sr-only"
            />
            <Label
              htmlFor={avatar.id}
              className={`cursor-pointer overflow-hidden transition-all duration-300 ${
                selectedAvatar === avatar.id 
                  ? 'ring-2 ring-primary rounded-lg' 
                  : 'hover:ring-2 hover:ring-gray-600 rounded-lg'
              }`}
            >
              <img 
                src={avatar.src} 
                alt={`Avatar ${avatar.name}`} 
                className="w-[115px] h-[195px] rounded-lg object-cover"
              />
            </Label>
            <span className="mt-2 text-sm font-medium text-gray-700">
              {avatar.name}
            </span>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}