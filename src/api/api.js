import axios from "axios";

const API_URL ="https://api.themoviedb.org/3";
const APP_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYmYzNDZhODNhMmIyNzBkOGFhZjExZTY3YjgxOTMyNSIsIm5iZiI6MTcyNTI5MDkxNi41MDQ5MzIsInN1YiI6IjY1MDlhYjU4Mzk0YTg3MDBlMjI3YmY5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A-_7BmTyeJeZLAoJt9VmBqWXPPm1MLXKdvdRGrFpnAA";

  const api = axios.create({
  baseURL: API_URL, // Usa la variable de entorno como baseURL
  timeout: 10000, // Configura el tiempo de espera (opcional)
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${APP_SECRET} `,
  },
});

export default api;
