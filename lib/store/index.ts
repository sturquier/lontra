import { configureStore } from '@reduxjs/toolkit';

import { articlesApi } from './features/articles/articles.query';
import { profileApi } from './features/profile/profile.query';
import { websitesApi } from './features/websites/websites.query';
import rootReducer from './features';

export const makeStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ serializableCheck: false })
      .concat(articlesApi.middleware)
      .concat(profileApi.middleware)
      .concat(websitesApi.middleware)
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];