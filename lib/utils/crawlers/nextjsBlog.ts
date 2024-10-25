import * as cheerio from 'cheerio';

import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';
import { isValidDate, removeOrdinalSuffix } from '@utils/date';
import { isValidUrl } from '@utils/url';

export const crawlNextjsBlog = async (website: IWebsite): Promise<CreateArticlePayload[]> => {
  const articles: CreateArticlePayload[] = [];

  const response = await fetch(website.url);
  const body = await response.text();

  const html = cheerio.load(body);

  html('article').each((_, element) => {
    const article = html(element);

    const title = article.find('a').first().text().trim();

    const description = article.find('.prose').text().trim() || undefined;

    const url = article.find('a').attr('href');

    const publicationDateText = article.find('p').first().text().trim();
    const publicationDate = new Date(removeOrdinalSuffix(publicationDateText));

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