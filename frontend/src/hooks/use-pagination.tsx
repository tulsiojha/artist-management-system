"use client";
import { useEffect, useState } from "react";

interface IUsePagination<T> {
  items: T;
  itemsPerPage: number;
}

export const usePagination = <T extends Array<any>>({
  items,
  itemsPerPage,
}: IUsePagination<T>) => {
  const [listItems, setListItems] = useState(items);
  const [page, setPage] = useState<typeof items>();
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    if (listItems.length > 0) {
      let tempItems = listItems.slice(
        (pageNumber - 1) * itemsPerPage,
        pageNumber * itemsPerPage,
      );

      if (tempItems.length === 0) {
        tempItems = listItems.slice(
          (Math.ceil(listItems.length / itemsPerPage) - 1) * itemsPerPage,
          listItems.length,
        );
        setPageNumber((prev) => prev - 1);
      }
      setPage(tempItems as T);
    } else {
      setPageNumber(1);
    }
  }, [listItems]);

  useEffect(() => {
    if (pageNumber * itemsPerPage >= listItems.length) {
      setHasNext(false);
    } else {
      setHasNext(true);
    }

    if (pageNumber * itemsPerPage > itemsPerPage) {
      setHasPrevious(true);
    } else {
      setHasPrevious(false);
    }
  }, [page]);

  const onNext = () => {
    if (pageNumber < Math.ceil(listItems.length / itemsPerPage)) {
      setPage(
        listItems.slice(
          pageNumber * itemsPerPage,
          (pageNumber + 1) * itemsPerPage,
        ) as T,
      );
      setPageNumber((prev) => prev + 1);
    }
  };

  const onPrev = () => {
    if (pageNumber > 1) {
      setPage(
        listItems.slice(
          (pageNumber - 1 - 1) * itemsPerPage,
          (pageNumber - 1) * itemsPerPage,
        ) as T,
      );
      setPageNumber((prev) => prev - 1);
    }
  };

  const onPageChange = () => {};

  const setPageNumberExt = (extpage: number) => {
    if (extpage <= Math.ceil(listItems.length / itemsPerPage)) {
      setPage(
        listItems.slice(
          (extpage - 1) * itemsPerPage,
          extpage * itemsPerPage,
        ) as T,
      );
      setPageNumber(extpage);
    }
  };

  return {
    page: page || [],
    pageNumber,
    hasNext,
    hasPrevious,
    onNext,
    onPrev,
    onPageChange,
    setPageNumber: setPageNumberExt,
    setItems: setListItems,
    items: listItems,
    itemsPerPage,
  };
};
