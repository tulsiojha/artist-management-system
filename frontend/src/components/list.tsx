"use client";
import { PAGINATION_LIMIT } from "@/utils/constants";
import Pagination from "./pagination";
import { ReactNode } from "react";
import { cn, perPageItems } from "@/utils/commons";
import Select from "./select";

const List = ({
  rows,
  columns,
  totalItems,
  onPageChanged,
  onLimitChanged,
  page = 1,
  perPage = PAGINATION_LIMIT,
}: {
  rows: {
    columns: Record<string, { render: () => ReactNode }>;
    id: string | number;
    onClick?: () => void;
  }[];
  columns: { className?: string; width?: string; label: string; id: string }[];
  totalItems: number;
  onPageChanged?: (page: number) => void;
  onLimitChanged?: (limit: string) => void;
  page?: number;
  perPage?: number;
}) => {
  return (
    <div className="w-full flex flex-col flex-1 rounded border-2 border-surface-border overflow-hidden">
      <div className="flex flex-row items-center w-full px-2 py-2 border-b-2 border-surface-border bg-surface text-gray-600 font-bold text-sm ">
        {columns.map((col) => {
          return (
            <div
              key={col.id}
              className={cn(
                col.className,
                "mr-3 nth-[n+3]:hidden md:nth-[n+3]:flex md:nth-[n+4]:hidden lg:nth-[n+4]:flex last:!flex",
              )}
              style={{ width: col.width }}
            >
              {col.label}
            </div>
          );
        })}
      </div>
      <div className="w-full flex-1 relative">
        {rows.length === 0 ? (
          <div className="absolute inset-0 text-lg text-black/50 font-bold flex items-center justify-center z-1">
            List is empty.
          </div>
        ) : null}
        <div className="flex flex-col w-full h-full inset-0 absolute overflow-y-scroll">
          {rows.map((row) => {
            return (
              <div
                key={row.id}
                className={cn(
                  "flex flex-row items-center w-full px-2 py-2 last:border-0 border-b-1 border-surface-border",
                  { "cursor-pointer hover:bg-surface-hover": !!row.onClick },
                )}
                onClick={row.onClick}
              >
                {columns.map((col) => (
                  <div
                    key={col.id}
                    className={cn(
                      col.className,
                      "line-clamp-1 mr-3 nth-[n+3]:hidden md:nth-[n+3]:flex md:nth-[n+4]:hidden lg:nth-[n+4]:flex last:!flex",
                    )}
                    style={{ width: col.width }}
                  >
                    {row.columns[col.id]?.render()}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t-2 border-surface-border bg-surface px-2 py-1 flex flex-row items-center justify-between">
        <div className="hidden flex-row items-center justify-center gap-5 md:flex">
          <div className="flex shrink-0">Total items: {totalItems}</div>
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="flex shrink-0">Items per page:</div>
            <Select
              items={perPageItems.map((ppi) => ({ label: ppi, value: ppi }))}
              value={perPage}
              onChange={({ target: { value } }) => {
                onLimitChanged?.(value || `${PAGINATION_LIMIT}`);
              }}
            />
          </div>
        </div>
        <Pagination
          totalItems={totalItems}
          page={page}
          onPageChanged={onPageChanged}
          perPage={perPage}
        />
      </div>
    </div>
  );
};

export default List;
