import { articlesApi } from '@store/features/articles/articles.query';
import { websitesApi } from '@store/features/websites/websites.query';

export const enhancedMiddleware = (getDefaultMiddleware: Function) => getDefaultMiddleware({ serializableCheck: false })
  .concat(articlesApi.middleware)
  .concat(websitesApi.middleware)
;