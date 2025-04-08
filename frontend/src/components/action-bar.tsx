import { ReactNode } from "react";

const ActionBar = ({
  title,
  action,
}: {
  title: ReactNode;
  action?: ReactNode;
}) => {
  return (
    <div className="flex items-center h-16 justify-between">
      <div className="font-bold text-xl">{title}</div>
      <div>{action}</div>
    </div>
  );
};

export default ActionBar;
