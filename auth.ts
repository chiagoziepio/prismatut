import { db } from "@/lib/db/db";
import { schema } from "@/lib/db/schema";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("Credentials received:", credentials);

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const validateCredential = schema.parse(credentials);

        const user = await db.user.findFirst({
          where: {
            email: validateCredential.email,
          },
        });

        //console.log("User:", user);

        if (!user || !user.password || !user.email) {
          return null;
        }

        const checkPwd = await bcrypt.compare(
          validateCredential.password,
          user.password
        );
        if (!checkPwd) {
          return null;
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.crdentials = true;
      }
      return token;
    },
  },
});
