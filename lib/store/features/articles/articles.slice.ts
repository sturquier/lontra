import { createSlice } from '@reduxjs/toolkit'

import { articlesApi } from './articles.query'
import { IArticlesState } from './articles.type'

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    totalItems: 0,
    articles: []
  } as IArticlesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      articlesApi.endpoints.fetchArticles.matchFulfilled,
      (state, { payload }) => {
        state.totalItems = payload.totalItems;
        state.articles = payload.articles ?? [];
      },
    )
  }
})

export default articlesSlice.reducer