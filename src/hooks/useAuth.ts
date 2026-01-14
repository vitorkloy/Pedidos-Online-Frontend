import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

const USERS_KEY = 'restaurant_users';
const CURRENT_USER_KEY = 'restaurant_current_user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const getUsers = (): AuthUser[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users: AuthUser[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const signup = (email: string, password: string, name: string): { success: boolean; error?: string } => {
    const users = getUsers();
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Este email já está cadastrado' };
    }

    const newUser: AuthUser = {
      id: crypto.randomUUID(),
      email,
      name,
      password
    };

    saveUsers([...users, newUser]);
    
    const userWithoutPassword: User = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(userWithoutPassword);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return { success: true };
  };

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      return { success: false, error: 'Email ou senha incorretos' };
    }

    const userWithoutPassword: User = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
    setUser(userWithoutPassword);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signup,
    login,
    logout
  };
}
