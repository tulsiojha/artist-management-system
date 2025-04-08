"use client";
import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useAuth from "@/hooks/use-auth";
import { IUser } from "@/utils/types";
import { ChevronsUpDown, PowerCircle, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { user } from "@/lib/api-client";

const getInitials = (user: IUser | null) => {
  if (!user) {
    return <User2 size={14} />;
  }
  const initial = user.first_name[0] + user.last_name[0];
  return initial.toUpperCase();
};

const ProfileMenu = () => {
  const u = useAuth();

  const router = useRouter();
  const handleLogout = async () => {
    return user.logout(() => {
      router.push("/auth/login");
    });
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="border-t-1 -mx-4 px-2 border-gray-200 py-2 flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-100">
          <div className="font-bold rounded-full flex items-center justify-center bg-pink-400 h-10 w-10 text-white">
            {getInitials(u)}
          </div>
          <div className="flex flex-col items-start flex-1">
            <span className="text-sm font-bold">
              {u?.first_name} {u?.last_name}
            </span>
            <span className="text-xs text-black/70">{u?.email}</span>
          </div>
          <div>
            <ChevronsUpDown size={20} />
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] rounded-md bg-[#fbf9f7] border-1 border-gray-300 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
        >
          <DropdownMenu.Item
            className="cursor-pointer group relative flex select-none flex-row items-center gap-2 p-2 rounded-[3px] leading-none text-black outline-none data-[disabled]:pointer-events-none hover:bg-gray-200"
            onSelect={handleLogout}
          >
            <PowerCircle size={16} />
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProfileMenu;
