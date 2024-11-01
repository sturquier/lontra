import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  const userId = token.id as number;

  try {
    const { rows } = await sql`
      SELECT 
        categories.*
      FROM 
        categories
      WHERE
        user_id=${userId}
      ORDER BY
        categories.name ASC
    `;

    return NextResponse.json(rows);
  } catch (_) {
    return NextResponse.json({ error: 'An error occurred while fetching categories' }, { status: 500 });
  }
}