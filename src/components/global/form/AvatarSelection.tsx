// Import necessary UI components from our component library
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Define what an Avatar object looks like in TypeScript
// This ensures every avatar has an id and src property
interface Avatar {
  id: string    // Unique identifier for each avatar
  src: string   // URL/path to the avatar's image
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
  { id: 'avatar1', src: 'https://api.altan.ai/platform/media/48e8ac65-73e3-482e-a480-c70b377cef2e?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d' },
  { id: 'avatar2', src: '/placeholder.svg?height=160&width=90' },
  { id: 'avatar3', src: '/placeholder.svg?height=160&width=90' },
  { id: 'avatar4', src: '/placeholder.svg?height=160&width=90' },
  { id: 'avatar5', src: '/placeholder.svg?height=160&width=90' },
]

// The main component function that accepts our defined props
export default function AvatarSelection({ selectedAvatar, onSelect }: AvatarSelectionProps) {
  return (
    // Wrapper div that takes full width
    <div className="w-full">
      {/* Title of the selection section */}
      <h2 className="text-xl font-semibold mb-6 text-center">Select an Avatar</h2>
      
      {/* RadioGroup component for selecting one avatar from many */}
      {/* value is the current selection, onValueChange is called when selection changes */}
      <RadioGroup 
        value={selectedAvatar} 
        onValueChange={onSelect} 
        className="flex justify-center space-x-4"
      >
        {/* Map through our avatars array to create a radio option for each avatar */}
        {avatars.map((avatar) => (
          // Wrapper div for each avatar option
          <div key={avatar.id} className="flex flex-col items-center">
            {/* Hidden radio input (sr-only means screen-reader only) */}
            <RadioGroupItem
              value={avatar.id}
              id={avatar.id}
              className="sr-only"
            />
            {/* Label that wraps the avatar image */}
            {/* When clicked, it selects the associated radio input */}
            <Label
              htmlFor={avatar.id}
              className="cursor-pointer p-2 border-2 border-transparent rounded-md hover:border-primary transition-all duration-300"
            >
              {/* The actual avatar image */}
              <img 
                src={avatar.src} 
                alt={`Avatar ${avatar.id}`} 
                className="w-[90px] h-[160px] object-cover" 
              />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}