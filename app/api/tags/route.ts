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
        tags.id, tags.label
      FROM 
        tags
      WHERE
        user_id=${userId}
      ORDER BY
        label ASC
    `;

    return NextResponse.json(rows);
  } catch (_) {
    return NextResponse.json({ error: 'An error occurred while fetching tags' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  const { label } : { label: string } = await request.json();
  const userId = token.id as number;

  try {
    await sql`
      INSERT INTO
        tags (label, user_id)
      VALUES
        (${label}, ${userId})
    `;

    return NextResponse.json({ message: `Tag "${label}" has been successfully created` });
  } catch (_) {
    return NextResponse.json({ error: `An error occurred while creating tag "${label}"` }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  const { id } : { id: string } = await request.json();
  const userId = token.id as number;

  try {
    await sql.query(`
      DELETE FROM
        tags
      WHERE
        id = $1
      AND
        user_id = $2
      `,
      [id, userId]
    );

    return NextResponse.json({ message: `Tag "${id}" has been successfully deleted` });
  } catch (_) {
    return NextResponse.json({ error: `An error occurred while deleting tag "${id}"` }, { status: 500 });
  }
}