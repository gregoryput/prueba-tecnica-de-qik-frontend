import axios from "axios";
import { API_URL, APP_SECRET } from "@env"; // Importa la variable de entorno

const api = axios.create({
  baseURL: API_URL, // Usa la variable de entorno como baseURL
  timeout: 10000, // Configura el tiempo de espera (opcional)
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${APP_SECRET}`
  }
});

export default api;
