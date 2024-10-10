import { NextRequest, NextResponse } from 'next/server';

import { crawlAngularBlog } from '@utils/crawlers/angularBlog';
import { crawlOctoTalks } from '@utils/crawlers/octoTalks';

export async function GET(_: NextRequest, { params }: { params: { slug: string }}) {
  const { slug } = params;
  let isCrawled = false;

  try {
    switch (slug) {
      case 'angular-blog':
        isCrawled = await crawlAngularBlog();
        break;
      case 'octo-talks':
        isCrawled = await crawlOctoTalks();
        break;
      default:
        return NextResponse.json({ error: `Crawler could not be find for website with slug ${slug}` }, { status: 404 });
    }

    if (isCrawled) {
      return NextResponse.json({ message: `Website with slug ${slug} has been successfully crawled` });
    }

    return NextResponse.json({ error: `Crawler for website with slug ${slug} contains error` }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: `An error occurred while crawling website with slug ${slug}` }, { status: 500 });
  }
}