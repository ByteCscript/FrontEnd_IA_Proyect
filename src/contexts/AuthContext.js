// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import AuthService from "../api/auth";
import { getUsers } from "../api/ApiService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("access_token");
    const emailStored = localStorage.getItem("user_email");
    if (t && emailStored) {
      setToken(t);
      // recuperar nombre si lo teníamos guardado
      setUser({ email: emailStored, name: localStorage.getItem("user_name") });
    }
    setLoading(false);
  }, []);

  const signIn = async ({ email, password }) => {
    // 1. Realizar login y obtener token
    const accessToken = await AuthService.login({ email, password });
    setToken(accessToken);
    localStorage.setItem("access_token", accessToken);

    // 2. Obtener lista de usuarios y buscar el que coincide
    const users = await getUsers();
    const matched = users.find((u) => u.email === email);
    const name = matched?.name || email;

    // 3. Guardar y establecer user
    setUser({ email, name });
    localStorage.setItem("user_email", email);
    localStorage.setItem("user_name", name);

    return accessToken;
  };

  const signOut = () => {
    AuthService.logout();
    setToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
