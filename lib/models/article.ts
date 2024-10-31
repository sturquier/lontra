import { IWebsite } from './website';

export interface IArticle {
  id: string;
  title: string;
  description?: string;
  url: string;
  image?: string;
  publicationDate: Date;
  website: IWebsite;
  isFavorite: boolean;
}

export type CreateArticlePayload = Omit<IArticle, 'id' | 'isFavorite'>;

export type FetchedArticle = Omit<IArticle, 'publicationDate' | 'isFavorite'> & {
  publication_date: string;
  is_favorite: boolean;
}