import { createSlice } from '@reduxjs/toolkit'

import { websitesApi } from './websites.query'
import { IWebsitesState } from './websites.type'

const websitesSlice = createSlice({
  name: 'websites',
  initialState: {
    websites: []
  } as IWebsitesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      websitesApi.endpoints.fetchWebsites.matchFulfilled,
      (state, { payload }) => {
        state.websites = payload ?? [];
      },
    )
  }
})

export default websitesSlice.reducer