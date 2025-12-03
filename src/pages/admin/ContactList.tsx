import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContacts } from "@/hooks/admin/useContacts";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  Edit,
  Plus,
  Loader2,
  ExternalLink,
  Languages,
  PhoneCall,
  Smartphone
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContactList() {
  const navigate = useNavigate();
  const { contact, isLoading: loading } = useContacts();
  const [selectedLang, setSelectedLang] = useState<"fr" | "ar" | "en">("fr");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Contact Information</h2>
            <p className="text-muted-foreground">No contact information found</p>
          </div>
        </div>

        <Card className="shadow-elegant">
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="rounded-full bg-muted p-6">
              <Building2 className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">No Contact Information</h3>
              <p className="text-muted-foreground max-w-md">
                Get started by creating your company's contact information
              </p>
            </div>
            <Button onClick={() => navigate("/content/contact/create")} size="lg" className="gap-2 mt-4">
              <Plus className="h-4 w-4" />
              Create Contact Information
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getMultilingualValue = (field: any) => {
    if (typeof field === 'object' && field !== null) {
      return field[selectedLang] || field.fr || '';
    }
    return field || '';
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contact Information</h2>
          <p className="text-muted-foreground">View your company contact details</p>
        </div>
        <Button onClick={() => navigate("/content/contact/edit")} className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Contact
        </Button>
      </div>

      {/* Title & Welcome Message */}
      {(contact.titre || contact.message_acceuil) && (
        <Card className="shadow-elegant border-primary/20 bg-gradient-to-br from-primary/5 via-primary/10 to-background overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Building2 className="h-5 w-5" />
                {contact.titre ? getMultilingualValue(contact.titre) : 'Welcome'}
              </CardTitle>
              <Badge variant="outline" className="gap-1.5">
                <Languages className="h-3 w-3" />
                Multilingual
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="relative">
            {contact.message_acceuil && typeof contact.message_acceuil === 'object' && (
              <Tabs value={selectedLang} onValueChange={(v) => setSelectedLang(v as "fr" | "ar" | "en")} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
                  <TabsTrigger value="fr" className="gap-2">
                    <span className="text-xs font-semibold">🇫🇷</span>
                    Français
                  </TabsTrigger>
                  <TabsTrigger value="ar" className="gap-2">
                    <span className="text-xs font-semibold">🇩🇿</span>
                    العربية
                  </TabsTrigger>
                  <TabsTrigger value="en" className="gap-2">
                    <span className="text-xs font-semibold">🇬🇧</span>
                    English
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="fr" className="animate-fade-in">
                  <p className="text-lg font-medium leading-relaxed">{contact.message_acceuil.fr}</p>
                </TabsContent>
                <TabsContent value="ar" className="animate-fade-in" dir="rtl">
                  <p className="text-lg font-medium leading-relaxed">{contact.message_acceuil.ar}</p>
                </TabsContent>
                <TabsContent value="en" className="animate-fade-in">
                  <p className="text-lg font-medium leading-relaxed">{contact.message_acceuil.en}</p>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Basic Information
            </CardTitle>
            <CardDescription>Company contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <a href={`mailto:${contact.email}`} className="text-base font-semibold hover:text-primary transition-colors">
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Smartphone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mobile 1</p>
                  <a href={`tel:${contact.telephone_1}`} className="text-base font-semibold hover:text-primary transition-colors">
                    {contact.telephone_1}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Smartphone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mobile 2</p>
                  <a href={`tel:${contact.telephone_2}`} className="text-base font-semibold hover:text-primary transition-colors">
                    {contact.telephone_2}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <PhoneCall className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Landline</p>
                <a href={`tel:${contact.telephone_fixe}`} className="text-base font-semibold hover:text-primary transition-colors">
                  {contact.telephone_fixe}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Working Hours</p>
                <p className="text-base font-semibold">{contact.horaires}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="shadow-elegant overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                Location
              </CardTitle>
              <Badge variant="outline" className="gap-1.5">
                <Languages className="h-3 w-3" />
                Multilingual
              </Badge>
            </div>
            <CardDescription>Address information</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-6">
            {/* Region Info */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-sm px-3 py-1.5 gap-1.5">
                <MapPin className="h-3 w-3" />
                {getMultilingualValue(contact.wilaya)}
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1.5">
                {getMultilingualValue(contact.ville)}
              </Badge>
            </div>

            {/* Address with Language Tabs */}
            <div className="space-y-3">
              <Tabs value={selectedLang} onValueChange={(v) => setSelectedLang(v as "fr" | "ar" | "en")} className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-9">
                  <TabsTrigger value="fr" className="text-xs gap-1.5">
                    🇫🇷 FR
                  </TabsTrigger>
                  <TabsTrigger value="ar" className="text-xs gap-1.5">
                    🇩🇿 AR
                  </TabsTrigger>
                  <TabsTrigger value="en" className="text-xs gap-1.5">
                    🇬🇧 EN
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="fr" className="animate-fade-in mt-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
                    <p className="text-base font-medium leading-relaxed">{getMultilingualValue(contact.adresse)}</p>
                  </div>
                </TabsContent>
                <TabsContent value="ar" className="animate-fade-in mt-4" dir="rtl">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
                    <p className="text-base font-medium leading-relaxed">
                      {typeof contact.adresse === 'object' ? contact.adresse.ar : contact.adresse}
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="en" className="animate-fade-in mt-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
                    <p className="text-base font-medium leading-relaxed">
                      {typeof contact.adresse === 'object' ? contact.adresse.en : contact.adresse}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Media & Web */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Online Presence
          </CardTitle>
          <CardDescription>Website and social media profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {contact.site_web && (
              <a 
                href={contact.site_web} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Globe className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">Website</p>
                  <p className="text-sm font-semibold truncate">{contact.site_web}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </a>
            )}

            {contact.facebook && (
              <a 
                href={contact.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Facebook className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">Facebook</p>
                  <p className="text-sm font-semibold truncate">{contact.facebook}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </a>
            )}

            {contact.instagram && (
              <a 
                href={contact.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">Instagram</p>
                  <p className="text-sm font-semibold truncate">{contact.instagram}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </a>
            )}

            {contact.tiktok && (
              <a 
                href={contact.tiktok} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Globe className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">TikTok</p>
                  <p className="text-sm font-semibold truncate">{contact.tiktok}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </a>
            )}

            {contact.linkedin && (
              <a 
                href={contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">LinkedIn</p>
                  <p className="text-sm font-semibold truncate">{contact.linkedin}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </a>
            )}

            {contact.x && (
              <a 
                href={contact.x} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Globe className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">X (Twitter)</p>
                  <p className="text-sm font-semibold truncate">{contact.x}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>

      {contact.date_creation && (
        <Card className="shadow-elegant bg-muted/30">
          <CardContent className="pt-6">
            <div className="flex gap-6 text-sm text-muted-foreground">
              <div>
                <span className="font-medium">Created:</span> {new Date(contact.date_creation).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
