import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

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
  } catch (_) {
    return NextResponse.json({ error: 'An error occurred while fetching websites' }, { status: 500 });
  }
}