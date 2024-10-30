import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

import { authOptions } from '@api/auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  const { user } = session;

  try {
    const { rows } = await sql`
      SELECT
        USERS.id, USERS.email
      FROM
        USERS
      WHERE
        email=${user?.email}
    `;

    if (!rows.length) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching profile' }, { status: 500 });
  }
}