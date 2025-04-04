import { currentUser } from "@/lib/api";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children?: ReactNode }) => {
  const auth = await currentUser();
  if (auth) {
    redirect("/dashboard");
  }
  return <>{children}</>;
};

export default AuthLayout;
