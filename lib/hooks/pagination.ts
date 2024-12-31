import { useState } from 'react';

import { ITEMS_PER_PAGE } from '@config/pagination';
import { useFetchArticlesQuery } from '@store/features/articles/articles.query';
import { IFilters } from '@utils/filter';

export default function usePaginatedArticles (search: string, filters: IFilters) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, refetch } = useFetchArticlesQuery({
    search,
    filters,
    page: currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const totalPages = data ? Math.ceil(data.totalItems / ITEMS_PER_PAGE) : 1;

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  return {
      articles: data?.articles || [],
      isLoading,
      refetch,
      currentPage,
      totalPages,
      handlePageChange
  };
};
