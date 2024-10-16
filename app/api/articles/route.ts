import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT 
        articles.*,
        json_build_object('id', websites.id, 'name', websites.name, 'url', websites.url) as website
      FROM 
        articles
      JOIN 
        websites 
      ON 
        articles.website_id = websites.id
      ORDER BY 
        articles.publication_date DESC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching articles' }, { status: 500 });
  }
}