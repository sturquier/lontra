import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';

export const crawlPrismaBlog = async (website: IWebsite): Promise<CreateArticlePayload[]> => {
  const articles: CreateArticlePayload[] = [];

  return articles;
}