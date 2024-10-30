import NextAuth, { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from '@vercel/postgres';
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        const { rows } = await sql`
          SELECT
            *
          FROM
            users
          WHERE
            email=${credentials?.email}
        `;

        const user = rows[0];

        if (!user) return null;

        const isPasswordCorrect = await compare(credentials?.password || '', user.password);

        if (!isPasswordCorrect) return null;

        return {
          id: user.id,
          email: user.email
        }
      },
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
    signOut: '/logout'
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user: User }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    }
  }
};

const handler = NextAuth(authOptions);

export { 
  handler as GET,
  handler as POST
};