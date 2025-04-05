"use client";
import { PAGINATION_LIMIT } from "@/utils/constants";
import Pagination from "./pagination";

const List = ({
  rows,
  columns,
  totalItems,
  onPageChanged,
  page = 1,
  perPage = PAGINATION_LIMIT,
}: {
  rows: any[];
  columns: { className?: string; width?: string; label: string; id: string }[];
  totalItems: number;
  onPageChanged?: (page: number) => void;
  page?: number;
  perPage?: number;
}) => {
  return (
    <div className="w-full h-full flex flex-col rounded border-1 border-gray-300 overflow-hidden">
      <div className="flex flex-row items-center w-full px-2 py-2 border-b-2 border-gray-300 bg-gray-200 text-gray-600 font-bold text-sm">
        {columns.map((col) => {
          return (
            <div
              key={col.id}
              className={col.className}
              style={{ width: col.width }}
            >
              {col.label}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col w-full flex-1">
        {rows.map((row) => {
          return (
            <div
              key={row.id}
              className="flex flex-row items-center w-full px-2 py-2 last:border-0 border-b-1 border-gray-200"
            >
              {columns.map((col) => (
                <div
                  key={col.id}
                  className={col.className}
                  style={{ width: col.width }}
                >
                  {row.columns[col.id]?.render()}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="border-t-2 border-gray-300 bg-gray-100 px-2 py-1 flex flex-row items-center justify-between">
        <div>Total items: {totalItems}</div>
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
