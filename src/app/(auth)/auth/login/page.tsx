import { redirect } from "next/navigation";

import { getCurrentUser } from "@/libs/api/auth";

const LoginPage = async () => {
  const user = await getCurrentUser();
  if (user) {
    redirect("/manage/dashboard");
  }
  return <div>Login Page!</div>;
};

export default LoginPage;
