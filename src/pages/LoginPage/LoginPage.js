// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { createUser } from "../../api/ApiService";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [mode, setMode] = useState("login"); // "login" o "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === "login") {
        await signIn({ email, password });
        navigate("/dashboard");
      } else {
        // registro
        await createUser({ email, password, name });
        // tras registrar, cambiar al modo login
        setMode("login");
        setError("Usuario creado, por favor inicia sesión");
      }
    } catch (err) {
      if (mode === "login") {
        if (err.message === "Unauthorized") {
          setError("Credenciales inválidas");
        } else if (err.message === "Validation error") {
          setError("Revisa tu email o contraseña");
        } else {
          setError("Error de servidor, intenta más tarde");
        }
      } else {
        setError(err.message || "Error al registrar usuario");
      }
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <Typography variant="h5" align="center">
          {mode === "login" ? "Iniciar sesión" : "Registrar usuario"}
        </Typography>

        {mode === "register" && (
          <TextField
            id="name"
            label="Nombre completo"
            variant="standard"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            sx={{ mt: 2 }}
          />
        )}

        <TextField
          id="email"
          label="Correo electrónico"
          variant="standard"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          sx={{ mt: mode === "register" ? 2 : 4 }}
        />

        <TextField
          id="password"
          label="Contraseña"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          sx={{ mt: 2 }}
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={handleSubmit}
          sx={{ mt: 4 }}
        >
          {mode === "login" ? "Entrar" : "Crear cuenta"}
        </Button>

        <Button
          variant="text"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError(null);
          }}
          sx={{ mt: 1 }}
        >
          {mode === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </Button>
      </div>
    </div>
  );
}