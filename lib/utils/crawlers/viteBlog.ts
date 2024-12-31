import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';

export const crawlViteBlog = async (website: IWebsite): Promise<CreateArticlePayload[]> => {
  const articles: CreateArticlePayload[] = [];

  return articles;
}