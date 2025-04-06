import Modal from "./modal";
import { useState } from "react";
import Button from "./button";

const DeleteModal = ({
  resource,
  onSubmit,
  open,
  openChange,
}: {
  resource: string;
  onSubmit?: () => Promise<any>;
  open?: boolean;
  openChange?: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      open={open}
      openChange={openChange}
      header={`Delete ${resource}`}
      showClose={false}
      height={"auto"}
      width={"300px"}
    >
      <form
        className="flex flex-col gap-2 p-4"
        onSubmit={async (e) => {
          setLoading(true);
          e.preventDefault();
          e.stopPropagation();
          await onSubmit?.();
          setLoading(false);
        }}
      >
        <div className="text-xl text-black/70 py-3 text-center">
          Are you sure you want to delete this {resource}?
        </div>
        <div className="flex flex-row items-center gap-2">
          <Button variant="secondary" block onClick={openChange}>
            Cancel
          </Button>
          <Button variant="danger" type="submit" loading={loading} block>
            Delete
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteModal;
