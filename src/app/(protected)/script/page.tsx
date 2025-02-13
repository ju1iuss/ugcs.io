"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Save, Wand2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/global/app-sidebar";
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface Script {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const videoTypes = [
  { value: 'product', label: 'Produkt Präsentation' },
  { value: 'testimonial', label: 'Kundenbewertung' },
  { value: 'educational', label: 'Tutorial/Anleitung' },
  { value: 'brand', label: 'Marken Story' },
  { value: 'ugc', label: 'UGC Style' },
  { value: 'explainer', label: 'Erklärvideo' },
  { value: 'service', label: 'Dienstleistung' },
  { value: 'recruitment', label: 'Recruiting/Job' },
  { value: 'event', label: 'Event/Veranstaltung' },
  { value: 'social', label: 'Social Media Content' }
];

const CopyButton = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Skript kopiert!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="h-8 w-8 p-0 relative"
    >
      <div className={`transform transition-all duration-200 ${copied ? 'scale-0' : 'scale-100'}`}>
        <Copy className="h-4 w-4" />
      </div>
      <div className={`absolute transform transition-all duration-200 ${copied ? 'scale-100' : 'scale-0'}`}>
        <Check className="h-4 w-4 text-green-500" />
      </div>
    </Button>
  );
};

export default function ScriptGeneratorPage() {
  const { user } = useUser();
  const [productInfo, setProductInfo] = useState('');
  const [brandInfo, setBrandInfo] = useState('');
  const [videoType, setVideoType] = useState('');
  const [duration, setDuration] = useState('30');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');
  const [savedScripts, setSavedScripts] = useState<Script[]>([]);
  const [scriptTitle, setScriptTitle] = useState('');

  if (user?.publicMetadata?.plan === 'free') {
    return (
      <div className="flex min-h-screen bg-[#f3f5f8]">
        <SidebarProvider>
          <AppSidebar userTier={String(user?.publicMetadata?.plan || 'free')} />
          <main className="flex-1 overflow-x-hidden">
            <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 max-w-xl mx-auto text-center space-y-6">
              <Badge 
                variant="secondary" 
                className="bg-purple-100 text-purple-700"
              >
                Pro Feature
              </Badge>
              <h2 className="text-2xl font-medium text-gray-900">
                KI-Skript Generator
              </h2>
              <p className="text-sm text-muted-foreground">
                Upgrade auf Pro um Zugriff auf den KI-Skript Generator zu erhalten
              </p>
              <Link href="/pricing">
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-900 h-9 px-4 py-2 mt-4"
                >
                  Upgrade to Pro
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </main>
        </SidebarProvider>
      </div>
    );
  }

  const generateScript = async () => {
    if (!productInfo || !brandInfo || !videoType || !duration) {
      toast.error("Bitte fülle alle Felder aus");
      return;
    }

    setIsGenerating(true);
    try {
      const scriptResponse = await fetch('https://api.altan.ai/galaxia/hook/MEGvbm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme: videoType,
          length: duration,
          brandInfo: brandInfo,
          productInfo: productInfo,
        })
      });

      if (!scriptResponse.ok) {
        throw new Error('Failed to generate script');
      }

      const scriptData = await scriptResponse.json();
      
      if (scriptData.script) {
        setGeneratedScript(scriptData.script);
        toast.success("Skript wurde generiert!");
      }

      const payload = {
        theme: videoType,
        length: duration,
        brandInfo: brandInfo,
        productInfo: productInfo,
        user_id: user?.id,
        correlation_id: `temp-${Date.now()}`
      };

      const response = await fetch('https://api.altan.ai/galaxia/hook/0jctFE', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to generate');
      }

      await new Promise(resolve => setTimeout(resolve, 3000));

    } catch (error) {
      console.error('Error generating script:', error);
      toast.error("Fehler beim Generieren des Skripts");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveScript = () => {
    if (!generatedScript || !scriptTitle) {
      toast.error("Bitte generiere zuerst ein Skript und gib ihm einen Titel");
      return;
    }

    const newScript: Script = {
      id: Date.now().toString(),
      title: scriptTitle,
      content: generatedScript,
      createdAt: new Date(),
    };

    setSavedScripts([newScript, ...savedScripts]);
    toast.success("Skript gespeichert!");
    setScriptTitle('');
  };

  return (
    <div className="flex min-h-screen bg-[#f3f5f8]">
      <SidebarProvider>
        <AppSidebar 
          userTier={String(user?.publicMetadata?.plan || 'free')}
        />
        <main className="flex-1 overflow-x-hidden">
          <div className="p-6 space-y-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Section */}
              <Card className="p-6 space-y-4">
                <h2 className="text-lg font-medium">Skript Generator</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">Produkt/Service Info</label>
                    <Textarea 
                      placeholder="Beschreibe dein Produkt oder deinen Service..."
                      value={productInfo}
                      onChange={(e) => setProductInfo(e.target.value)}
                      className="h-24"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">Brand Info</label>
                    <Textarea 
                      placeholder="Beschreibe deine Marke und Zielgruppe..."
                      value={brandInfo}
                      onChange={(e) => setBrandInfo(e.target.value)}
                      className="h-24"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">Video Typ</label>
                    <Select value={videoType} onValueChange={setVideoType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Wähle einen Video-Typ" />
                      </SelectTrigger>
                      <SelectContent>
                        {videoTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">Video Länge (Sekunden)</label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Wähle die Länge" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 Sekunden</SelectItem>
                        <SelectItem value="30">30 Sekunden</SelectItem>
                        <SelectItem value="45">45 Sekunden</SelectItem>
                        <SelectItem value="60">60 Sekunden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={generateScript} 
                    className="w-full"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generiere Skript...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Skript generieren
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Output Section */}
              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Generiertes Skript</h2>
                  {generatedScript && (
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Skript Titel"
                        value={scriptTitle}
                        onChange={(e) => setScriptTitle(e.target.value)}
                        className="max-w-[200px]"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={saveScript}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <Textarea 
                  value={generatedScript}
                  onChange={(e) => setGeneratedScript(e.target.value)}
                  placeholder="Hier erscheint dein generiertes Skript..."
                  className="h-[400px]"
                />
              </Card>
            </div>

            {/* Saved Scripts Section */}
            {savedScripts.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Gespeicherte Skripte</h2>
                  <p className="text-xs text-gray-500">
                    ℹ️ Skripte werden nur temporär gespeichert und bei Reload gelöscht
                  </p>
                </div>
                <div className="space-y-4">
                  {savedScripts.map((script) => (
                    <Card key={script.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{script.title}</h3>
                        <div className="flex items-center gap-2">
                          <CopyButton content={script.content} />
                          <span className="text-sm text-gray-500">
                            {new Date(script.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {script.content}
                      </p>
                    </Card>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
} 