import * as cheerio from 'cheerio';

import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';
import { isValidDate } from '@utils/date';
import { isValidUrl } from '@utils/url';

export const crawlOctoTalks = async (website: IWebsite): Promise<CreateArticlePayload[]> => {
  const articles: CreateArticlePayload[] = [];

  const response = await fetch(website.url);
  const body = await response.text();

  const html = cheerio.load(body);

  html('.articleListItem').each((_, element) => {
    const article = html(element);

    const title = article.find('h2').text().trim();

    const description = article.find('p').text().trim() || undefined;

    const url = article.find('a').attr('href');

    const image = article.find('img').attr('src');

    const publicationDateText = article.find('.articleListItem-dateAuthor').text().trim();
    const publicationDateMatch = publicationDateText.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    
    let publicationDate: Date | null = null;
    if (publicationDateMatch) {
      const day = publicationDateMatch[1];
      const month = publicationDateMatch[2];
      const year = publicationDateMatch[3];

      publicationDate = new Date(`${year}-${month}-${day}`);
    }

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