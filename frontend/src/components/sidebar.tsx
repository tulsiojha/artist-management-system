"use client";
import { cn } from "@/utils/commons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./logout-button";
import useAuth from "@/hooks/use-auth";
import { useCallback } from "react";

const items = [
  {
    name: "Users",
    to: "/dashboard/users/",
    roles: ["super_admin"],
  },
  {
    name: "Artists",
    to: "/dashboard/artists/",
    roles: ["super_admin", "artist_manager"],
  },
];
const Sidebar = () => {
  const user = useAuth();
  const pathname = usePathname();
  const roleItems = useCallback(
    () => items.filter((i) => i.roles.includes(user?.role!)),
    [user],
  );
  return (
    <nav className="border-r-1 border-gray-200 flex flex-col">
      <div className="font-bold text-2xl px-2 h-[70px] flex items-center border-b-1 border-gray-200">
        AMS
      </div>
      <ul className="flex-1">
        {roleItems().map((item) => (
          <li key={item.name}>
            <Link
              href={item.to}
              className={cn("p-2 block", {
                "bg-blue-200": pathname.includes(item.to),
              })}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <LogoutButton />
    </nav>
  );
};

export default Sidebar;
