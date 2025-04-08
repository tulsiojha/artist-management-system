"use client";

import { Menu, PowerCircle, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { menuItems } from "./sidebar";
import useAuth from "@/hooks/use-auth";
import Link from "next/link";
import { cn } from "@/utils/commons";
import { user } from "@/lib/api-client";
import Button from "./button";

const Header = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const authUser = useAuth();

  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  const roleItems = useCallback(
    () => menuItems.filter((i) => i.roles.includes(authUser?.role!)),
    [authUser],
  );

  return (
    <nav className="border-b-2 border-tertiary-border bg-surface h-[68px] flex items-center px-5">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="font-bold text-primary">AMS</div>
        <button
          className="p-3 flex items-center justify-center"
          onClick={() => {
            setOpen((p) => !p);
          }}
          disabled={logoutLoading}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-[999999] bg-tertiary top-[68px] p-4">
          <ul>
            {roleItems().map((item) => (
              <li key={item.name}>
                <Link
                  href={item.to}
                  className={cn(
                    "px-3 py-2 flex flex-row gap-2 items-center rounded-lg",
                    {
                      "bg-tertiary-active": path.includes(item.to),
                      "hover:bg-surface-hover": !path.includes(item.to),
                      "pointer-events-none": logoutLoading,
                    },
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            className="!p-5 flex items-center justify-center gap-2 border border-tertiary-border rounded w-full mt-5"
            variant="secondary"
            loading={logoutLoading}
            onClick={async () => {
              setLogoutLoading(true);
              await user.logout(() => {
                router.push("/auth/login");
              });
              setOpen(false);
              setLogoutLoading(false);
            }}
          >
            <PowerCircle size={20} />
            <span>Logout</span>
          </Button>
        </div>
      ) : null}
    </nav>
  );
};

export default Header;
