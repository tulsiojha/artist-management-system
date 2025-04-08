import { cn } from "@/utils/commons";
import NepaliDatePicker from "@zener/nepali-datepicker-react";
import { ReactNode } from "react";

const Datepicker = ({
  value,
  onChange,
  error,
  label,
  placeholder,
}: {
  value: string;
  onChange?: (e: Date | null) => void;
  placeholder?: string;
  label?: ReactNode;
  error?: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label ? (
        <div className="text-sm text-text-secondary/60">{label}</div>
      ) : null}
      <NepaliDatePicker
        type="AD"
        lang="en"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        showclear={false}
        className={() => {
          const c = cn(
            "w-full bg-secondary border-2 text-black rounded text-sm px-2 py-1 outline-none ring-offset-1 focus:ring-2 ring-primary-outline h-[30.5px]",
          );
          const d = cn("border-secondary-border", c);
          const f = cn("border-primary-outline", c);
          return { focus: f, disabled: "", default: d };
        }}
      />
      {error ? <div className="text-xs text-danger">{error}</div> : null}
    </div>
  );
};

export default Datepicker;
