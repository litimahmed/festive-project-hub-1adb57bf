import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_ERROR_EVENT } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  setAuthenticated: (value: boolean) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (logout from another tab)
    window.addEventListener("storage", checkAuth);
    
    // Listen for auth errors from API calls
    const handleAuthError = () => {
      console.log("Auth error detected, logging out...");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsAuthenticated(false);
      toast({
        title: "Session Expired",
        description: "Please log in again",
        variant: "destructive",
      });
    };
    
    window.addEventListener(AUTH_ERROR_EVENT, handleAuthError);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener(AUTH_ERROR_EVENT, handleAuthError);
    };
  }, [toast]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, logout, setAuthenticated }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
