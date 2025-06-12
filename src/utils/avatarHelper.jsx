// src/utils/avatarHelper.js

export function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

// Asegúrate de que `name` siempre sea al menos una cadena vacía
export function stringAvatar(name = '') {
  // Divide y consigue iniciales de forma segura
  const parts = name.trim().split(' ').filter(Boolean);
  const initials =
    parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`
      : parts.length === 1
      ? parts[0][0]
      : '?';
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials.toUpperCase(),
  };
}
