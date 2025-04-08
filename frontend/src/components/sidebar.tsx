"use client";
import { cn } from "@/utils/commons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import { useCallback } from "react";
import { ShieldUser, Users } from "lucide-react";
import ProfileMenu from "./profile-menu";

export const menuItems = [
  {
    name: "Users",
    icon: <Users size={16} />,
    to: "/dashboard/users/",
    roles: ["super_admin"],
  },
  {
    name: "Artists",
    icon: <ShieldUser size={16} />,
    to: "/dashboard/artists/",
    roles: ["super_admin", "artist_manager"],
  },
  {
    name: "Songs",
    icon: <ShieldUser size={16} />,
    to: "/dashboard/songs/",
    roles: ["artist"],
  },
];
const Sidebar = () => {
  const user = useAuth();
  const pathname = usePathname();
  const roleItems = useCallback(
    () => menuItems.filter((i) => i.roles.includes(user?.role!)),
    [user],
  );
  return (
    <nav className="hidden flex-col px-4 bg-tertiary lg:flex">
      <div className="font-bold text-2xl py-5 flex items-center text-primary">
        AMS
      </div>
      <div className="text-sm text-text-secondary/50 mb-3">Menu</div>
      <ul className="flex-1">
        {roleItems().map((item) => (
          <li key={item.name}>
            <Link
              href={item.to}
              className={cn(
                "px-3 py-2 flex flex-row gap-2 items-center rounded-lg",
                {
                  "bg-tertiary-active": pathname.includes(item.to),
                  "hover:bg-surface-hover": !pathname.includes(item.to),
                },
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <ProfileMenu />
    </nav>
  );
};

export default Sidebar;
