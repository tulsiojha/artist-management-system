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
          "border-primary-border bg-primary focus:ring-primary-outline hover:bg-primary-hover text-text-primary":
            variant === "primary",
          "border-secondary-border bg-secondary focus:ring-secondary-outline hover:bg-secondary-hover text-text-secondary":
            variant === "secondary",
          "border-danger-border bg-danger focus:ring-danger-outline hover:bg-danger-hover text-text-danger":
            variant === "danger",
          "w-full": block,
        },
        props.className,
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
