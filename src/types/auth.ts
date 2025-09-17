export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
}

export type AuthContextType = AuthState;

export interface DataLoginResponse {
  data: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
}
