'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';
import { authApi } from '@/lib/api/auth';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { success, error } = useToast();

  useEffect(() => {
    // Check initial token
    const storedToken = localStorage.getItem('estatify_token');
    if (storedToken) {
      setToken(storedToken);
      authApi.getCurrentUser()
        .then((res) => {
          if (res.data?.user) {
            setUser(res.data.user);
          }
        })
        .catch(() => {
          localStorage.removeItem('estatify_token');
          setToken(null);
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: { email: string; password: string }): Promise<boolean> => {
    try {
      const res = await authApi.login(credentials);
      if (res.data?.token && res.data?.user) {
        localStorage.setItem('estatify_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        success(`Welcome back, ${res.data.user.name}!`);
        return true;
      }
      return false;
    } catch (err: any) {
      error(err.message || 'Login failed. Please verify your credentials.');
      return false;
    }
  };

  const register = async (data: any): Promise<boolean> => {
    try {
      const res = await authApi.register(data);
      if (res.data?.token && res.data?.user) {
        localStorage.setItem('estatify_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        success('Account created successfully! Welcome to Estatify.');
        return true;
      }
      return false;
    } catch (err: any) {
      error(err.message || 'Registration failed. Please check form inputs.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('estatify_token');
      setToken(null);
      setUser(null);
      success('Logged out successfully.');
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      const res = await authApi.updateProfile(data);
      if (res.data?.user) {
        setUser(res.data.user);
        success('Profile updated successfully.');
        return true;
      }
      return false;
    } catch (err: any) {
      error(err.message || 'Failed to update profile.');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
