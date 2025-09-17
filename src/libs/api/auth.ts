import { cache } from "react";

import { apiClient } from "@/libs/axios";
import { AuthUser, DataLoginResponse } from "@/types/auth";

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
