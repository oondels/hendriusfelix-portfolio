import axios from "axios";
import { ip } from "./ip";

export const api = axios.create({
  baseURL: ip,
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["x-admin-token"] = token;
  }
  return config;
});
