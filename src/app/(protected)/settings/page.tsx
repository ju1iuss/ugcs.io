"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/global/app-sidebar";
import { fetchUserVideos } from '@/lib/api';

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    security: true,
  });
  const [credits, setCredits] = useState<string>("0");

  useEffect(() => {
    async function loadCredits() {
      if (!isLoaded || !user?.id) return;
      
      try {
        const response = await fetchUserVideos(user.id);
        setCredits(response.credits);
      } catch (err) {
        console.error('Error loading credits:', err);
      }
    }

    loadCredits();
  }, [user?.id, isLoaded]);

  return (
    <div className="flex min-h-screen bg-[#f3f5f8]">
      <SidebarProvider>
        <AppSidebar credits={credits} />
        <main className="flex-1 overflow-x-hidden p-6">
          <div className="max-w-[90rem] mx-auto space-y-8">
            <h1 className="text-3xl font-bold mb-8">Einstellungen</h1>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList>
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="notifications">Benachrichtigungen</TabsTrigger>
                <TabsTrigger value="security">Sicherheit</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profil Informationen</CardTitle>
                    <CardDescription>
                      Aktualisiere deine Profil-Informationen und E-Mail-Adresse.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
                        <AvatarFallback>
                          {user?.firstName?.charAt(0)}
                          {user?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Avatar ändern</Button>
                    </div>

                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          defaultValue={user?.fullName || ""} 
                          disabled
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          defaultValue={user?.primaryEmailAddress?.emailAddress || ""} 
                          disabled
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button>Änderungen speichern</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Dein Plan</CardTitle>
                    <CardDescription>
                      Verwalte deinen Plan und deine Zahlungsinformationen.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Aktueller Plan</h3>
                        <p className="text-sm text-muted-foreground">
                          Du hast noch {credits} Credits übrig
                        </p>
                      </div>
                      <Button 
                        variant="default"
                        onClick={() => window.location.href = 'https://billing.stripe.com/p/login/eVaaEF8mH2uz2l2288'}
                      >
                        Plan verwalten
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Benachrichtigungseinstellungen</CardTitle>
                    <CardDescription>
                      Diese Funktionen sind aktuell noch in Entwicklung.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg mb-6">
                      <p className="text-sm">
                        Diese Einstellungen sind momentan noch nicht verfügbar. Wenn du Änderungen an deinen Benachrichtigungseinstellungen vornehmen möchtest, schreibe uns bitte eine E-Mail an kontakt@ugcs.io
                      </p>
                    </div>
                    <div className="space-y-4 opacity-50">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>E-Mail Benachrichtigungen</Label>
                          <p className="text-sm text-muted-foreground">
                            Erhalte E-Mail-Benachrichtigungen über deine Kontoaktivitäten.
                          </p>
                        </div>
                        <Switch disabled checked={notifications.email} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Marketing E-Mails</Label>
                          <p className="text-sm text-muted-foreground">
                            Erhalte E-Mails über neue Funktionen und Updates.
                          </p>
                        </div>
                        <Switch disabled checked={notifications.marketing} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Sicherheitsbenachrichtigungen</Label>
                          <p className="text-sm text-muted-foreground">
                            Werde über sicherheitsrelevante Aktivitäten informiert.
                          </p>
                        </div>
                        <Switch disabled checked={notifications.security} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Sicherheitseinstellungen</CardTitle>
                    <CardDescription>
                      Diese Funktionen sind aktuell noch in Entwicklung.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg mb-6">
                      <p className="text-sm">
                        Diese Einstellungen sind momentan noch nicht verfügbar. Wenn du Änderungen an deinen Sicherheitseinstellungen vornehmen möchtest, schreibe uns bitte eine E-Mail an kontakt@ugcs.io
                      </p>
                    </div>
                    <div className="space-y-4 opacity-50">
                      <Button disabled variant="outline" className="w-full justify-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                          />
                        </svg>
                        Passwort ändern
                      </Button>

                      <Button disabled variant="outline" className="w-full justify-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        Zwei-Faktor-Authentifizierung
                      </Button>

                      <Button disabled variant="outline" className="w-full justify-start text-destructive">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Konto löschen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
} 