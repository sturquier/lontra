import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';

export const crawlReactBlog = async (website: IWebsite): Promise<CreateArticlePayload[]> => {
  const articles: CreateArticlePayload[] = [];

  return articles;
}