// src/api/AuthService.js

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const AuthService = {
  /**
   * POST /login
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<string>} access_token
   */
  async login({ email, password }) {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = new Error('Login failed');
      error.status = res.status;
      throw error;
    }

    const data = await res.json();
    const token = data.access_token;
    localStorage.setItem('access_token', token);
    return token;
  },

  /**
   * Remove token locally
   */
  logout() {
    localStorage.removeItem('access_token');
    // opcional: llamar a /logout en el backend
  },

  /**
   * GET /users/me
   * Ejemplo de endpoint protegido
   */
  async getProfile() {
    const token = localStorage.getItem('access_token');
    const res = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },
};

export default AuthService;
