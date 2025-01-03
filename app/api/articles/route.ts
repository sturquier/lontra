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
  const { search, websiteIds, tagIds, date, favorite, page, itemsPerPage } : { search?: string; websiteIds?: string, tagIds?: string, date?: string, favorite?: string, page?: string, itemsPerPage?: string } = Object.fromEntries(searchParams);
  const userId = token.id as number;

  try {
    const whereClauses: string[] = [];
    const queryParams: (string | number | number[])[] = [];

    const limit = itemsPerPage !== '-1' ? parseInt(itemsPerPage) : null;
    const offset = itemsPerPage !== '-1' ? (parseInt(page) - 1) * limit! : null;

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

    if (tagIds) {
      const tagsIds: number[] = tagIds.split(',').map(Number);
      whereClauses.push(`articles.id IN (
        SELECT article_id
        FROM articles_tags 
        WHERE tag_id = ANY($${queryParams.length + 1}::int[])
      )`);
      queryParams.push(tagsIds);
    }

    if (date) {
      whereClauses.push(`DATE(articles.publication_date) = $${queryParams.length + 1}`);
      queryParams.push(date);
    }

    const favoriteJoin = `
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
        json_build_object('id', websites.id, 'name', websites.name, 'url', websites.url) AS website,
      CASE WHEN
        users_favorite_articles.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS is_favorite,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object('id', tags.id, 'label', tags.label)
        ) FILTER (WHERE tags.id IS NOT NULL),
        '[]'
      ) AS tags
      FROM 
        articles
      LEFT JOIN 
        websites
      ON 
        articles.website_id = websites.id
      ${favoriteJoin}
      LEFT JOIN 
        articles_tags
      ON
        articles_tags.article_id = articles.id
      LEFT JOIN 
        tags
      ON
        articles_tags.tag_id = tags.id AND tags.user_id = $${queryParams.length + 1}
      ${whereClause}
      GROUP BY
        articles.id, websites.id, users_favorite_articles.article_id
      ORDER BY
        articles.publication_date DESC
      ${limit !== null ? `LIMIT $${queryParams.length + 2}` : ''}
      ${offset !== null ? `OFFSET $${queryParams.length + 3}` : ''}
    `;

    queryParams.push(userId);

    if (limit !== null) queryParams.push(limit);
    if (offset !== null) queryParams.push(offset);

    const { rows } = await sql.query(mainQuery, queryParams)

    return NextResponse.json({ articles: rows, totalItems });
  } catch (_) {
    return NextResponse.json({ error: 'An error occurred while fetching articles' }, { status: 500 });
  }
}