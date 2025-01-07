import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  const { articleId, tagIds }: { articleId: number; tagIds: number[] } = await request.json();

  try {
    const values = tagIds.map((tagId) => `(${articleId}, ${tagId})`).join(', ');

    const query = `
      INSERT INTO
        articles_tags (article_id, tag_id)
      VALUES
        ${values}
      ON CONFLICT
      DO NOTHING
    `;

    await sql.query(query);

    return NextResponse.json({ message: `Tags have been successfully linked to article "${articleId}"` });
  } catch (_) {
    return NextResponse.json({ error: `An error occurred while linking tags to article "${articleId}"` }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  const { articleId, tagId }: { articleId: number, tagId: number } = await request.json();
  const userId = token.id as number;

  try {
    await sql.query(`
      DELETE FROM
        articles_tags
      USING
        tags
      WHERE 
        articles_tags.article_id = $1
      AND
        articles_tags.tag_id = $2
      AND
        tags.id = articles_tags.tag_id
      AND
        tags.user_id = $3
      `,
      [articleId, tagId, userId]
    );

    return NextResponse.json({ message: `Tag "${tagId}" has been successfully unlinked from article "${articleId}"` });
  } catch (_) {
    return NextResponse.json({ error: `An error occurred while unlinking tag "${tagId}" from article "${articleId}"` }, { status: 500 });
  }
}
