import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { URL, URLSearchParams } from 'url';

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = new URL(request.url).searchParams;
  const { search, websiteIds, date } : { search?: string; websiteIds?: string, date?: string } = Object.fromEntries(searchParams);

  try {
    const whereClauses: string[] = [];
    const queryParams: (string | number[])[] = [];

    let query = `
      SELECT 
        articles.*,
        json_build_object('id', websites.id, 'name', websites.name, 'url', websites.url) as website
      FROM 
        articles
      JOIN 
        websites
      ON 
        articles.website_id = websites.id
    `;

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

    if (whereClauses.length) query += ` WHERE ` + whereClauses.join(' AND ');

    query += ` ORDER BY articles.publication_date DESC`;

    const { rows } = await sql.query(query, queryParams)

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching articles' }, { status: 500 });
  }
}