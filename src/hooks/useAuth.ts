import { useState, useEffect } from "react";
import { api } from "@/services/api";

interface User {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadCurrentUser() {
    try {
      setIsLoading(true);
      const response = await api.get<User | null>("/auth/me");
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCurrentUser();
  }, []);

  async function signup(email: string, password: string, name: string) {
    try {
      const response = await api.post<User>("/auth/signup", {
        email,
        password,
        name
      });

      setUser(response.data);
      setError(null);

      return { success: true };
    } catch (err: any) {
      setError(err?.response?.data?.error ?? "Erro ao cadastrar");
      return { success: false };
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await api.post<User>("/auth/login", {
        email,
        password
      });

      setUser(response.data);
      setError(null);

      return { success: true };
    } catch (err: any) {
      setError(err?.response?.data?.error ?? "Email ou senha inválidos");
      return { success: false };
    }
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    signup,
    login,
    logout
  };
}
