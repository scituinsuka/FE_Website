import { cache } from "react";

import { apiClient } from "@/libs/axios";
import { AuthUser, DataLoginResponse } from "@/types/auth";

/**
 * Mengambil data pengguna yang sedang login dari API
 *
 * Fungsi ini menggunakan React cache untuk optimasi performa dan mencegah
 * multiple request ke API dalam satu render cycle. Data pengguna diambil
 * dari endpoint /auth/session dan kemudian diformat sesuai dengan interface AuthUser.
 *
 * @returns {Promise<AuthUser>} Promise yang resolve dengan data pengguna yang terautentikasi
 * @throws {Error} Akan throw error jika request API gagal atau pengguna tidak terautentikasi
 *
 * @example
 * ```typescript
 * const user = await getCurrentUser();
 * console.log(user.name); // Nama pengguna
 * console.log(user.email); // Email pengguna
 * ```
 */
export const getCurrentUser: () => Promise<AuthUser> = cache(async () => {
  const response = await apiClient.get<DataLoginResponse>("/auth/session");
  const { data } = response.data;
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    avatarUrl: data.avatarUrl,
  };
});
