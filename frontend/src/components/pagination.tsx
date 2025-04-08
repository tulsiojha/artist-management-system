"use client";
import { cn } from "@/utils/commons";
import { ComponentProps, useState } from "react";

const getPagesToRender = (page: number, totalPages: number) => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, page + 2);

  // Adjust if we're near the beginning
  if (page <= 3) {
    start = 1;
    end = Math.min(totalPages, maxVisible);
  }

  // Adjust if we're near the end
  if (page > totalPages - 3) {
    start = Math.max(1, totalPages - maxVisible + 1);
    end = totalPages;
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};

const PageButton = (
  props: ComponentProps<"button"> & { selected?: boolean },
) => {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "outline-none border-1 border-gray-300 px-2 py-0.5 font-mono cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed",
        props.className,
        {
          "hover:bg-gray-300 bg-white": !props.selected,
          "bg-blue-200": props.selected,
        },
      )}
    />
  );
};

const Pagination = ({
  totalItems,
  perPage = 3,
  onPageChanged,
  page = 1,
}: {
  totalItems: number;
  perPage?: number;
  onPageChanged?: (page: number) => void;
  page: number;
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  return (
    <div className="flex flex-row items-center">
      <PageButton
        className="rounded-l border-r-0"
        disabled={page === 1}
        onClick={() => {
          onPageChanged?.(1);
        }}
      >
        {"<<"}
      </PageButton>
      <PageButton
        disabled={page === 1}
        onClick={() => {
          onPageChanged?.(page - 1);
        }}
      >
        {"<"}
      </PageButton>
      {getPagesToRender(page, totalPages).map((p) => (
        <PageButton
          key={p}
          className="border-l-0"
          selected={page === p}
          onClick={() => {
            onPageChanged?.(p);
          }}
        >
          {p}
        </PageButton>
      ))}
      <PageButton
        className="border-l-0"
        disabled={page === totalPages}
        onClick={() => {
          onPageChanged?.(page + 1);
        }}
      >
        {">"}
      </PageButton>
      <PageButton
        className="border-l-0 rounded-r"
        disabled={page === totalPages}
        onClick={() => {
          onPageChanged?.(totalPages);
        }}
      >
        {">>"}
      </PageButton>
    </div>
  );
};

export default Pagination;
