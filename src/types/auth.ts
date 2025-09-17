/**
 * Interface yang mendefinisikan struktur data pengguna yang terautentikasi
 * @interface AuthUser
 */
export interface AuthUser {
  /** ID unik pengguna */
  id: string;
  /** Alamat email pengguna */
  email: string;
  /** Nama lengkap pengguna */
  name: string;
  /** URL avatar pengguna (opsional) */
  avatarUrl: string | null;
}

/**
 * Interface yang mendefinisikan state autentikasi aplikasi
 * @interface AuthState
 */
export interface AuthState {
  /** Status apakah pengguna sudah terautentikasi */
  isAuthenticated: boolean;
  /** Data pengguna yang sedang login (null jika belum login) */
  user: AuthUser | null;
}

/**
 * Tipe untuk context autentikasi, merupakan alias dari AuthState
 * @typedef {AuthState} AuthContextType
 */
export type AuthContextType = AuthState;

/**
 * Interface untuk response data login dari API
 * @interface DataLoginResponse
 */
export interface DataLoginResponse {
  /** Data pengguna dari response API */
  data: {
    /** ID unik pengguna */
    id: string;
    /** Nama lengkap pengguna */
    name: string;
    /** Alamat email pengguna */
    email: string;
    /** URL avatar pengguna (opsional) */
    avatarUrl: string | null;
  };
}
