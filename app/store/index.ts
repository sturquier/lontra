import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './features';
import { enhancedMiddleware } from './middlewares';

export const makeStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => enhancedMiddleware(getDefaultMiddleware)
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];