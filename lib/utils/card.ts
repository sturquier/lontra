import { BaseQueryFn, QueryActionCreatorResult, QueryDefinition } from '@reduxjs/toolkit/query';

import { API_PATH } from '@config/router';

export enum VIEW_MODE {
  LIST = 'list',
  GRID = 'grid'
}

export const MAX_DESCRIPTION_LENGTH = 150;

type RefetchArticles = QueryActionCreatorResult<QueryDefinition<{}, BaseQueryFn, "Articles", {}>>

export const toggleFavorite = async (articleId: string, refetchArticles: RefetchArticles): Promise<void> => {
  await fetch(API_PATH.FAVORITE_TOGGLE, {
    method: 'POST',
    body: JSON.stringify({ articleId })
  });

  refetchArticles;
}

export const unlinkTag = async (articleId: string, tagId: string, refetchArticles: RefetchArticles): Promise<void> => {
  await fetch(API_PATH.TAG_TOGGLE, {
    method: 'DELETE',
    body: JSON.stringify({ articleId, tagId })
  });

  refetchArticles;
}