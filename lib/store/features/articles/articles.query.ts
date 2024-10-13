import { createApi } from '@reduxjs/toolkit/query/react'

import { IArticle, FetchedArticle } from '@models/article';
import { createBaseQuery } from '@store/utils';

export const articlesApi = createApi({
  baseQuery: createBaseQuery,
  reducerPath: 'articles',
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    fetchArticles: builder.query<IArticle[], void>({
      query: () => '/articles',
      transformResponse: (baseQueryReturnValue: FetchedArticle[]) => {
        return baseQueryReturnValue.map((article) => ({
          ...article,
          publicationDate: new Date(article['publication_date'])
        }))
      },
      providesTags: ['Articles'],
    }),
  }),
})

export const {
  useFetchArticlesQuery,
} = articlesApi