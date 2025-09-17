import axios from "axios";

import { env } from "@/libs/env";

/**
 * Instance client Axios yang dikonfigurasi untuk komunikasi dengan backend API
 *
 * Client ini sudah dikonfigurasi dengan:
 * - Base URL dari environment variable
 * - Timeout sesuai konfigurasi environment
 * - Credentials untuk mendukung autentikasi berbasis cookie
 * - Headers default untuk JSON communication
 * - Adapter fetch untuk kompatibilitas dengan Next.js
 *
 * @constant {AxiosInstance} apiClient - Instance axios yang siap digunakan untuk API calls
 *
 * @example
 * ```typescript
 * // GET request
 * const response = await apiClient.get('/users');
 *
 * // POST request
 * const response = await apiClient.post('/auth/login', {
 *   email: 'user@example.com',
 *   password: 'password123'
 * });
 *
 * // PUT request
 * const response = await apiClient.put('/users/1', userData);
 *
 * // DELETE request
 * const response = await apiClient.delete('/users/1');
 * ```
 */
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
