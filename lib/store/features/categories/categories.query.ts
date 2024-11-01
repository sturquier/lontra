import { createApi } from '@reduxjs/toolkit/query/react'

import { ICategory } from '@models/category';
import { createBaseQuery } from '@store/utils';

export const categoriesApi = createApi({
  baseQuery: createBaseQuery,
  reducerPath: 'categories',
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    fetchCategories: builder.query<ICategory[], void>({
      query: () => '/categories',
      providesTags: ['Categories'],
    }),
  }),
})

export const {
  useFetchCategoriesQuery,
} = categoriesApi