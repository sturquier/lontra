import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT
        *
      FROM
        websites
      ORDER BY
        name ASC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching websites' }, { status: 500 });
  }
}