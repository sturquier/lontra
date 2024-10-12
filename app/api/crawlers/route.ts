import { NextRequest, NextResponse } from 'next/server';

import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';
import { crawlAngularBlog } from '@utils/crawlers/angularBlog';
import { crawlOctoTalks } from '@utils/crawlers/octoTalks';

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const { website } : { website: IWebsite } = payload;
  const { name, slug } = website;

  let articles: CreateArticlePayload[] = [];

  try {
    switch (slug) {
      case 'angular-blog':
        articles = await crawlAngularBlog(website);
        break;
      case 'octo-talks':
        articles = await crawlOctoTalks(website);
        break;
      default:
        return NextResponse.json({ error: `Crawler could not be find for website "${name}"` }, { status: 400 });
    }

    if (articles.length) {
      return NextResponse.json({ message: `Website "${name}" has been successfully crawled`, articles });
    }

    return NextResponse.json({ error: `Crawler for website "${name}" contains error` }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: `An error occurred while crawling website "${name}"` }, { status: 500 });
  }
}