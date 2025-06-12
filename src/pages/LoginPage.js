// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // 👉 envía un objeto con { email, password }
      await signIn({ email, password });
      navigate("/dashboard");
    } catch (err) {
      // err.message viene de AuthService.login
      if (err.message === "Validation error") {
        setError("Revisa tu email o contraseña");
      } else {
        setError("Error de servidor, intenta más tarde");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 300,
        mx: "auto",
        mt: 8,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" align="center">
        Iniciar sesión
      </Typography>

      <TextField
        id="email"
        label="Correo electrónico"
        variant="standard"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
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
      />

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Entrar
      </Button>
    </Box>
  );
}
