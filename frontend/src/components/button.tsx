import Spinner from "@/icons/spinner";
import { cn } from "@/utils/commons";
import { ComponentProps } from "react";

const Button = ({
  variant = "primary",
  loading = false,
  block,
  ...props
}: {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  block?: boolean;
} & ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className={cn(
        "px-2 py-1  outline-none border-2  ring-offset-1 focus:ring-2 rounded cursor-pointer",
        {
          "border-primary-border bg-primary focus:ring-primary-outline hover:bg-primary-hover text-white":
            variant === "primary",
          "border-gray-200 bg-white focus:ring-primary-outline hover:bg-gray-50 text-black":
            variant === "secondary",
          "border-red-700 bg-red-600 focus:ring-red-300 hover:bg-red-700 text-white":
            variant === "danger",
          "w-full": block,
        },
      )}
      disabled={loading || props.disabled}
    >
      <div className="flex flex-row items-center justify-center gap-2">
        {loading ? (
          <span className="animate-spin">
            <Spinner size={16} strokeWidth={2} />
          </span>
        ) : null}
        {props.children}
      </div>
    </button>
  );
};

export default Button;
