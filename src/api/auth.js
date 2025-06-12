// src/api/AuthService.js
const BASE_API = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const AuthService = {
  async login({ email, password }) {
    console.log("Enviando body:", JSON.stringify({ email, password }));
    const res = await fetch(`${BASE_API}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    if (res.status === 422) {
      const { detail } = await res.json();
      console.error("Validation errors:", detail);
      throw new Error("Validation error");
    }
    if (!res.ok) {
      throw new Error(`Login failed (${res.status})`);
    }

    const { access_token } = await res.json();
    localStorage.setItem("access_token", access_token);
    return access_token;
  },

  logout() {
    localStorage.removeItem("access_token");
  },

  async getProfile() {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`${BASE_API}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
  },
};

export default AuthService;
