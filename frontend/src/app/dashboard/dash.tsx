"use client";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { AuthProvider } from "@/hooks/use-auth";
import { IUser } from "@/utils/types";
import { ReactNode } from "react";

const Dash = ({ children, user }: { children?: ReactNode; user: IUser }) => {
  return (
    <AuthProvider user={user}>
      <div className="grid grid-cols-[250px_auto] h-full">
        <Sidebar />
        <div className="grid grid-rows-[70px_auto]">
          <Header />
          {children}
        </div>
      </div>
    </AuthProvider>
  );
};

export default Dash;
