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
        users.id, users.email
      FROM
        users
      WHERE
        id=${userId}
    `;

    if (!rows.length) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (_) {
    return NextResponse.json({ error: 'An error occurred while fetching profile' }, { status: 500 });
  }
}