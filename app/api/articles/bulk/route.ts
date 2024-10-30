import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

import { authOptions } from '@api/auth/[...nextauth]/route';
import { CreateArticlePayload } from '@models/article';
import { IWebsite } from '@models/website';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  const { articles, website } : { articles: CreateArticlePayload[], website: IWebsite } = await request.json();
  const { name } = website;

  if (!articles.length) {
    return NextResponse.json({ error: `No articles provided for website "${name}"` }, { status: 400 });
  }

  try {
    const data = articles.map(({ title, description, url, image, publicationDate, website }) => [
      title,
      description,
      url,
      image,
      publicationDate,
      website.id
    ]);

    const columnCount = data[0].length;
    const values = data.flat();

    const placeholders = data
      .map((_, rowIndex) => `(${Array.from({ length: columnCount }, (_, colIndex) => `$${rowIndex * columnCount + colIndex + 1}`).join(', ')})`)
      .join(', ')
    ;

    const query = `
      INSERT INTO
        articles (title, description, url, image, publication_date, website_id)
      VALUES
        ${placeholders}
      ON CONFLICT
        (website_id, title)
      DO NOTHING
    `;

    await sql.query(query, values);

    return NextResponse.json({ message: `${articles.length} articles successfully inserted for website "${name}"` });
  } catch (_) {
    return NextResponse.json({ error: `An error occurred during the bulk insert for website ${name}` }, { status: 500 });
  }
}
