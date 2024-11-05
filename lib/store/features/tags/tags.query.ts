import { createApi } from '@reduxjs/toolkit/query/react'

import { ITag } from '@models/tag';
import { createBaseQuery } from '@store/utils';

export const tagsApi = createApi({
  baseQuery: createBaseQuery,
  reducerPath: 'tags',
  tagTypes: ['Tags'],
  endpoints: (builder) => ({
    fetchTags: builder.query<ITag[], void>({
      query: () => '/tags',
      providesTags: ['Tags'],
    }),
  }),
})

export const {
  useFetchTagsQuery,
} = tagsApi