"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AppSidebar } from "@/components/global/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from '@clerk/nextjs';
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Wand2, Plus, Upload, Shuffle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWindowSize } from 'react-use';
import ReactConfetti from 'react-confetti';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const sampleDescriptions = [
  "Business-Professional in schlichtem Anzug, neutraler Hintergrund",
  "Casual gekleidet mit Hemd und Jeans, heller Raum",
  "Modern und professionell im Büro-Setting",
  "Natürlich und freundlich, Business-Casual Style",
];

const getRandomItem = (array: any[]) => array[Math.floor(Math.random() * array.length)];

export default function AvatarPage() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  // New state for avatar creation form
  const [avatarForm, setAvatarForm] = useState({
    ageRange: '',
    gender: '',
    description: '',
    website: '',
    extraWishes: '',
    images: [] as File[]
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      // Video generation logic here
      console.log("Generating video with script:", prompt);
    } catch (error) {
      console.error("Error generating video:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShuffle = () => {
    const ages = ["20-35", "36-50", "51-65", "65+"];
    const genders = ["male", "female"];
    
    setAvatarForm(prev => ({
      ...prev,
      ageRange: getRandomItem(ages),
      gender: getRandomItem(genders),
      description: getRandomItem(sampleDescriptions),
    }));
  };

  const handleAvatarGenerate = async () => {
    try {
      const response = await fetch('https://api.altan.ai/galaxia/hook/TAD9ea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user?.id,
          age_range: avatarForm.ageRange,
          gender: avatarForm.gender,
          description: avatarForm.description,
          website: avatarForm.website,
          extra_wishes: avatarForm.extraWishes,
          images: avatarForm.images
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setIsModalOpen(false);
      setShowSuccess(true);
      setShowConfetti(true);
      
      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

    } catch (error) {
      console.error('Error generating avatar:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + avatarForm.images.length > 3) {
      alert('Maximal 3 Bilder erlaubt');
      return;
    }
    setAvatarForm(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 3)
    }));
  };

  const renderContent = () => {
    if (user?.publicMetadata?.plan !== 'agency') {
      return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 max-w-xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <Badge 
              variant="secondary" 
              className="bg-purple-100 text-purple-700"
            >
              Agentur Feature
            </Badge>
            <h2 className="text-2xl font-medium text-gray-900">
              KI-Avatar Erstellung
            </h2>
            <p className="text-sm text-muted-foreground">
              Erstelle professionelle KI-Avatare für deine Videos im Agentur Plan
            </p>
            <Link href="/pricing">
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-900 h-9 px-4 py-2 mt-4"
              >
                Upgrade zum Agentur Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>

          <div className="flex gap-6 justify-center">
            {[
              'https://api.altan.ai/platform/media/2a8303a0-117a-4979-8c6c-3c2b20a8d428?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
              'https://api.altan.ai/platform/media/6d22cffa-37ee-463b-953c-fcbf11af1de9?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
              'https://api.altan.ai/platform/media/ca0a3570-ebc8-4db7-8e81-b11c2e8c59c1?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d'
            ].map((src, i) => (
              <div 
                key={i}
                className="w-24 h-[170px] rounded-lg bg-purple-50 border border-purple-100 overflow-hidden"
              >
                <img 
                  src={src} 
                  alt={`Example Avatar ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-purple-100/50">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img
                  src="https://api.altan.ai/platform/media/ba2db0d6-f871-4c9c-8258-9cf1395a0984?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">Sarah M.</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  "Die KI-Avatare sind unglaublich professionell und haben die Qualität unserer Videos auf ein neues Level gehoben."
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="h-[calc(100vh-2rem)] p-4">
        <div className="grid grid-cols-2 gap-6 h-full">
          {/* Left side - Avatar selection */}
          <div className="bg-white rounded-lg p-6 border border-purple-100/50">
            <div className="space-y-4">
              <h2 className="text-sm font-medium text-gray-600">Deine Avatare</h2>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <div 
                    className="w-[240px] h-[427px] rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100/50 transition-colors"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Plus className="h-5 w-5 text-gray-400" />
                      </div>
                      <span className="text-sm text-gray-500">Avatar erstellen</span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Avatar erstellen</DialogTitle>
                    <DialogDescription>
                      Erstelle deinen personalisierten KI-Avatar. Du hast bis zu 10 kostenlose Regenerationen.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Altersgruppe</Label>
                        <Select
                          value={avatarForm.ageRange}
                          onValueChange={(value) => setAvatarForm(prev => ({ ...prev, ageRange: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Wähle Alter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="20-35">20-35 Jahre</SelectItem>
                            <SelectItem value="36-50">36-50 Jahre</SelectItem>
                            <SelectItem value="51-65">51-65 Jahre</SelectItem>
                            <SelectItem value="65+">65+ Jahre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Geschlecht</Label>
                        <Select
                          value={avatarForm.gender}
                          onValueChange={(value) => setAvatarForm(prev => ({ ...prev, gender: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Wähle Geschlecht" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Männlich</SelectItem>
                            <SelectItem value="female">Weiblich</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="description">Beschreibung</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleShuffle}
                        className="flex items-center gap-2"
                      >
                        <Shuffle className="h-3 w-3" />
                        Zufällig
                      </Button>
                    </div>

                    <Textarea
                      id="description"
                      placeholder="Beschreibe das gewünschte Aussehen (Kleidung, Stil) und die Umgebung..."
                      value={avatarForm.description}
                      onChange={(e) => setAvatarForm(prev => ({ ...prev, description: e.target.value }))}
                      className="h-24"
                    />

                    <div className="space-y-2">
                      <Label>Produktbilder (max. 3)</Label>
                      <div className="flex gap-2 items-center">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                          multiple
                        />
                        <Label
                          htmlFor="image-upload"
                          className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50"
                        >
                          <Upload className="h-4 w-4" />
                          <span>Bilder hochladen</span>
                        </Label>
                        <span className="text-sm text-gray-500">
                          {avatarForm.images.length}/3 Bilder
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website Link</Label>
                      <Input
                        id="website"
                        placeholder="https://..."
                        value={avatarForm.website}
                        onChange={(e) => setAvatarForm(prev => ({ ...prev, website: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="extra">Extrawünsche</Label>
                      <Textarea
                        id="extra"
                        placeholder="Weitere Wünsche oder Anmerkungen..."
                        value={avatarForm.extraWishes}
                        onChange={(e) => setAvatarForm(prev => ({ ...prev, extraWishes: e.target.value }))}
                      />
                    </div>

                    <Button
                      onClick={handleAvatarGenerate}
                      className="w-full"
                    >
                      Avatar generieren
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      ℹ️ Du hast 10 kostenlose Regenerationen, falls du mit dem Ergebnis nicht zufrieden bist
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Right side - Script input */}
          <div className="bg-white rounded-lg p-6 border border-purple-100/50">
            <div className="space-y-4">
              <h2 className="text-sm font-medium text-gray-600">Video Script</h2>
              <div className="space-y-6">
                <textarea
                  placeholder="Füge hier deinen Video-Script ein..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-40 p-3 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
                <button
                  disabled={true}
                  className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-500 rounded-md py-2.5 px-4 text-sm font-medium cursor-not-allowed"
                >
                  <Wand2 className="h-4 w-4" />
                  Video generieren
                </button>
              </div>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-4 w-4 text-purple-600 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Pro Tipp:</span> Schreibe dein Script so, wie du es später im Video präsentieren möchtest.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SuccessDialog = () => (
    <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
      {showConfetti && <ReactConfetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={200}
      />}
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">🎉 Avatar wird erstellt!</AlertDialogTitle>
          <AlertDialogDescription className="text-center space-y-4">
            <p>
              Dein Avatar wird jetzt individuell erstellt. Dieser Prozess dauert ca. 1-2 Werktage.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg text-sm text-purple-700">
              <p>Was passiert als nächstes?</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Du erhältst eine E-Mail, sobald dein Avatar fertig ist</li>
                <li>Der Avatar wird automatisch in deinem Dashboard erscheinen</li>
                <li>Du kannst dann sofort mit der Video-Erstellung beginnen</li>
              </ul>
            </div>
            <Link href="/home">
              <button className="mt-4 w-full bg-black text-white rounded-md py-2.5 px-4 text-sm font-medium hover:bg-gray-900">
                Jetzt Videos erstellen
              </button>
            </Link>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <div className="flex min-h-screen bg-[#f3f5f8]">
      <SidebarProvider>
        <AppSidebar userTier={String(user?.publicMetadata?.plan || 'free')} />
        <main className="flex-1 overflow-x-hidden">
          {renderContent()}
          <SuccessDialog />
        </main>
      </SidebarProvider>
    </div>
  );
} 