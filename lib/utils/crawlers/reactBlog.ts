import * as cheerio from 'cheerio';

import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';
import { isValidDate } from '@utils/date';
import { isValidUrl } from '@utils/url';

export const crawlReactBlog = async (website: IWebsite): Promise<CreateArticlePayload[]> => {
  const articles: CreateArticlePayload[] = [];

  const response = await fetch(website.url);
  const body = await response.text();

  const html = cheerio.load(body);

  html('a.block').each((_, element) => {
    const article = html(element);

    const title = article.find('h2').text().trim();

    const description = article.find('p').text().trim() || undefined;

    const url = article.attr('href');

    const publicationDateText = article.find('.text-tertiary').text().trim();
    const publicationDate = new Date(publicationDateText);

    if (!title || !url || !publicationDate) {
      return false;
    }

    if (!isValidDate(publicationDate)) {
      return false;
    }

    const fullUrl = `${website.url}${url}`;

    if (!isValidUrl(fullUrl)) {
      return false;
    }
    
    articles.push({
      title,
      description,
      url: fullUrl,
      publicationDate,
      website
    })
  });

  return articles;
}