import { createApi } from '@reduxjs/toolkit/query/react'

import { IUser } from '@models/user';
import { createBaseQuery } from '@store/utils';

export const profileApi = createApi({
  baseQuery: createBaseQuery,
  reducerPath: 'profile',
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    fetchProfile: builder.query<IUser, void>({
      query: () => '/profile',
      providesTags: ['Profile'],
    }),
  }),
})

export const {
  useFetchProfileQuery,
} = profileApi