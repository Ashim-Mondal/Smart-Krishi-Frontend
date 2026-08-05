import axios from "axios";

// Placeholder Axios instance for future backend integration.
// The app currently runs entirely on mock data (see src/data/mockData.ts).
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.krishiblock.in",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("kb_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
