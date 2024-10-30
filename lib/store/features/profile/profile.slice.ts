import { createSlice } from '@reduxjs/toolkit'

import { profileApi } from './profile.query'
import { IProfileState } from './profile.type'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: undefined
  } as IProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      profileApi.endpoints.fetchProfile.matchFulfilled,
      (state, { payload }) => {
        state.profile = payload ?? [];
      },
    )
  }
})

export default profileSlice.reducer