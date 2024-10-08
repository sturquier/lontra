import { articlesApi } from "@store/features/articles/articles.query";

export const enhancedMiddleware = (getDefaultMiddleware: Function) => getDefaultMiddleware({ serializableCheck: false })
  .concat(articlesApi.middleware)
;