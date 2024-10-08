import { createSlice } from '@reduxjs/toolkit'

import { articlesApi } from './articles.query'
import { IArticlesState } from './articles.type'

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: []
  } as IArticlesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      articlesApi.endpoints.fetchArticles.matchFulfilled,
      (state, { payload }) => {
        state.articles = payload ?? [];
      },
    )
  }
})

export default articlesSlice.reducer