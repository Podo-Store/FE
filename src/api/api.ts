import axios from "axios";
import { SERVER_URL } from "@/constants/ServerURL";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: SERVER_URL,
  timeout: 30000,
});
export const publicApi = axios.create({
  baseURL: SERVER_URL,
  timeout: 30000,
  withCredentials: false,
});

export const authApi = axios.create({
  baseURL: SERVER_URL,
  timeout: 30000,
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
