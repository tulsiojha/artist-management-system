import { ComponentProps, ReactNode } from "react";

const TextInput = ({
  label,
  error,
  ...props
}: { label?: ReactNode; error?: ReactNode } & ComponentProps<"input">) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label ? <div className="text-sm text-black/60">{label}</div> : null}
      <input
        size={10}
        className="w-full bg-white border-2 border-gray-200 rounded text-sm px-2 py-1 outline-none ring-offset-1 focus:ring-2 ring-primary-outline"
        {...props}
      />
      {error ? <div className="text-xs text-red-700">{error}</div> : null}
    </div>
  );
};

export default TextInput;
