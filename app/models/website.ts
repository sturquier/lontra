import { IArticle } from "./article";

export interface IWebsite {
  id: number;
  name: string;
  articles: IArticle[];
}