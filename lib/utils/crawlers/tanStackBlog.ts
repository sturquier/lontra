import * as cheerio from 'cheerio';

import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';
import { isValidDate } from '@utils/date';
import { isValidUrl } from '@utils/url';

export const crawlTanStackBlog = async (website: IWebsite): Promise<CreateArticlePayload[]> => {
  const articles: CreateArticlePayload[] = [];

  const response = await fetch(website.url);
  const body = await response.text();

  const html = cheerio.load(body);

  html('a.flex-col').each((_, element) => {
    const article = html(element);

    const title = article.find('.text-lg').text().trim();

    const description = article.find('.text-sm').first().text().trim() || undefined;

    const url = article.attr('href');

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
    const fullImage = `${website.url}${image}`;

    if (!isValidUrl(fullUrl) || !isValidUrl(fullImage)) {
      return false;
    }
    
    articles.push({
      title,
      description,
      url: fullUrl,
      image: fullImage,
      publicationDate,
      website
    })
  });

  return articles;
}