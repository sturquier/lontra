import { combineReducers } from 'redux';

import { articlesApi } from './articles/articles.query';
import { tagsApi } from './tags/tags.query';
import { profileApi } from './profile/profile.query';
import { websitesApi } from './websites/websites.query';

const createRootReducer = combineReducers({
  [articlesApi.reducerPath]: articlesApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [websitesApi.reducerPath]: websitesApi.reducer
});

export default createRootReducer;