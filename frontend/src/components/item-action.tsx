import { Pencil, Trash } from "lucide-react";
import { MouseEventHandler } from "react";

const ItemAction = ({
  onEdit,
  onDelete,
}: {
  onEdit?: MouseEventHandler<HTMLButtonElement>;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <button
        onClick={onEdit}
        className="cursor-pointer p-1.5 hover:bg-gray-200 rounded"
      >
        <Pencil size={14} />
      </button>
      <button
        onClick={onDelete}
        className="cursor-pointer p-1.5 hover:bg-gray-200 rounded text-red-600"
      >
        <Trash size={14} />
      </button>
    </div>
  );
};

export default ItemAction;
