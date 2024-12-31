'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import useDebounce from '@hooks/debounce';
import useDialog from '@hooks/dialog';
import usePaginatedArticles from '@hooks/pagination';
import { IArticle } from '@models/article';
import { useFetchTagsQuery } from '@store/features/tags/tags.query';
import { useFetchWebsitesQuery } from '@store/features/websites/websites.query';
import { toggleFavorite, unlinkTag, linkTags, VIEW_MODE } from '@utils/card';
import { defaultFilters, getActiveFiltersCount, IFilters } from '@utils/filter';
import { Button, Card, Loader, FiltersModal, TagsModal, Pagination, SearchInput, Toggle } from '@components/index';
import styles from './page.module.scss';

export default function Home() {
  const [mode, setMode] = useState<VIEW_MODE>(VIEW_MODE.LIST);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<IFilters>(defaultFilters);
  const [tagsLinkedArticle, setTagsLinkedArticle] = useState<IArticle | null>(null);
  
  const debouncedSearch = useDebounce(search, 500)
  const { CreateDialogRef, openDialog, closeDialog } = useDialog();

  const { articles, isLoading: isLoadingArticles, refetch: refetchArticles, currentPage, totalPages, handlePageChange } = usePaginatedArticles(debouncedSearch, filters);
  const { data: websites, isFetching: isFetchingWebsites } = useFetchWebsitesQuery();
  const { data: tags, isFetching: isFetchingTags } = useFetchTagsQuery();

  const filtersDialogRef = CreateDialogRef();
  const tagsDialogRef = CreateDialogRef();

  const articlesClassName: string = `${styles['home-content-articles']} ${mode === VIEW_MODE.LIST ? styles['home-content-articles-list'] : styles['home-content-articles-grid']}`

  const openTagsDialog = (linkedArticle: IArticle): void => {
    openDialog(tagsDialogRef);
    setTagsLinkedArticle(linkedArticle);
  }

  const closeTagsDialog = (): void => {
    closeDialog(tagsDialogRef);
    setTagsLinkedArticle(null);
  }

  const applyFilters = (updatedFilters: IFilters): void => {
    handlePageChange({ selected: 0 });
    setFilters(updatedFilters);
    closeDialog(filtersDialogRef);
  }

  const linkArticleTags = async (tagIds: string[]): Promise<void> => {
    await linkTags(tagsLinkedArticle!.id, tagIds, refetchArticles);
    closeTagsDialog();
  }

  useEffect(() => {
    refetchArticles();
  }, [filters, refetchArticles]);

  return (
      <main className={styles.home}>
        <h1>Home</h1>
        {(isLoadingArticles || isFetchingWebsites || isFetchingTags) ? (
          <Loader fullPage />
        ) : (
          <div className={styles['home-content']}>
            <FiltersModal
              dialogRef={filtersDialogRef}
              filters={filters}
              websites={websites ?? []}
              tags={tags ?? []}
              onResetFiltersCallback={(): void => applyFilters(defaultFilters)}
              onApplyFiltersCallback={(updatedFilters: IFilters): void => applyFilters(updatedFilters)}
              onCloseCallback={(): void => closeDialog(filtersDialogRef)}
            />
            <TagsModal
              dialogRef={tagsDialogRef}
              article={tagsLinkedArticle}
              tags={tags ?? []}
              articleTags={tagsLinkedArticle?.tags.map(tag => tag.id) ?? []}
              onLinkTagsCallback={(linkedTags: string[]): Promise<void> => linkArticleTags(linkedTags)}
              onCloseCallback={closeTagsDialog}
            />
            <div className={styles['home-content-actions']}>
              <div className={styles['home-content-actions-filters']}>
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
                  onClickCallback={(): void => openDialog(filtersDialogRef)}
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
                {articles.map((article: IArticle) => (
                  <Card
                    key={article.id}
                    mode={mode}
                    article={article}
                    toggleFavoriteCallback={(): Promise<void> => toggleFavorite(article.id, refetchArticles)}
                    unlinkTagCallback={(tagId: string): Promise<void> => unlinkTag(article.id, tagId, refetchArticles)}
                    openTagsLinkDialogCallback={(): void => openTagsDialog(article)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles['home-content-noresults']}>
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
