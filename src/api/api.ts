import axios from "axios";
import { SERVER_URL } from "@/constants/ServerURL";

export const api = axios.create({
  baseURL: SERVER_URL,
  timeout: 30000,
});
