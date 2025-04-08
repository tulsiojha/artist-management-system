import { ReactNode } from "react";

const Modal = ({
  open,
  showClose = true,
  header,
  openChange,
  children,
  height,
  width,
}: {
  open?: boolean;
  openChange?: (open: boolean) => void;
  header?: ReactNode;
  showClose?: boolean;
  children?: ReactNode;
  height?: string | number;
  width?: string | number;
}) => {
  if (!open) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black/35 h-full w-full flex items-center justify-center">
      <div
        className="grid grid-rows-[60px_auto] bg-secondary rounded border-1 border-tertiary-border shadow-xl transition-all"
        style={{ height: height || "80vh", width: width || "500px" }}
      >
        <div className="h-[60px] border-b-1 border-tertiary-border bg-tertiary flex flex-row items-center justify-between">
          <div className="px-4 font-bold">{header}</div>
          {showClose ? (
            <button
              className="px-2 mr-4 py-1 cursor-pointer hover:bg-surface-hover rounded transition-all"
              onClick={() => openChange?.(false)}
            >
              ✕
            </button>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
};
export default Modal;
