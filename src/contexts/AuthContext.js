import React, { createContext, useState, useEffect } from 'react';
import authApi from '../api/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al montar: verificar token en localStorage o cookie
  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored);
    setLoading(false);
  }, []);

  const signIn = async (email, pass) => {
    const data = await authApi.login(email, pass);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({ email: data.user.email, name: data.user.name });
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    authApi.logout();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
