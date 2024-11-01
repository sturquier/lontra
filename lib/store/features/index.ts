import { combineReducers } from 'redux';

import { articlesApi } from './articles/articles.query';
import { categoriesApi } from './categories/categories.query';
import { profileApi } from './profile/profile.query';
import { websitesApi } from './websites/websites.query';

const createRootReducer = combineReducers({
  [articlesApi.reducerPath]: articlesApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [websitesApi.reducerPath]: websitesApi.reducer
});

export default createRootReducer;