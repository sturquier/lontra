import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { URL, URLSearchParams } from 'url';

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  const searchParams: URLSearchParams = new URL(request.url).searchParams;
  const { search, websiteIds, date, favorite, page, itemsPerPage } : { search?: string; websiteIds?: string, date?: string, favorite?: string, page?: string, itemsPerPage?: string } = Object.fromEntries(searchParams);
  const userId = token.id as number;

  try {
    const whereClauses: string[] = [];
    const queryParams: (string | number | number[])[] = [];

    const limit = parseInt(itemsPerPage);
    const offset = (parseInt(page) - 1) * limit;

    // 1. Search & filters
    if (search) {
      whereClauses.push(`LOWER(articles.title) LIKE '%' || LOWER($${queryParams.length + 1}) || '%'`);
      queryParams.push(search);
    }

    if (websiteIds) {
      const websitesIds: number[] = websiteIds.split(',').map(Number);
      whereClauses.push(`articles.website_id = ANY($${queryParams.length + 1}::int[])`);
      queryParams.push(websitesIds);
    }

    if (date) {
      whereClauses.push(`DATE(articles.publication_date) = $${queryParams.length + 1}`);
      queryParams.push(date);
    }

    let favoriteJoin = `
      LEFT JOIN
        users_favorite_articles
      ON
        users_favorite_articles.article_id = articles.id
      AND
        users_favorite_articles.user_id = $${queryParams.length + 1}
    `;
    queryParams.push(userId);

    if (favorite) {
      whereClauses.push(`users_favorite_articles.article_id IS NOT NULL`);
    }

    const whereClause = whereClauses.length ? ` WHERE ` + whereClauses.join(' AND ') : '';

    // 2. Total items query
    const countQuery = `
      SELECT
        COUNT(articles.id)
      FROM
        articles
      LEFT JOIN
        websites
      ON
        articles.website_id = websites.id
      ${favoriteJoin}
      ${whereClause}
    `;

    const { rows: totalItemsQuery } = await sql.query(countQuery, queryParams);
    const totalItems = parseInt(totalItemsQuery[0].count)

    // 3. Articles query
    const mainQuery = `
      SELECT 
        articles.id, articles.title, articles.description, articles.url, articles.image, articles.publication_date,
        json_build_object('id', websites.id, 'name', websites.name, 'url', websites.url) as website,
      CASE WHEN
        users_favorite_articles.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS is_favorite
      FROM 
        articles
      LEFT JOIN 
        websites
      ON 
        articles.website_id = websites.id
      ${favoriteJoin}
      ${whereClause}
      ORDER BY
        articles.publication_date DESC
      LIMIT
        $${queryParams.length + 1}
      OFFSET
        $${queryParams.length + 2}
    `;
    queryParams.push(limit, offset);

    const { rows } = await sql.query(mainQuery, queryParams)

    return NextResponse.json({ articles: rows, totalItems });
  } catch (_) {
    console.log(_)
    return NextResponse.json({ error: 'An error occurred while fetching articles' }, { status: 500 });
  }
}