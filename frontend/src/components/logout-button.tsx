"use client";
import axios from "axios";
import Button from "./button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await axios.get("/backend/auth/logout");
    router.push("/auth/login");
  };
  return <Button onClick={handleLogout}>logout</Button>;
};

export default LogoutButton;
