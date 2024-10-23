import { createApi } from '@reduxjs/toolkit/query/react'

import { IArticle, FetchedArticle } from '@models/article';
import { createBaseQuery } from '@store/utils';
import { DATE_MODE, formatDate } from '@utils/date';
import { IFilters } from '@utils/filter';

export const articlesApi = createApi({
  baseQuery: createBaseQuery,
  reducerPath: 'articles',
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    fetchArticles: builder.query<IArticle[], { search?: string, filters: IFilters }>({
      query: ({ search, filters }) => {
        const params = new URLSearchParams();

        if (search) {
          params.append('search', search);
        }

        if (filters.websiteIds.length) {
          params.append('websiteIds', filters.websiteIds.join(','));
        }

        if (filters.date) {
          params.append('date', formatDate(filters.date, DATE_MODE.STORAGE));
        }

        return `/articles?${params.toString()}`;
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