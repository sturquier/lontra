import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

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
  } catch (error) {
    return NextResponse.json({ error: `An error occurred while unlinking tag "${tagId}" from article "${articleId}"` }, { status: 500 });
  }
}
