import { combineReducers } from 'redux';

import { articlesApi } from './articles/articles.query';

const createRootReducer = combineReducers({
  [articlesApi.reducerPath]: articlesApi.reducer
});

export default createRootReducer;