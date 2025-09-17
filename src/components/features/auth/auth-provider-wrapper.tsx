import { getCurrentUser } from "@/libs/api/auth";
import { AuthProvider } from "@/components/features/auth/auth-provider";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProviderWrapper = async ({ children }: AuthProviderProps) => {
  const user = await getCurrentUser();

  console.log("User from AuthProviderWrapper:", user);

  if (!user) {
    return (
      <AuthProvider
        isAuthenticated={false}
        user={null}
      >
        {children}
      </AuthProvider>
    );
  }

  return (
    <AuthProvider
      isAuthenticated={true}
      user={user}
    >
      {children}
    </AuthProvider>
  );
};
