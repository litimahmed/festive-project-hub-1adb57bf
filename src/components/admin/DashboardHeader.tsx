import { Bell, Menu, Search, HelpCircle, Settings, LogOut, User, Shield, Loader2, Command, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLogout } from "@/hooks/admin/useLogout";

export function DashboardHeader() {
  const { logout, isLoading: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout();
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground hover:bg-muted p-2 rounded-lg transition-all duration-200">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
        
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{today}</span>
        </div>
        
        {/* Search Bar */}
        <div className="relative hidden lg:block">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            placeholder="Search anything..."
            className="w-72 pl-10 pr-20 h-10 bg-muted/50 border-border/50 rounded-lg focus:bg-background transition-colors text-sm"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted border border-border/50">
            <Command className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Help Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200 h-9 w-9"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>

        {/* Notifications Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200 relative h-9 w-9"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 h-10 px-2 rounded-lg hover:bg-muted transition-all duration-200"
            >
              <Avatar className="h-8 w-8 ring-2 ring-border">
                <AvatarImage src="" alt="Admin" />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm font-medium text-foreground">Admin User</span>
                <span className="text-xs text-muted-foreground">Super Admin</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal p-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                  <AvatarImage src="" alt="Admin" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold text-sm">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@toorrii.com</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-2 cursor-pointer gap-3">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 cursor-pointer gap-3">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 cursor-pointer gap-3">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleLogout} 
              disabled={isLoggingOut} 
              className="py-2 cursor-pointer text-destructive focus:text-destructive gap-3"
            >
              {isLoggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
