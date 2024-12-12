import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';
import { crawlAngularBlog } from '@utils/crawlers/angularBlog';
import { crawlCssTricks } from '@utils/crawlers/cssTricks';
import { crawlExpoBlog } from '@utils/crawlers/expoBlog';
import { crawlIonicBlog } from '@utils/crawlers/ionicBlog';
import { crawlItnext } from '@utils/crawlers/itnext';
import { crawlLogRocketBlog } from '@utils/crawlers/logRocketBlog';
import { crawlNextjsBlog } from '@utils/crawlers/nextjsBlog';
import { crawlPrismaBlog } from '@utils/crawlers/prismaBlog';
import { crawlReactBlog } from '@utils/crawlers/reactBlog';
import { crawlReactNativeBlog } from '@utils/crawlers/reactNativeBlog';
import { crawlRefineBlog } from '@utils/crawlers/refineBlog';
import { crawlRobinWieruchBlog } from '@utils/crawlers/robinWieruchBlog';
import { crawlSymfonyBlog } from '@utils/crawlers/symfonyBlog';
import { crawlTowardsDataScience } from '@utils/crawlers/towardsDataScience';
import { crawlVuejsBlog } from '@utils/crawlers/vuejsBlog';

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  const { website } : { website: IWebsite } = await request.json();
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
      case 'expo-blog':
        articles = await crawlExpoBlog(website);
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
      case 'prisma-blog':
        articles = await crawlPrismaBlog(website);
        break;
      case 'react-blog':
        articles = await crawlReactBlog(website);
        break;
      case 'react-native-blog':
        articles = await crawlReactNativeBlog(website);
        break;
      case 'refine-blog':
        articles = await crawlRefineBlog(website);
        break;
      case 'robin-wieruch-blog':
        articles = await crawlRobinWieruchBlog(website);
        break;
      case 'symfony-blog':
        articles = await crawlSymfonyBlog(website);
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