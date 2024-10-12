import { IWebsite } from "./website";

export interface IArticle {
  id: string;
  title: string;
  description?: string;
  url: string;
  image: string;
  publicationDate: Date;
  website: IWebsite;
}

export type CreateArticlePayload = Omit<IArticle, 'id'>;