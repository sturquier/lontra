import * as cheerio from 'cheerio';

import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';
import { extractBackgroundImageUrl } from '@utils/crawler';
import { convertDateMissingYear, isValidDate } from '@utils/date';
import { isValidUrl } from '@utils/url';

export const crawlItnext = async (website: IWebsite): Promise<CreateArticlePayload[]> => {
  const articles: CreateArticlePayload[] = [];

  const response = await fetch(website.url);
  const body = await response.text();

  const html = cheerio.load(body);

  html('.postItem').each((_, element) => {
    const article = html(element).parent();

    const title = article.find('h3').text().trim();

    const description = article.find('.u-fontSize18').text().trim() || undefined;

    const url = article.find('a').attr('href');

    const backgroundImageStyle = article.find('a').attr('style');
    const image = extractBackgroundImageUrl(backgroundImageStyle);

    const publicationDateText = article.find('time').text().trim();
    const publicationDate = new Date(convertDateMissingYear(publicationDateText));

    if (!title || !url || !image || !publicationDate) {
      return false;
    }

    if (!isValidDate(publicationDate)) {
      return false;
    }

    if (!isValidUrl(url) || !isValidUrl(image)) {
      return false;
    }
    
    articles.push({
      title,
      description,
      url,
      image,
      publicationDate,
      website
    })
  });

  return articles;
}