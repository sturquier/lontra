import { NextRequest, NextResponse } from 'next/server';

import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';
import { crawlAngularBlog } from '@utils/crawlers/angularBlog';
import { crawlCssTricks } from '@utils/crawlers/cssTricks';
import { crawlIonicBlog } from '@utils/crawlers/ionicBlog';
import { crawlItnext } from '@utils/crawlers/itnext';
import { crawlLogRocketBlog } from '@utils/crawlers/logRocketBlog';
import { crawlNextjsBlog } from '@utils/crawlers/nextjsBlog';
import { crawlOctoTalks } from '@utils/crawlers/octoTalks';
import { crawlReactBlog } from '@utils/crawlers/reactBlog';
import { crawlTowardsDataScience } from '@utils/crawlers/towardsDataScience';
import { crawlVuejsBlog } from '@utils/crawlers/vuejsBlog';

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
      case 'css-tricks':
        articles = await crawlCssTricks(website);
        break;
      case 'ionic-blog':
        articles = await crawlIonicBlog(website);
        break;
      case 'itnext':
        articles = await crawlItnext(website);
        break;
      case 'logrocket-blog':
        articles = await crawlLogRocketBlog(website);
        break;
      case 'nextjs-blog':
        articles = await crawlNextjsBlog(website);
        break;
      case 'octo-talks':
        articles = await crawlOctoTalks(website);
        break;
      case 'react-blog':
        articles = await crawlReactBlog(website);
        break;
      case 'towards-data-science':
        articles = await crawlTowardsDataScience(website);
        break;
      case 'vuejs-blog':
        articles = await crawlVuejsBlog(website);
        break;
      default:
        return NextResponse.json({ error: `Crawler could not be find for website "${name}"` }, { status: 400 });
    }

    if (articles.length) {
      return NextResponse.json({ message: `Website "${name}" has been successfully crawled`, articles });
    }

    return NextResponse.json({ error: `Crawler for website "${name}" contains error` }, { status: 500 });
  } catch (_) {
    return NextResponse.json({ error: `An error occurred while crawling website "${name}"` }, { status: 500 });
  }
}