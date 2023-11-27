import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../actions/paginationActions';
import { RootState } from '../reducers/index.js';
import { RecipeType } from '../types';

export function usePagination(itemsPerPage: number, data: RecipeType[]) {
  // Using useSelector to access the currentPage from the Redux store
  const currentPage = useSelector((state: RootState) => state.pagination.currentPage);
  const dispatch = useDispatch();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const elementsDisplayed = data.slice(startIndex, endIndex);

  const handlePageChange = (_event: unknown, page: number) => {
    dispatch(setCurrentPage(page));
  };

  return { currentPage, elementsDisplayed, handlePageChange };
}
