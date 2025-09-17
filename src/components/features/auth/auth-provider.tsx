"use client";

import { AuthContext } from "@/contexts/auth-context";
import { AuthState } from "@/types/auth";

interface AuthProviderProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  user: AuthState["user"] | null;
}

export const AuthProvider = ({ children, user, isAuthenticated }: AuthProviderProps) => {
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
