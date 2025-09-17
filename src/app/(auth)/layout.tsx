import { Suspense } from "react";

export const dynamic = "force-dynamic";

import { AuthProviderWrapper } from "@/components/features/auth/auth-provider-wrapper";

interface AuthLayout {
  children: React.ReactNode;
}

const AuthLayoutSuspense = ({ children }: AuthLayout) => {
  return <AuthProviderWrapper>{children}</AuthProviderWrapper>;
};

const AuthLayout = ({ children }: AuthLayout) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthLayoutSuspense>{children}</AuthLayoutSuspense>
    </Suspense>
  );
};

export default AuthLayout;
