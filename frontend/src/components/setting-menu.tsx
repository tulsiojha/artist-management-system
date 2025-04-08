"use client";
import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Download, Settings, Upload } from "lucide-react";

const SettingMenu = ({
  handleExport,
  handleImport,
}: {
  handleImport: () => void;
  handleExport: () => void;
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="h-[36px] px-2 py-1  outline-none border-2  ring-offset-1 focus:ring-2 rounded cursor-pointer border-gray-200 bg-white focus:ring-primary-outline hover:bg-gray-50 text-black">
          <Settings size={16} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] rounded-md bg-[#fbf9f7] border-1 border-gray-300 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
        >
          <DropdownMenu.Item
            className="text-[15px] cursor-pointer group relative flex select-none flex-row items-center gap-2 p-2 rounded-[3px] leading-none text-black outline-none data-[disabled]:pointer-events-none hover:bg-gray-200"
            onSelect={handleImport}
          >
            <Upload size={15} />
            Import CSV
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="text-[15px] cursor-pointer group relative flex select-none flex-row items-center gap-2 p-2 rounded-[3px] leading-none text-black outline-none data-[disabled]:pointer-events-none hover:bg-gray-200"
            onSelect={handleExport}
          >
            <Download size={15} />
            Export CSV
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default SettingMenu;
