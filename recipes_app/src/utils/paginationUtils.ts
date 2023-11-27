import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../api';
import { setCurrentPage } from '../actions/paginationActions';
import { RootState } from '../reducers/index.js';
import { RecipeType } from '../types';

export function usePagination(itemsPerPage: number, sortOption?: string, filterOption?: string) {
  // Using useSelector to access the currentPage from the Redux store
  const currentPage = useSelector((state: RootState) => state.pagination.currentPage);
  const dispatch = useDispatch();

  const [elementsDisplayed, setElementsDisplayed] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchRecipes(currentPage, itemsPerPage, sortOption, filterOption);
      setElementsDisplayed(data.recipes);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, sortOption, filterOption, dispatch]);

  const handlePageChange = (_event: unknown, page: number) => {
    dispatch(setCurrentPage(page));
  };

  return { currentPage, elementsDisplayed, handlePageChange, loading, totalPages };
}
