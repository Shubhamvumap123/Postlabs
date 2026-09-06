import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../api/axios';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token && !user) {
      api.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => {
          Cookies.remove('token');
          localStorage.removeItem('user');
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const login = (userData: User) => {
    if (userData.token) {
      Cookies.set('token', userData.token, { expires: 30 });
    }
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
