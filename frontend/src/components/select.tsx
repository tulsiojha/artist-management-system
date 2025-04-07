import { ComponentProps, ReactNode } from "react";

const Select = (
  props: ComponentProps<"select"> & {
    items: { label: string | number; value: string | number }[];

    label?: ReactNode;
    error?: ReactNode;
  },
) => {
  const { items, label, error, ...rest } = props;
  return (
    <div className="flex flex-col gap-1 w-full">
      {label ? <div className="text-sm text-black/60">{label}</div> : null}
      <select
        className="w-full bg-white border-2 border-gray-200 rounded text-sm px-2 py-1 outline-none ring-offset-1 focus:ring-2 ring-primary-outline"
        {...rest}
      >
        {props.items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {error ? <div className="text-xs text-red-700">{error}</div> : null}
    </div>
  );
};

export default Select;
