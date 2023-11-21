import { useEffect, useState } from 'react';
import { fetchRecipes } from '../api';
import { RecipeType } from "../types";

export function usePagination(initialPage: number, itemsPerPage: number, sortOption?: string, filterOption?: string) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [elementsDisplayed, setElementsDisplayed] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchRecipes(currentPage, itemsPerPage, sortOption, filterOption);
      setElementsDisplayed(data.recipes);
      setTotalPages(data.totalPages); // Assuming the backend sends the total number of pages
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, sortOption, filterOption]);

  const handlePageChange = (_event: unknown, page: number) => {
    setCurrentPage(page);
  };

  return { currentPage, elementsDisplayed, handlePageChange, loading, totalPages };
}
