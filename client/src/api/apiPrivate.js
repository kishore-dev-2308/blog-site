import axios from "axios";
import { handleGlobalErrors } from "./apiBase";

const apiPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 25000,
  headers: {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  }
});

const AUTH_ENDPOINTS = [
  "/auth/login",
  "/auth/refresh",
  "/auth/logout",
  "/auth/me",
];

let isRefreshing = false;
let queue = [];

const processQueue = (error) => {
  queue.forEach((p) =>
    error ? p.reject(error) : p.resolve(true)
  );
  queue = [];
};

apiPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;
    const url = original?.url || "";

    const isAuthEndpoint = AUTH_ENDPOINTS.some((ep) =>
      url.includes(ep)
    );

    if (status === 401 && !original.__isRetry && !isAuthEndpoint) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then(() => apiPrivate(original));
      }

      original.__isRetry = true;
      isRefreshing = true;

      try {
        await apiPrivate.post("/auth/refresh");
        processQueue(null);
        return apiPrivate(original);
      } catch (err) {
        processQueue(err);
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return handleGlobalErrors(error);
  }
);

export default apiPrivate;
