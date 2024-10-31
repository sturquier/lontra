import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  const payload = await request.json();
  const { articleId } = payload;
  const userId = token.id as number;

  try {
    const { rows } = await sql.query(`
      SELECT
        *
      FROM
        users_favorite_articles
      WHERE
        user_id = $1
      AND
        article_id = $2
      `,
      [userId, articleId]
    );

    if (rows.length) {
      await sql.query(`
        DELETE FROM
          users_favorite_articles
        WHERE
          user_id = $1
        AND
          article_id = $2
        `,
        [userId, articleId]
      );
    } else {
      await sql.query(`
        INSERT INTO
          users_favorite_articles (user_id, article_id)
        VALUES
          ($1, $2)
        `,
        [userId, articleId]
      );
    }

    return NextResponse.json({ message: `Article "${articleId}" favorite has been successfully toggled` });
  } catch (_) {
    return NextResponse.json({ error: `An error occurred while toggling article "${articleId}" favorite` }, { status: 500 });
  }
}
