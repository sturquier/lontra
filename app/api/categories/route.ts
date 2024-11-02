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
        name ASC
    `;

    return NextResponse.json(rows);
  } catch (_) {
    return NextResponse.json({ error: 'An error occurred while fetching categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  const { name } : { name: string } = await request.json();
  const userId = token.id as number;

  try {
    await sql`
      INSERT INTO
        categories (name, user_id)
      VALUES
        (${name}, ${userId})
    `;

    return NextResponse.json({ message: `Category "${name}" has been successfully created` });
  } catch (_) {
    return NextResponse.json({ error: `An error occurred while creating category "${name}"` }, { status: 500 });
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
        categories
      WHERE
        id = $1
      AND
        user_id = $2
      `,
      [id, userId]
    );

    return NextResponse.json({ message: `Category "${id}" has been successfully deleted` });
  } catch (_) {
    return NextResponse.json({ error: `An error occurred while deleting category "${id}"` }, { status: 500 });
  }
}