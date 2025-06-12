// src/pages/DashboardPage/DashboardPage.jsx
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  return (
    <div className={styles.containerWelcomegen}>
      <div className={styles.containerWelcome}>
        <div className={styles.containerwelcome2}>
          <h1>Bienvenido, {user?.name || user?.email}</h1>
          <button onClick={signOut}>Cerrar sesión</button>
          {/* Aquí tus componentes del “board” */}
        </div>
        <div className={styles.graficaest}>
          <h1>CONTENEDOR DONDE IRA GRAFICAS, {user?.name || user?.email}</h1>
          {/* Aquí tus componentes del “board” */}
        </div>
          <div className={styles.prueba2}>
          <h1>HOLA MUNDO, {user?.name || user?.email}</h1>
          {/* Aquí tus componentes del “board” */}
        </div>
      </div>
    </div>
  );
}
