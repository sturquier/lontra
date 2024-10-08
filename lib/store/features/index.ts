import { combineReducers } from 'redux';

import { articlesApi } from './articles/articles.query';
import { websitesApi } from './websites/websites.query';

const createRootReducer = combineReducers({
  [articlesApi.reducerPath]: articlesApi.reducer,
  [websitesApi.reducerPath]: websitesApi.reducer
});

export default createRootReducer;