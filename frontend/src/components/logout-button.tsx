"use client";
import axios from "axios";
import Button from "./button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import handleErrors from "@/utils/handleErrors";

const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.get("/backend/auth/logout");
      router.push("/auth/login");
      toast.success("Successfully logged out.", {
        richColors: true,
        closeButton: true,
      });
    } catch (err) {
      toast.error(handleErrors(err), { richColors: true, closeButton: true });
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      className="outline-none p-2 text-start border-t-1 border-gray-200 cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
