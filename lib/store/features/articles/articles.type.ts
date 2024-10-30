import { IArticle } from '@models/article';

export interface IArticlesState {
  totalItems: number,
  articles: IArticle[];
}