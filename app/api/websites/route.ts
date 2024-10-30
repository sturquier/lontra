import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

import { authOptions } from '@api/auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
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