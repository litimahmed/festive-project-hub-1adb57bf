import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
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
  Smartphone,
  PhoneCall,
  Share2,
  ArrowUpRight,
  Copy,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function ContactList() {
  const navigate = useNavigate();
  const { contact, isLoading: loading } = useContacts();
  const [selectedLang, setSelectedLang] = useState<"fr" | "ar" | "en">("fr");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-muted" />
            <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          <p className="text-muted-foreground font-medium">Loading contact information...</p>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="max-w-2xl mx-auto py-16">
        <Card className="border-dashed border-2 bg-card/50">
          <CardContent className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150" />
              <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 border border-primary/20">
                <Building2 className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">No Contact Information</h3>
              <p className="text-muted-foreground max-w-sm">
                Set up your company's contact details to display on your website
              </p>
            </div>
            <Button onClick={() => navigate("/content/contact/create")} size="lg" className="gap-2 mt-2">
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

  const socialLinks = [
    { key: 'site_web', icon: Globe, label: 'Website', value: contact.site_web, color: 'bg-blue-500/10 text-blue-600' },
    { key: 'facebook', icon: Facebook, label: 'Facebook', value: contact.facebook, color: 'bg-blue-600/10 text-blue-700' },
    { key: 'instagram', icon: Instagram, label: 'Instagram', value: contact.instagram, color: 'bg-pink-500/10 text-pink-600' },
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', value: contact.linkedin, color: 'bg-sky-600/10 text-sky-700' },
    { key: 'tiktok', icon: Share2, label: 'TikTok', value: contact.tiktok, color: 'bg-slate-800/10 text-slate-700' },
    { key: 'x', icon: Share2, label: 'X (Twitter)', value: contact.x, color: 'bg-slate-700/10 text-slate-600' },
  ].filter(link => link.value);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Contact Information</h1>
              <p className="text-sm text-muted-foreground">Manage your company's contact details</p>
            </div>
          </div>
        </div>
        <Button onClick={() => navigate("/content/contact/edit")} className="gap-2 shadow-lg shadow-primary/20">
          <Edit className="h-4 w-4" />
          Edit Contact
        </Button>
      </div>

      {/* Welcome Message Banner */}
      {(contact.titre || contact.message_acceuil) && (
        <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80">
          <CardContent className="p-0">
            <div className="relative p-8">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              </div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    {contact.titre ? getMultilingualValue(contact.titre) : 'Welcome Message'}
                  </Badge>
                </div>
                
                {contact.message_acceuil && typeof contact.message_acceuil === 'object' && (
                  <Tabs value={selectedLang} onValueChange={(v) => setSelectedLang(v as "fr" | "ar" | "en")} className="w-full">
                    <TabsList className="bg-white/10 border-white/20 mb-6">
                      <TabsTrigger value="fr" className="data-[state=active]:bg-white data-[state=active]:text-primary text-white/80">
                        <span className="mr-1.5">🇫🇷</span> Français
                      </TabsTrigger>
                      <TabsTrigger value="ar" className="data-[state=active]:bg-white data-[state=active]:text-primary text-white/80">
                        <span className="mr-1.5">🇩🇿</span> العربية
                      </TabsTrigger>
                      <TabsTrigger value="en" className="data-[state=active]:bg-white data-[state=active]:text-primary text-white/80">
                        <span className="mr-1.5">🇬🇧</span> English
                      </TabsTrigger>
                    </TabsList>
                    {['fr', 'ar', 'en'].map((lang) => (
                      <TabsContent key={lang} value={lang} className="animate-fade-in" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                        <p className="text-xl text-white font-medium leading-relaxed">
                          {contact.message_acceuil?.[lang as keyof typeof contact.message_acceuil] || ''}
                        </p>
                      </TabsContent>
                    ))}
                  </Tabs>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats/Quick Info Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickStatCard
          icon={Mail}
          label="Email"
          value={contact.email}
          onCopy={() => copyToClipboard(contact.email, 'email')}
          copied={copiedField === 'email'}
        />
        <QuickStatCard
          icon={Smartphone}
          label="Mobile"
          value={contact.telephone_1}
          onCopy={() => copyToClipboard(contact.telephone_1, 'phone1')}
          copied={copiedField === 'phone1'}
        />
        <QuickStatCard
          icon={PhoneCall}
          label="Landline"
          value={contact.telephone_fixe}
          onCopy={() => copyToClipboard(contact.telephone_fixe, 'landline')}
          copied={copiedField === 'landline'}
        />
        <QuickStatCard
          icon={Clock}
          label="Hours"
          value={contact.horaires}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contact Details - Takes 2 columns */}
        <Card className="lg:col-span-2 shadow-lg border-0 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Contact Details
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <ContactDetailItem
                icon={Mail}
                label="Email Address"
                value={contact.email}
                href={`mailto:${contact.email}`}
                onCopy={() => copyToClipboard(contact.email, 'email2')}
                copied={copiedField === 'email2'}
              />
              <ContactDetailItem
                icon={Smartphone}
                label="Mobile Phone 1"
                value={contact.telephone_1}
                href={`tel:${contact.telephone_1}`}
                onCopy={() => copyToClipboard(contact.telephone_1, 'tel1')}
                copied={copiedField === 'tel1'}
              />
              <ContactDetailItem
                icon={Smartphone}
                label="Mobile Phone 2"
                value={contact.telephone_2}
                href={`tel:${contact.telephone_2}`}
                onCopy={() => copyToClipboard(contact.telephone_2, 'tel2')}
                copied={copiedField === 'tel2'}
              />
              <ContactDetailItem
                icon={PhoneCall}
                label="Landline"
                value={contact.telephone_fixe}
                href={`tel:${contact.telephone_fixe}`}
                onCopy={() => copyToClipboard(contact.telephone_fixe, 'fixe')}
                copied={copiedField === 'fixe'}
              />
            </div>

            <Separator className="my-6" />

            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Working Hours</h4>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
              <p className="font-medium text-foreground">{contact.horaires}</p>
            </div>
          </CardContent>
        </Card>

        {/* Location Card */}
        <Card className="shadow-lg border-0 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Location
              </h3>
              <Tabs value={selectedLang} onValueChange={(v) => setSelectedLang(v as "fr" | "ar" | "en")}>
                <TabsList className="h-8">
                  <TabsTrigger value="fr" className="text-xs px-2 h-6">FR</TabsTrigger>
                  <TabsTrigger value="ar" className="text-xs px-2 h-6">AR</TabsTrigger>
                  <TabsTrigger value="en" className="text-xs px-2 h-6">EN</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="rounded-lg px-3 py-1.5 font-medium">
                  {getMultilingualValue(contact.wilaya)}
                </Badge>
                <Badge variant="outline" className="rounded-lg px-3 py-1.5">
                  {getMultilingualValue(contact.ville)}
                </Badge>
              </div>

              <div 
                className="p-4 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 border border-border/50 min-h-[100px]"
                dir={selectedLang === 'ar' ? 'rtl' : 'ltr'}
              >
                <p className="font-medium leading-relaxed text-foreground">
                  {getMultilingualValue(contact.adresse)}
                </p>
              </div>

              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(getMultilingualValue(contact.adresse))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">View on Maps</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Media Section */}
      {socialLinks.length > 0 && (
        <Card className="shadow-lg border-0 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Online Presence</h3>
              <Badge variant="secondary" className="ml-2">{socialLinks.length} channels</Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {socialLinks.map((link) => (
                <SocialLinkCard key={link.key} {...link} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer Meta */}
      {contact.date_creation && (
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-muted/30 border border-border/50 text-sm text-muted-foreground">
          <span>Last updated: {new Date(contact.date_creation).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
          <Badge variant="outline" className="text-xs">Active</Badge>
        </div>
      )}
    </div>
  );
}

// Sub-components
function QuickStatCard({ 
  icon: Icon, 
  label, 
  value, 
  onCopy, 
  copied 
}: { 
  icon: any; 
  label: string; 
  value: string; 
  onCopy?: () => void;
  copied?: boolean;
}) {
  return (
    <div className="group relative p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        {onCopy && (
          <button 
            onClick={onCopy}
            className="p-1.5 rounded-md hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-3 mb-1">{label}</p>
      <p className="font-semibold text-sm truncate">{value}</p>
    </div>
  );
}

function ContactDetailItem({ 
  icon: Icon, 
  label, 
  value, 
  href,
  onCopy,
  copied
}: { 
  icon: any; 
  label: string; 
  value: string; 
  href?: string;
  onCopy?: () => void;
  copied?: boolean;
}) {
  return (
    <div className="group flex items-start gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border/50 transition-all">
      <div className="p-2.5 rounded-lg bg-background border border-border/50 group-hover:border-primary/30 transition-colors">
        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {href ? (
          <a href={href} className="font-semibold text-sm hover:text-primary transition-colors truncate block">
            {value}
          </a>
        ) : (
          <p className="font-semibold text-sm truncate">{value}</p>
        )}
      </div>
      {onCopy && (
        <button 
          onClick={onCopy}
          className="p-1.5 rounded-md hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-600" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>
      )}
    </div>
  );
}

function SocialLinkCard({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: any; 
  label: string; 
  value: string;
  color: string;
}) {
  return (
    <a 
      href={value} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex items-center gap-3 p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-md bg-card transition-all"
    >
      <div className={cn("p-2.5 rounded-lg transition-transform group-hover:scale-110", color)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="font-medium text-sm truncate">{value.replace(/^https?:\/\/(www\.)?/, '')}</p>
      </div>
      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
    </a>
  );
}
