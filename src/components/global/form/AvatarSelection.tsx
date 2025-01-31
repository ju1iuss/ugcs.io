// Import necessary UI components from our component library
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Define what an Avatar object looks like in TypeScript
// This ensures every avatar has an id and src property
interface Avatar {
  id: string    // Unique identifier for each avatar
  src: string   // URL/path to the avatar's image
  name: string  // Added name property
  style_id?: string  // Make style_id optional
  gender: 'male' | 'female'
  isFavorite?: boolean
}

// Define what props this component accepts
// This is like a contract saying "this component needs these exact props"
interface AvatarSelectionProps {
  selectedAvatar: string                // The currently selected avatar's ID
  onSelect: (avatarId: string) => void  // Function to call when an avatar is selected
}

// Export the avatars array so it can be imported elsewhere
export const avatars: Avatar[] = [
  { 
    id: '1', 
    src: 'https://api.altan.ai/platform/media/48e8ac65-73e3-482e-a480-c70b377cef2e?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Laura',
    gender: 'female',
    isFavorite: true
  },
  { 
    id: '2', 
    src: 'https://api.altan.ai/platform/media/d13bbbd2-8482-42f6-b495-ee63f00c1ff2?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Paul',
    gender: 'male',
    isFavorite: true
  },
  { 
    id: '3', 
    src: 'https://api.altan.ai/platform/media/fb63ffb3-b63c-4f2e-8065-29b8ac017446?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Hannah',
    gender: 'female',
    isFavorite: true
  },
  { 
    id: '5', 
    src: 'https://api.altan.ai/platform/media/79497d6b-bc52-4fc3-99df-9f38a2cc84a2?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Sophie',
    gender: 'female',
  },
  { 
    id: '6', 
    src: 'https://api.altan.ai/platform/media/6eb32482-9037-4858-8abd-f2ce8d09df1f?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Noah',
    gender: 'male',
  },
  { 
    id: '7', 
    src: 'https://api.altan.ai/platform/media/8d0d7bd0-088f-4ecb-be9c-bf1e5ed58961?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Sofia',
    style_id: '1',
    gender: 'female',
  },
  { 
    id: '8', 
    src: 'https://api.altan.ai/platform/media/d03261da-75d4-44f1-9ad0-eed4d2294ca6?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Nina',
    style_id: '1',
    gender: 'female',
  },
  { 
    id: '9', 
    src: 'https://api.altan.ai/platform/media/0f079522-0501-44ff-81b4-f945ce53033c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Ava',
    style_id: '1',
    gender: 'female',
    isFavorite: true
  },
  { 
    id: '10', 
    src: 'https://api.altan.ai/platform/media/500aa978-f45d-4bf3-a44b-1b297b648dde?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Max',
    style_id: '1',
    gender: 'male',
  },
  { 
    id: '11', 
    src: 'https://api.altan.ai/platform/media/70a1b943-7cc4-42d6-b2b6-56fac70ea984?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Kim',
    style_id: '1',
    gender: 'female',
  },
  { 
    id: '12', 
    src: 'https://api.altan.ai/platform/media/62d873c7-999b-4f3e-82f9-107407224f8a?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Christian',
    style_id: '1',
    gender: 'male',
  },
  { 
    id: '13', 
    src: 'https://api.altan.ai/platform/media/27c67f5c-186c-4da0-a8bf-bed10c71c52c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    name: 'Luisa',
    style_id: '1',
    gender: 'female',
  },
]

type FilterOption = 'all' | 'male' | 'female';

// The main component function that accepts our defined props
export default function AvatarSelection({ selectedAvatar, onSelect }: AvatarSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<FilterOption>('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredAvatars = avatars.filter(avatar => {
    const matchesSearch = avatar.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === 'all' || genderFilter === avatar.gender;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="w-full px-6 pt-2">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-[40px]">
          <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                <Search className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[180px] p-0">
              <Input
                placeholder="Suche..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 focus:ring-0"
              />
            </PopoverContent>
          </Popover>
        </div>

        <h2 className="text-xl font-semibold text-center absolute left-1/2 -translate-x-1/2">
          Wähle einen Avatar
        </h2>

        <Select value={genderFilter} onValueChange={(value: FilterOption) => setGenderFilter(value)}>
          <SelectTrigger className="w-[100px] h-8">
            <SelectValue placeholder="Alle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle</SelectItem>
            <SelectItem value="male">Männlich</SelectItem>
            <SelectItem value="female">Weiblich</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <RadioGroup 
        value={selectedAvatar} 
        onValueChange={onSelect} 
        className="grid grid-cols-5 gap-x-4 gap-y-2 pb-6"
      >
        {filteredAvatars.map((avatar) => (
          <div 
            key={avatar.id} 
            className={`flex flex-col items-start group transition-all duration-200 ${
              selectedAvatar === avatar.id ? 'scale-[1.02]' : ''
            }`}
          >
            <RadioGroupItem
              value={avatar.id}
              id={avatar.id}
              className="sr-only"
            />
            <Label
              htmlFor={avatar.id}
              className={`relative cursor-pointer overflow-hidden transition-all duration-300 ${
                selectedAvatar === avatar.id 
                  ? 'ring-2 ring-gray-900 rounded-xl shadow-lg' 
                  : 'hover:ring-2 hover:ring-gray-600 rounded-xl hover:shadow-md'
              }`}
            >
              <div className="relative">
                <img 
                  src={avatar.src} 
                  alt={`Avatar ${avatar.name}`} 
                  className="w-[115px] h-[215px] rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {avatar.isFavorite && (
                  <div className="absolute top-2 left-2 bg-purple-600/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[11px] font-medium text-white shadow-sm">
                    Favorit
                  </div>
                )}
              </div>
            </Label>
            <div className="mt-1.5 ml-1">
              <span className="text-sm font-medium text-gray-900">
                {avatar.name}
              </span>
              {selectedAvatar === avatar.id && (
                <span className="block text-xs text-gray-600 mt-0.5">
                  Ausgewählt
                </span>
              )}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}