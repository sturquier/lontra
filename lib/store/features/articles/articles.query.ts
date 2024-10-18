import { createApi } from '@reduxjs/toolkit/query/react'

import { IArticle, FetchedArticle } from '@models/article';
import { createBaseQuery } from '@store/utils';

export const articlesApi = createApi({
  baseQuery: createBaseQuery,
  reducerPath: 'articles',
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    fetchArticles: builder.query<IArticle[], { search?: string }>({
      query: ({ search }) => {
        let baseQuery = '/articles'

        if (search) {
          baseQuery += `?search=${encodeURIComponent(search)}`
        }

        return baseQuery
      },
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