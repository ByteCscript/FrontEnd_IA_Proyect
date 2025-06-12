// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import AuthService from "../api/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("access_token");
    if (t) setToken(t);
    setLoading(false);
  }, []);

  // ----- Asegúrate de esta firma: recibe un objeto {email,password} -----
  const signIn = async ({ email, password }) => {
    const accessToken = await AuthService.login({ email, password });
    setToken(accessToken);
  };

  const signOut = () => {
    AuthService.logout();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
