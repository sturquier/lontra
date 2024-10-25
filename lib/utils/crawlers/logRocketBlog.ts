import * as cheerio from 'cheerio';

import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';
import { isValidDate } from '@utils/date';
import { isValidUrl } from '@utils/url';

export const crawlLogRocketBlog = async (website: IWebsite): Promise<CreateArticlePayload[]> => {
  const articles: CreateArticlePayload[] = [];

  const response = await fetch(website.url);
  const body = await response.text();

  const html = cheerio.load(body);

  html('.post-card').each((_, element) => {
    const article = html(element);

    const title = article.find('h4').text().trim();

    const description = article.find('p').text().trim() || undefined;

    const url = article.find('a').attr('href');

    const image = article.find('img').attr('src');

    const authorName = article.find('.post-card-author-name');

    const publicationDateText = authorName.next().text().trim();
    const publicationDateMatch = publicationDateText.match(/^[A-Za-z]{3} \d{1,2}, \d{4}/);

    let publicationDate: Date | null = null;
    if (publicationDateMatch) {
      publicationDate = new Date(publicationDateMatch[0]);
    }

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