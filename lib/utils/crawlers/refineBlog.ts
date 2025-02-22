import * as cheerio from 'cheerio';

import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';
import { isValidDate } from '@utils/date';
import { isValidUrl } from '@utils/url';

export const crawlRefineBlog = async (website: IWebsite): Promise<CreateArticlePayload[]> => {
  const articles: CreateArticlePayload[] = [];

  const response = await fetch(website.url);
  const body = await response.text();

  const html = cheerio.load(body);

  html('article').each((_, element) => {
    const article = html(element);

    const title = article.find('.text-xl').text().trim();

    const description = article.find('.text-sm').text().trim() || undefined;

    const url = article.find('a').attr('href');

    const image = article.find('img').attr('src');

    const publicationDateText = article.find('time').text().trim();
    const publicationDate = new Date(publicationDateText);

    if (!title || !url || !image || !publicationDate) {
      return false;
    }

    if (!isValidDate(publicationDate)) {
      return false;
    }

    const fullUrl = `${website.url}${url}`;

    if (!isValidUrl(fullUrl) || !isValidUrl(image)) {
      return false;
    }
    
    articles.push({
      title,
      description,
      url: fullUrl,
      image,
      publicationDate,
      website
    })
  });

  return articles;
}