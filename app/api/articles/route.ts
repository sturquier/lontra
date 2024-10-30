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
  const { search, websiteIds, date, page, itemsPerPage } : { search?: string; websiteIds?: string, date?: string, page?: string, itemsPerPage?: string } = Object.fromEntries(searchParams);

  try {
    const whereClauses: string[] = [];
    const queryParams: (string | number | number[])[] = [];

    const limit = parseInt(itemsPerPage);
    const offset = (parseInt(page) - 1) * limit;

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

    const whereClause = whereClauses.length ? ` WHERE ` + whereClauses.join(' AND ') : '';

    const countQuery = `
      SELECT
        COUNT(articles.id)
      FROM
        articles
      JOIN
        websites
      ON
        articles.website_id = websites.id
      ${whereClause}
    `;

    const { rows: totalItemsQuery } = await sql.query(countQuery, queryParams);
    const totalItems = parseInt(totalItemsQuery[0].count)

    const mainQuery = `
      SELECT 
        articles.id, articles.title, articles.description, articles.url, articles.image, articles.publication_date,
        json_build_object('id', websites.id, 'name', websites.name, 'url', websites.url) as website
      FROM 
        articles
      LEFT JOIN 
        websites
      ON 
        articles.website_id = websites.id
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
    return NextResponse.json({ error: 'An error occurred while fetching articles' }, { status: 500 });
  }
}