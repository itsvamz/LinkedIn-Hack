import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  login as loginApi, 
  register as registerApi, 
  getCurrentUser, 
  logout as logoutApi,
  setAuthToken,
  getStoredToken,
  getStoredUser,
  storeUser,
  User,
  LoginCredentials,
  RegisterCredentials
} from '../lib/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = getStoredToken();
      if (token) {
        setAuthToken(token);
        try {
          const userData = await getCurrentUser(token);
          setUser(userData);
          storeUser(userData);
        } catch (error) {
          console.error('Failed to get current user:', error);
          logoutApi();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const { token, user } = await loginApi(credentials);
      setAuthToken(token);
      setUser(user);
      storeUser(user);
    } catch (error: Error | unknown) {
      setError(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const { token, user } = await registerApi(credentials);
      setAuthToken(token);
      setUser(user);
      storeUser(user);
    } catch (error: Error | unknown) {
      setError(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutApi();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};