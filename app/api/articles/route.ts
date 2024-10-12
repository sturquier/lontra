import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM articles ORDER BY publication_date DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching articles' }, { status: 500 });
  }
}