import NextAuth, { type NextAuthOptions } from "next-auth";
import { prisma } from "../../../../lib/prisma";
import { compare } from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "test@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        const userData = {
          id: user.id + "",
          email: user.email,
          name: user.username,
          firstName: user.firstName,
        };

        return userData;
      },
    }),
  ],
  // First JWT Callback is called, passes through the token. Session callback is called when you have to get the token
  // return through authorize, pass through jwt, use it in session
  callbacks: {
    async session({ session, token, user }) {
      console.log("SESSION CALLBACK", { session, token, user });
      return session;
    },
    // user only passed in the first time they log in
    jwt: ({ token, user }) => {
      console.log("JWT Callback", { token, user });

      if (user) {
        const u = user as unknown as User;
        return {
          ...token,
          id: u.id,
          email: u.email,
          name: u.username,
          firstName: u.firstName,
        };
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
