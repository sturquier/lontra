import { createApi } from '@reduxjs/toolkit/query/react'

import { IWebsite } from '@models/website';
import { createBaseQuery } from '@store/utils';

export const websitesApi = createApi({
  baseQuery: createBaseQuery,
  reducerPath: 'websites',
  tagTypes: ['Websites'],
  endpoints: (builder) => ({
    fetchWebsites: builder.query<IWebsite[], void>({
      query: () => '/websites',
      providesTags: ['Websites'],
    }),
  }),
})

export const {
  useFetchWebsitesQuery,
} = websitesApi