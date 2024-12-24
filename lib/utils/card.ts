import { BaseQueryFn, QueryActionCreatorResult, QueryDefinition } from '@reduxjs/toolkit/query';

import { API_PATH } from '@config/router';
import { IFilters } from './filter';

export enum VIEW_MODE {
  LIST = 'list',
  GRID = 'grid'
}

export const MAX_DESCRIPTION_LENGTH = 150;

type RefetchArticles = QueryActionCreatorResult<
  QueryDefinition<
    {
      search?: string;
      filters: IFilters;
      page: number;
      itemsPerPage: number;
    },
    BaseQueryFn,
    "Articles",
    unknown
  >
>

export const toggleFavorite = async (articleId: string, refetchArticles: () => RefetchArticles): Promise<void> => {
  await fetch(API_PATH.FAVORITE_TOGGLE, {
    method: 'POST',
    body: JSON.stringify({ articleId })
  });

  refetchArticles();
}

export const unlinkTag = async (articleId: string, tagId: string, refetchArticles: () => RefetchArticles): Promise<void> => {
  await fetch(API_PATH.TAG_TOGGLE, {
    method: 'DELETE',
    body: JSON.stringify({ articleId, tagId })
  });

  refetchArticles();
}

export const linkTags = async (articleId: string, tagIds: string[], refetchArticles: () => RefetchArticles): Promise<void> => {
  await fetch(API_PATH.TAG_TOGGLE, {
    method: 'POST',
    body: JSON.stringify({ articleId, tagIds })
  });

  refetchArticles();
}