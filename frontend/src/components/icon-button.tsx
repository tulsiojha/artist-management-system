import { ComponentProps } from "react";

const IconButton = (props: ComponentProps<"button">) => {
  return (
    <button
      className="cursor-pointer p-1.5 hover:bg-gray-200 rounded"
      {...props}
    />
  );
};

export default IconButton;
