import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContacts } from "@/hooks/admin/useContacts";
import { MultilingualInput } from "@/components/admin/MultilingualInput";
import type { ContactPayload } from "@/types/admin/contact";
import { 
  MapPin, 
  Mail, 
  Clock, 
  Globe, 
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  MessageSquare,
  Save,
  Loader2,
  ArrowLeft,
  Smartphone,
  PhoneCall
} from "lucide-react";

export default function ContactEdit() {
  const navigate = useNavigate();
  const { contact, isLoading, updateContact: updateContactMutation, isUpdating } = useContacts();
  const [formData, setFormData] = useState<ContactPayload>({
    titre: { fr: "", ar: "", en: "" },
    email: "",
    telephone_1: "",
    telephone_2: "",
    telephone_fixe: "",
    adresse: { fr: "", ar: "", en: "" },
    ville: { fr: "", ar: "", en: "" },
    wilaya: { fr: "", ar: "", en: "" },
    horaires: "",
    site_web: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    linkedin: "",
    x: "",
    message_acceuil: { fr: "", ar: "", en: "" },
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        titre: typeof contact.titre === 'object' && contact.titre !== null 
          ? contact.titre 
          : { fr: "", ar: "", en: "" },
        email: contact.email,
        telephone_1: contact.telephone_1,
        telephone_2: contact.telephone_2,
        telephone_fixe: contact.telephone_fixe,
        adresse: typeof contact.adresse === 'object' && contact.adresse !== null 
          ? contact.adresse 
          : { fr: "", ar: "", en: "" },
        ville: typeof contact.ville === 'object' && contact.ville !== null 
          ? contact.ville 
          : { fr: "", ar: "", en: "" },
        wilaya: typeof contact.wilaya === 'object' && contact.wilaya !== null 
          ? contact.wilaya 
          : { fr: "", ar: "", en: "" },
        horaires: contact.horaires,
        site_web: contact.site_web || "",
        facebook: contact.facebook || "",
        instagram: contact.instagram || "",
        tiktok: contact.tiktok || "",
        linkedin: contact.linkedin || "",
        x: contact.x || "",
        message_acceuil: typeof contact.message_acceuil === 'object' && contact.message_acceuil !== null
          ? contact.message_acceuil
          : { fr: "", ar: "", en: "" },
      });
    }
  }, [contact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateContactMutation(formData);
      navigate("/content/contact");
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/content/contact")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Edit Contact Information</h2>
          <p className="text-muted-foreground">Update your company's contact details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
              <MultilingualInput
                label="Title"
                value={formData.titre || { fr: "", ar: "", en: "" }}
                onChange={(value) => setFormData(prev => ({ ...prev, titre: value }))}
                maxLength={255}
                placeholder={{ 
                  fr: "Titre en français", 
                  ar: "العنوان بالعربية", 
                  en: "Title in English" 
                }}
              />

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contact@example.com"
                  maxLength={100}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="telephone_1" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Mobile 1 *
                  </Label>
                  <Input
                    id="telephone_1"
                    type="tel"
                    required
                    value={formData.telephone_1}
                    onChange={(e) => setFormData(prev => ({ ...prev, telephone_1: e.target.value }))}
                    placeholder="+213 XXX XXX XXX"
                    maxLength={128}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone_2" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Mobile 2 *
                  </Label>
                  <Input
                    id="telephone_2"
                    type="tel"
                    required
                    value={formData.telephone_2}
                    onChange={(e) => setFormData(prev => ({ ...prev, telephone_2: e.target.value }))}
                    placeholder="+213 XXX XXX XXX"
                    maxLength={128}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone_fixe" className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4" />
                  Landline *
                </Label>
                <Input
                  id="telephone_fixe"
                  type="tel"
                  required
                  value={formData.telephone_fixe}
                  onChange={(e) => setFormData(prev => ({ ...prev, telephone_fixe: e.target.value }))}
                  placeholder="+213 XX XX XX XX"
                  maxLength={20}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horaires" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Working Hours *
                </Label>
                <Input
                  id="horaires"
                  required
                  value={formData.horaires}
                  onChange={(e) => setFormData(prev => ({ ...prev, horaires: e.target.value }))}
                  placeholder="Mon-Fri: 9:00 AM - 5:00 PM"
                  maxLength={255}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Location Details
              </CardTitle>
              <CardDescription>Address and location information (multilingual)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <MultilingualInput
                label="Address"
                value={formData.adresse}
                onChange={(value) => setFormData(prev => ({ ...prev, adresse: value }))}
                required
                maxLength={255}
                placeholder={{ 
                  fr: "Adresse en français", 
                  ar: "العنوان بالعربية", 
                  en: "Address in English" 
                }}
              />

              <MultilingualInput
                label="City"
                value={formData.ville}
                onChange={(value) => setFormData(prev => ({ ...prev, ville: value }))}
                required
                maxLength={100}
                placeholder={{ 
                  fr: "Ville en français", 
                  ar: "المدينة بالعربية", 
                  en: "City in English" 
                }}
              />

              <MultilingualInput
                label="Wilaya"
                value={formData.wilaya}
                onChange={(value) => setFormData(prev => ({ ...prev, wilaya: value }))}
                required
                maxLength={100}
                placeholder={{ 
                  fr: "Wilaya en français", 
                  ar: "الولاية بالعربية", 
                  en: "Wilaya in English" 
                }}
              />

              <MultilingualInput
                label="Welcome Message"
                value={formData.message_acceuil || { fr: "", ar: "", en: "" }}
                onChange={(value) => setFormData(prev => ({ ...prev, message_acceuil: value }))}
                type="textarea"
                placeholder={{ 
                  fr: "Message d'accueil en français", 
                  ar: "رسالة الترحيب بالعربية", 
                  en: "Welcome message in English" 
                }}
              />
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
            <CardDescription>Website and social media links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="site_web" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website *
                </Label>
                <Input
                  id="site_web"
                  type="url"
                  required
                  value={formData.site_web}
                  onChange={(e) => setFormData(prev => ({ ...prev, site_web: e.target.value }))}
                  placeholder="https://example.com"
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook *
                </Label>
                <Input
                  id="facebook"
                  type="url"
                  required
                  value={formData.facebook}
                  onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
                  placeholder="https://facebook.com/..."
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  type="url"
                  value={formData.instagram || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                  placeholder="https://instagram.com/..."
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktok" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  TikTok
                </Label>
                <Input
                  id="tiktok"
                  type="url"
                  value={formData.tiktok || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, tiktok: e.target.value }))}
                  placeholder="https://tiktok.com/@..."
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={formData.linkedin || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="https://linkedin.com/company/..."
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="x" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  X (Twitter)
                </Label>
                <Input
                  id="x"
                  type="url"
                  value={formData.x || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, x: e.target.value }))}
                  placeholder="https://x.com/..."
                  maxLength={200}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/content/contact")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUpdating} size="lg" className="gap-2">
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Update Contact
          </Button>
        </div>
      </form>
    </div>
  );
}
