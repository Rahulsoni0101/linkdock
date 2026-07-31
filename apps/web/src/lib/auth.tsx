"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, setToken } from "./api";
import type { User } from "./types";

type AuthState = {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await api.get<{ user: User }>("/api/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("ld_token");
    if (!token) {
      setLoading(false);
      return;
    }
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  const login = useCallback(async (identifier: string, password: string) => {
    const data = await api.post<{ token: string; user: User }>("/api/auth/login", {
      identifier,
      password,
    });
    setToken(data.token);
    setUser(data.user);
  }, []);

  const register = useCallback(async (username: string, email: string, password: string) => {
    const data = await api.post<{ token: string; user: User }>("/api/auth/register", {
      username,
      email,
      password,
    });
    setToken(data.token);
    setUser(data.user);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
