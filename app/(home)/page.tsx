'use client';

import { useState } from 'react';
import Image from 'next/image';

import useDebounce from '@hooks/debounce';
import useDialog from '@hooks/dialog';
import { IArticle } from '@models/article';
import { useFetchArticlesQuery } from '@store/features/articles/articles.query';
import { useFetchWebsitesQuery } from '@store/features/websites/websites.query';
import { VIEW_MODE } from '@utils/card';
import { defaultFilters, IFilters } from '@utils/filter';
import { Button, Card, Input, Loader, Modal, Toggle } from '@components/index';
import './page.scss';

export default function Home() {
  const [mode, setMode] = useState<VIEW_MODE>(VIEW_MODE.LIST);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<IFilters>(defaultFilters);
  
  const debouncedSearch = useDebounce(search, 500)
  const { dialogRef, openDialog, closeDialog } = useDialog();

  const { data: articles, isFetching: isFetchingArticles } = useFetchArticlesQuery({ search: debouncedSearch, filters });
  const { data: websites, isFetching: isFetchingWebsites } = useFetchWebsitesQuery();

  const articlesClassName: string = `home-content-articles ${mode === VIEW_MODE.LIST ? 'home-content-articles-list' : 'home-content-articles-grid'}`

  return (
      <main className='home'>
        <h1>Home</h1>
        {(isFetchingArticles || isFetchingWebsites) ? (
          <Loader fullPage />
        ) : (
          <div className='home-content'>
            <Modal
              dialogRef={dialogRef}
              filters={filters}
              websites={websites ?? []}
              onApplyFiltersCallback={setFilters}
              onCloseCallback={closeDialog}
            />
            <div className='home-content-actions'>
              <div className='home-content-actions-filters'>
                <Input
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
                  FILTER
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
            {articles?.length ? (
              <div className={articlesClassName}>
                {articles?.map((article: IArticle, index: number) => (
                  <Card
                    key={index}
                    article={article}
                    mode={mode}
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
                />
              </div>
            )}
          </div>
        )}
      </main>
  );
}
