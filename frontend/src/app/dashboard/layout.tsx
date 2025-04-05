import { currentUser } from "@/lib/api";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Dash from "./dash";

const DashLayout = async ({ children }: { children?: ReactNode }) => {
  const user = await currentUser();
  if (!user) {
    redirect("/auth/login");
  }
  return <Dash user={user}>{children}</Dash>;
};

export default DashLayout;
