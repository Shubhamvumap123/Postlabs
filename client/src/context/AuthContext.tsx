import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api/axios";

interface User { id: string; name: string; email: string; role: string; }
interface AuthContextType { user: User | null; token: string | null; login: (token: string, userData: User) => void; logout: () => void; isAuthenticated: boolean; loading: boolean; }

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser({ id: decoded.id, name: decoded.name || "", email: decoded.email || "", role: decoded.role || "user" });
      } catch (error) {
        console.error("Invalid token");
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = (newToken: string, userData: User) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
