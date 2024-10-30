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
    fetchArticles: builder.query<{ articles: IArticle[], totalItems: number }, { search?: string, filters: IFilters, page: number, itemsPerPage: number }>({
      query: ({ search, filters, page, itemsPerPage }) => {
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

        params.append('page', page.toString());
        params.append('itemsPerPage', itemsPerPage.toString());

        return `/articles?${params.toString()}`;
      },
      transformResponse: (baseQueryReturnValue: { articles: FetchedArticle[], totalItems: number }) => ({
        ...baseQueryReturnValue,
        articles: baseQueryReturnValue.articles.map((article) => ({
          ...article,
          publicationDate: new Date(article['publication_date'])
        }))
      }),
      providesTags: ['Articles'],
    }),
  }),
})

export const {
  useFetchArticlesQuery,
} = articlesApi