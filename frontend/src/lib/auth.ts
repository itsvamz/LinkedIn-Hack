import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
  role: 'user' | 'recruiter';
}

export interface RegisterCredentials extends LoginCredentials {
  fullName: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    fullName: string;
  };
  msg: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
  fullName: string;
  avatar?: string;
}

// Service functions
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/auth/register`, credentials);
  return response.data;
};

export const getCurrentUser = async (token: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const storeUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeStoredUser = () => {
  localStorage.removeItem('user');
};

export const logout = () => {
  setAuthToken(null);
  removeStoredUser();
};