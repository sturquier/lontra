import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { collection, getDocs } from 'firebase/firestore';

import { firebaseDB } from '@config/firebase';
import { IWebsite } from '@models/website';

export const websitesApi = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'websites',
  tagTypes: ['Websites'],
  endpoints: (builder) => ({
    fetchWebsites: builder.query<IWebsite[], void>({
      async queryFn() {
        try {
          const websites: IWebsite[] = [];

          const websitesRef = collection(firebaseDB, 'websites');
          const snapshot = await getDocs(websitesRef);

          snapshot.forEach((document) => {
            websites.push({
              id: document.id,
              ...document.data()
            } as IWebsite);
          });

          return { data: websites };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Websites'],
    }),
  }),
})

export const {
  useFetchWebsitesQuery,
} = websitesApi