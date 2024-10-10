import { createApi } from '@reduxjs/toolkit/query/react'

import { IArticle } from '@models/article';
import { createBaseQuery } from '@store/utils';

export const articlesApi = createApi({
  baseQuery: createBaseQuery,
  reducerPath: 'articles',
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    fetchArticles: builder.query<IArticle[], void>({
      query: () => '/articles',
      providesTags: ['Articles'],
    }),
  }),
})

export const {
  useFetchArticlesQuery,
} = articlesApi