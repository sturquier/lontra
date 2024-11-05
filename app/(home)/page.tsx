'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import useDebounce from '@hooks/debounce';
import useDialog from '@hooks/dialog';
import usePaginatedArticles from '@hooks/pagination';
import { IArticle } from '@models/article';
import { useFetchTagsQuery } from '@store/features/tags/tags.query';
import { useFetchWebsitesQuery } from '@store/features/websites/websites.query';
import { VIEW_MODE } from '@utils/card';
import { favoriteTogglePath } from '@utils/favorite';
import { defaultFilters, getActiveFiltersCount, IFilters } from '@utils/filter';
import { Button, Card, Loader, Modal, Pagination, SearchInput, Toggle } from '@components/index';
import './page.scss';

export default function Home() {
  const [mode, setMode] = useState<VIEW_MODE>(VIEW_MODE.LIST);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<IFilters>(defaultFilters);
  
  const debouncedSearch = useDebounce(search, 500)
  const { dialogRef, openDialog, closeDialog } = useDialog();

  const { articles, isFetching: isFetchingArticles, refetch: refetchArticles, currentPage, totalPages, handlePageChange } = usePaginatedArticles(debouncedSearch, filters);
  const { data: websites, isFetching: isFetchingWebsites } = useFetchWebsitesQuery();
  const { data: tags, isFetching: isFetchingTags } = useFetchTagsQuery();

  const articlesClassName: string = `home-content-articles ${mode === VIEW_MODE.LIST ? 'home-content-articles-list' : 'home-content-articles-grid'}`

  const toggleFavorite = async (articleId: string): Promise<void> => {
    await fetch(favoriteTogglePath, {
      method: 'POST',
      body: JSON.stringify({ articleId })
    });

    refetchArticles();
  }

  useEffect(() => {
    refetchArticles();
  }, [filters, refetchArticles]);

  return (
      <main className='home'>
        <h1>Home</h1>
        {(isFetchingArticles || isFetchingWebsites || isFetchingTags) ? (
          <Loader fullPage />
        ) : (
          <div className='home-content'>
            <Modal
              dialogRef={dialogRef}
              filters={filters}
              websites={websites ?? []}
              tags={tags ?? []}
              onApplyFiltersCallback={setFilters}
              onCloseCallback={closeDialog}
            />
            <div className='home-content-actions'>
              <div className='home-content-actions-filters'>
                <SearchInput
                  placeholder='SEARCH'
                  value={search}
                  onChangeCallback={setSearch}
                  onClearCallback={(): void => setSearch('')}
                />
                <Button
                  icon={{
                    src: '/icons/filter.svg',
                    alt: 'Filter icon'
                  }}
                  onClickCallback={openDialog}
                >
                  {`${getActiveFiltersCount(filters) > 0 ? `EDIT FILTERS (${getActiveFiltersCount(filters)})` : 'FILTER'}`}
                </Button>
              </div>
              <Toggle
                labels={['List', 'Grid']}
                isChecked={mode === VIEW_MODE.GRID}
                icon={{
                  src: mode === VIEW_MODE.LIST ? '/icons/list.svg' : '/icons/grid.svg',
                  alt: mode === VIEW_MODE.LIST ? 'List icon' : 'Grid icon'
                }}
                onChangeCallback={(): void => setMode(mode === VIEW_MODE.LIST ? VIEW_MODE.GRID : VIEW_MODE.LIST)}
              />
            </div>
            {articles.length ? (
              <div className={articlesClassName}>
                {articles.map((article: IArticle, index: number) => (
                  <Card
                    key={index}
                    mode={mode}
                    article={article}
                    toggleFavoriteCallback={(): Promise<void> => toggleFavorite(article.id)}
                  />
                ))}
              </div>
            ) : (
              <div className='home-content-noresults'>
                <h2>No articles found</h2>
                <Image
                  src="/icons/no-results.svg"
                  alt="No results icon"
                  width={120}
                  height={120}
                  priority
                />
              </div>
            )}
            {!!articles.length && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </main>
  );
}
