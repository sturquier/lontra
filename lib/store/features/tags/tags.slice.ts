import { createSlice } from '@reduxjs/toolkit'

import { tagsApi } from './tags.query'
import { ITagsState } from './tags.type'

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: []
  } as ITagsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      tagsApi.endpoints.fetchTags.matchFulfilled,
      (state, { payload }) => {
        state.tags = payload ?? [];
      },
    )
  }
})

export default tagsSlice.reducer