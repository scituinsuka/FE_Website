import axios from "axios";

import { env } from "@/libs/env";

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  timeout: env.NEXT_PUBLIC_TIMEOUT_SECOND * 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  adapter: "fetch",
});
