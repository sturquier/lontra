import { IArticle } from './article';

export interface IWebsite {
  id: string;
  name: string;
  articles: IArticle[];
}