import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  return (
    <div>
      <h1>Bienvenido, {user?.name || user?.email}</h1>
      <button onClick={signOut}>Cerrar sesión</button>
      {/* Aquí tus componentes del “board” */}
    </div>
  );
}
