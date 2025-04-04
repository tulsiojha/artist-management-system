import { cn } from "@/utils/commons";
import { ComponentProps } from "react";

const Button = ({
  variant = "primary",
  ...props
}: {
  variant?: "primary" | "secondary" | "danger";
} & ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className={cn(
        "px-2 py-1 text-white outline-none border-2  ring-offset-1 focus:ring-2 rounded cursor-pointer",
        {
          "border-primary-border bg-primary focus:ring-primary-outline hover:bg-primary-hover":
            variant === "primary",
        },
      )}
    />
  );
};

export default Button;
