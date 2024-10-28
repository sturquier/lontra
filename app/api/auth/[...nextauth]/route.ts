import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from '@vercel/postgres';
import { compare } from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
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
  }
});

export { 
  handler as GET,
  handler as POST
};