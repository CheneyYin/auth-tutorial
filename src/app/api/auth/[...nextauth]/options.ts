import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

import { findCredital, isExistUserByEmail } from "@/data/user";
import { sha256 } from "@/lib/hash";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "J Smith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const isRegisted = await isExistUserByEmail(
          credentials?.email as string,
        );
        if (!isRegisted) {
          return null;
        }

        const user = await findCredital(
          credentials?.email as string,
          sha256(credentials?.password as string),
        );
        console.log(user);
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout", // (used for check email message)
  // }
};
