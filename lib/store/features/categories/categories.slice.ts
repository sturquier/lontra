import { createSlice } from '@reduxjs/toolkit'

import { categoriesApi } from './categories.query'
import { ICategoriesState } from './categories.type'

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: []
  } as ICategoriesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      categoriesApi.endpoints.fetchCategories.matchFulfilled,
      (state, { payload }) => {
        state.categories = payload ?? [];
      },
    )
  }
})

export default categoriesSlice.reducer