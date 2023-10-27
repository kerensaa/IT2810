import { useState } from 'react';
import { RecipeType } from "../types";

export function usePagination(initialPage: number, itemsPerPage: number, data: RecipeType[]) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const elementsDisplayed = data.slice(startIndex, endIndex);

  const handlePageChange = (_event: unknown, page: number) => {
    setCurrentPage(page);
  };

  return { currentPage, elementsDisplayed, handlePageChange };
}
