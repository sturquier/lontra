import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { collection, getDocs } from 'firebase/firestore';

import { firebaseDB } from '@config/firebase';
import { IArticle } from '@models/article';

export const articlesApi = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'articles',
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    fetchArticles: builder.query<IArticle[], void>({
      async queryFn() {
        try {
          const articles: IArticle[] = [];

          const articlesRef = collection(firebaseDB, 'articles');
          const snapshot = await getDocs(articlesRef);

          snapshot.forEach((document) => {
            articles.push({
              id: document.id,
              ...document.data()
            } as IArticle);
          });

          return { data: articles };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Articles'],
    }),
  }),
})

export const {
  useFetchArticlesQuery,
} = articlesApi