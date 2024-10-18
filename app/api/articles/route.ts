import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { URL, URLSearchParams } from 'url';

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = new URL(request.url).searchParams;
  const { search } : { search?: string; } = Object.fromEntries(searchParams);

  try {
    const whereClauses: string[] = [];
    const queryParams: string[] = [];

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
      whereClauses.push(`LOWER(articles.title) LIKE '%' || LOWER($${whereClauses.length + 1}) || '%'`);
      queryParams.push(search);
    }

    if (whereClauses.length) query += ` WHERE ` + whereClauses.join(' AND ');

    query += `ORDER BY articles.publication_date DESC`;

    const { rows } = await sql.query(query, queryParams)

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching articles' }, { status: 500 });
  }
}