import { Pencil, Trash } from "lucide-react";
import { ComponentProps } from "react";

const ItemAction = ({
  deleteProps,
  editProps,
}: {
  deleteProps: ComponentProps<"button">;
  editProps: ComponentProps<"button">;
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <button
        {...editProps}
        className="cursor-pointer p-1.5 hover:bg-gray-200 rounded"
      >
        <Pencil size={14} />
      </button>
      <button
        {...deleteProps}
        className="cursor-pointer p-1.5 hover:bg-gray-200 rounded text-red-600 disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-default"
      >
        <Trash size={14} />
      </button>
    </div>
  );
};

export default ItemAction;
