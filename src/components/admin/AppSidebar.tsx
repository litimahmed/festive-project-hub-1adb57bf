import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  ChevronDown, 
  Info, 
  Phone, 
  Handshake, 
  Eye, 
  Plus, 
  Layers, 
  ScrollText, 
  Shield, 
  Ban,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { useContacts } from "@/hooks/admin/useContacts";
import { NavLink } from "@/components/admin/NavLink";
import { useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarFooter, 
  useSidebar 
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mainItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Manage Queues", url: "/admin/manage", icon: Users },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const { contact } = useContacts();
  const isActive = (path: string) => currentPath === path;
  const isPathStartsWith = (path: string) => currentPath.startsWith(path);
  
  const isContentActive = isPathStartsWith("/admin/about-us") || isPathStartsWith("/admin/contacts") || isPathStartsWith("/admin/partners") || isPathStartsWith("/admin/terms") || isPathStartsWith("/admin/privacy-policy");
  const isAboutUsActive = isPathStartsWith("/admin/about-us");
  const isContactActive = isPathStartsWith("/admin/contacts");
  const isPartnersActive = isPathStartsWith("/admin/partners");
  const isTermsActive = isPathStartsWith("/admin/terms");
  const isPrivacyActive = isPathStartsWith("/admin/privacy-policy");
  
  const [contentOpen, setContentOpen] = useState(isContentActive);
  const [aboutUsOpen, setAboutUsOpen] = useState(isAboutUsActive);
  const [contactOpen, setContactOpen] = useState(isContactActive);
  const [partnersOpen, setPartnersOpen] = useState(isPartnersActive);
  const [termsOpen, setTermsOpen] = useState(isTermsActive);
  const [privacyOpen, setPrivacyOpen] = useState(isPrivacyActive);

  return (
    <Sidebar 
      className={`${open ? "w-72" : "w-20"} transition-all duration-300 border-r-0`} 
      collapsible="icon"
    >
      <SidebarContent className="bg-gradient-sidebar relative overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary-glow/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary-dark/20 to-transparent pointer-events-none" />
        
        {/* Logo Section */}
        <div className={`${open ? "p-6" : "p-4"} transition-all duration-300 relative`}>
          <div className={`flex items-center ${open ? "gap-4" : "justify-center"}`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-sidebar-primary/40 blur-xl rounded-full transition-all group-hover:bg-sidebar-primary/60" />
              <div className="relative bg-gradient-to-br from-sidebar-primary to-primary-glow p-2.5 rounded-xl shadow-lg ring-1 ring-white/10">
                <Sparkles className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
            </div>
            {open && (
              <div className="flex flex-col animate-fade-in">
                <h1 className="text-xl font-bold text-sidebar-foreground tracking-tight">Toorrii</h1>
                <span className="text-xs text-sidebar-foreground/60 font-medium">Admin Portal</span>
              </div>
            )}
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-sidebar-border to-transparent mx-4" />

        {/* Main Navigation Section */}
        <SidebarGroup className="px-3 py-4">
          {open && (
            <SidebarGroupLabel className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-widest px-3 mb-3">
              Main Menu
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map(item => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`
                          ${open ? "px-4 py-3" : "px-3 py-3 justify-center"}
                          rounded-xl transition-all duration-200
                          text-sidebar-foreground/70 hover:text-sidebar-foreground
                          hover:bg-sidebar-accent/50
                          flex items-center gap-3
                          group relative overflow-hidden
                        `}
                        activeClassName={`
                          bg-sidebar-primary/20
                          text-sidebar-primary font-semibold
                          shadow-lg shadow-sidebar-primary/10
                          border border-sidebar-primary/30
                        `}
                      >
                        {active && (
                          <div className="absolute inset-0 bg-gradient-to-r from-sidebar-primary/10 to-transparent" />
                        )}
                        <item.icon className={`h-5 w-5 transition-all duration-200 relative z-10 ${active ? "text-sidebar-primary" : "group-hover:scale-110"}`} />
                        {open && <span className="text-sm font-medium relative z-10">{item.title}</span>}
                        {active && open && (
                          <div className="absolute right-3 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-sidebar-primary rounded-full animate-pulse-soft" />
                          </div>
                        )}
                        {active && !open && (
                          <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-sidebar-primary rounded-full" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="h-px bg-gradient-to-r from-transparent via-sidebar-border to-transparent mx-4" />

        {/* Content Management Section */}
        <SidebarGroup className="px-3 py-4 flex-1 overflow-auto">
          {open && (
            <SidebarGroupLabel className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-widest px-3 mb-3">
              Content
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {open ? (
                <Collapsible open={contentOpen} onOpenChange={setContentOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className={`
                          px-4 py-3 rounded-xl transition-all duration-200
                          text-sidebar-foreground/70 hover:text-sidebar-foreground
                          hover:bg-sidebar-accent/50
                          flex items-center justify-between w-full
                          ${isContentActive ? "bg-sidebar-primary/20 text-sidebar-primary font-semibold border border-sidebar-primary/30" : ""}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className={`h-5 w-5 ${isContentActive ? "text-sidebar-primary" : ""}`} />
                          <span className="text-sm font-medium">Content Management</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${contentOpen ? "rotate-180" : ""}`} />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 mt-2 space-y-1">
                    {/* About Us Menu */}
                    <Collapsible open={aboutUsOpen} onOpenChange={setAboutUsOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              px-4 py-2.5 rounded-lg transition-all duration-200
                              text-sidebar-foreground/60 hover:text-sidebar-foreground
                              hover:bg-sidebar-accent/40
                              flex items-center justify-between w-full
                              text-sm
                              ${isAboutUsActive ? "bg-sidebar-primary/15 text-sidebar-primary font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Info className={`h-4 w-4 ${isAboutUsActive ? "text-sidebar-primary" : ""}`} />
                              <span>About Us</span>
                            </div>
                            <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-200 ${aboutUsOpen ? "rotate-90" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1 space-y-0.5">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/about-us/versions"
                              end
                              className="px-4 py-2 rounded-lg transition-all duration-200 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 flex items-center gap-3 text-xs"
                              activeClassName="bg-sidebar-primary/10 text-sidebar-primary font-medium"
                            >
                              <Layers className="h-3.5 w-3.5" />
                              <span>All Versions</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/about-us/create"
                              className="px-4 py-2 rounded-lg transition-all duration-200 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 flex items-center gap-3 text-xs"
                              activeClassName="bg-sidebar-primary/10 text-sidebar-primary font-medium"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>Create New Version</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Contact Menu */}
                    <Collapsible open={contactOpen} onOpenChange={setContactOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              px-4 py-2.5 rounded-lg transition-all duration-200
                              text-sidebar-foreground/60 hover:text-sidebar-foreground
                              hover:bg-sidebar-accent/40
                              flex items-center justify-between w-full
                              text-sm
                              ${isContactActive ? "bg-sidebar-primary/15 text-sidebar-primary font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Phone className={`h-4 w-4 ${isContactActive ? "text-sidebar-primary" : ""}`} />
                              <span>Contact</span>
                            </div>
                            <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-200 ${contactOpen ? "rotate-90" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1 space-y-0.5">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/contacts"
                              end
                              className="px-4 py-2 rounded-lg transition-all duration-200 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 flex items-center gap-3 text-xs"
                              activeClassName="bg-sidebar-primary/10 text-sidebar-primary font-medium"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>My Contact</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild={!contact}>
                            {contact ? (
                              <div className="px-4 py-2 rounded-lg flex items-center gap-3 text-xs text-sidebar-foreground/30 cursor-not-allowed" title="A contact already exists">
                                <Ban className="h-3.5 w-3.5" />
                                <span>Add Contact</span>
                              </div>
                            ) : (
                              <NavLink
                                to="/admin/contacts/create"
                                className="px-4 py-2 rounded-lg transition-all duration-200 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 flex items-center gap-3 text-xs"
                                activeClassName="bg-sidebar-primary/10 text-sidebar-primary font-medium"
                              >
                                <Plus className="h-3.5 w-3.5" />
                                <span>Add Contact</span>
                              </NavLink>
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Partners Menu */}
                    <Collapsible open={partnersOpen} onOpenChange={setPartnersOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              px-4 py-2.5 rounded-lg transition-all duration-200
                              text-sidebar-foreground/60 hover:text-sidebar-foreground
                              hover:bg-sidebar-accent/40
                              flex items-center justify-between w-full
                              text-sm
                              ${isPartnersActive ? "bg-sidebar-primary/15 text-sidebar-primary font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Handshake className={`h-4 w-4 ${isPartnersActive ? "text-sidebar-primary" : ""}`} />
                              <span>Partners</span>
                            </div>
                            <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-200 ${partnersOpen ? "rotate-90" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1 space-y-0.5">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/partners"
                              end
                              className="px-4 py-2 rounded-lg transition-all duration-200 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 flex items-center gap-3 text-xs"
                              activeClassName="bg-sidebar-primary/10 text-sidebar-primary font-medium"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View Partners</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/partners/create"
                              className="px-4 py-2 rounded-lg transition-all duration-200 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 flex items-center gap-3 text-xs"
                              activeClassName="bg-sidebar-primary/10 text-sidebar-primary font-medium"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>Add New</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Terms and Conditions Menu */}
                    <Collapsible open={termsOpen} onOpenChange={setTermsOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              px-4 py-2.5 rounded-lg transition-all duration-200
                              text-sidebar-foreground/60 hover:text-sidebar-foreground
                              hover:bg-sidebar-accent/40
                              flex items-center justify-between w-full
                              text-sm
                              ${isTermsActive ? "bg-sidebar-primary/15 text-sidebar-primary font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <ScrollText className={`h-4 w-4 ${isTermsActive ? "text-sidebar-primary" : ""}`} />
                              <span>Terms</span>
                            </div>
                            <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-200 ${termsOpen ? "rotate-90" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1 space-y-0.5">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/terms"
                              end
                              className="px-4 py-2 rounded-lg transition-all duration-200 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 flex items-center gap-3 text-xs"
                              activeClassName="bg-sidebar-primary/10 text-sidebar-primary font-medium"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View Terms</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/terms/create"
                              className="px-4 py-2 rounded-lg transition-all duration-200 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 flex items-center gap-3 text-xs"
                              activeClassName="bg-sidebar-primary/10 text-sidebar-primary font-medium"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>Add New</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Privacy Policy Menu */}
                    <Collapsible open={privacyOpen} onOpenChange={setPrivacyOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              px-4 py-2.5 rounded-lg transition-all duration-200
                              text-sidebar-foreground/60 hover:text-sidebar-foreground
                              hover:bg-sidebar-accent/40
                              flex items-center justify-between w-full
                              text-sm
                              ${isPrivacyActive ? "bg-sidebar-primary/15 text-sidebar-primary font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Shield className={`h-4 w-4 ${isPrivacyActive ? "text-sidebar-primary" : ""}`} />
                              <span>Privacy Policy</span>
                            </div>
                            <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-200 ${privacyOpen ? "rotate-90" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1 space-y-0.5">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/privacy-policy"
                              end
                              className="px-4 py-2 rounded-lg transition-all duration-200 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 flex items-center gap-3 text-xs"
                              activeClassName="bg-sidebar-primary/10 text-sidebar-primary font-medium"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View Policies</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/privacy-policy/create"
                              className="px-4 py-2 rounded-lg transition-all duration-200 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 flex items-center gap-3 text-xs"
                              activeClassName="bg-sidebar-primary/10 text-sidebar-primary font-medium"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>Add New</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={`
                      px-3 py-3 justify-center rounded-xl transition-all duration-200
                      text-sidebar-foreground/70 hover:text-sidebar-foreground
                      hover:bg-sidebar-accent/50
                      ${isContentActive ? "bg-sidebar-primary/20 text-sidebar-primary" : ""}
                    `}
                  >
                    <FileText className="h-5 w-5" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <SidebarFooter className="p-4 mt-auto border-t border-sidebar-border/30">
          {open ? (
            <div className="flex items-center gap-3 px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
                <span className="text-xs text-sidebar-foreground/50">System Online</span>
              </div>
              <div className="ml-auto">
                <span className="text-[10px] text-sidebar-foreground/30 font-mono">v2.0.1</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
            </div>
          )}
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
