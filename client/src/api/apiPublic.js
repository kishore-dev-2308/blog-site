import axios from "axios";
import { handleGlobalErrors } from "./apiBase";

const apiPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

apiPublic.interceptors.response.use(
  (response) => response,
  (error) => handleGlobalErrors(error)
);

export default apiPublic;
