import LogoutButton from "@/components/logout-button";
import { currentUser } from "@/lib/api";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const DashLayout = async ({ children }: { children?: ReactNode }) => {
  const auth = await currentUser();
  if (!auth) {
    redirect("/auth/login");
  }
  return (
    <>
      hello
      <LogoutButton />
      {children}
    </>
  );
};

export default DashLayout;
