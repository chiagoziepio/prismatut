import { db } from "@/lib/db/db";
import { schema } from "@/lib/db/schema";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getUserById } from "@/lib/utils";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60,
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
        //console.log("Credentials received:", credentials);

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
  pages: {
    signIn: "/login",
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        const existingUser = await getUserById(user.id!);
        // prevent sign in without email verified
        if (!existingUser || !existingUser?.emailVerified) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        // Determine if the sign-in was via OAuth
        token.isOauth = account.provider !== "credentials";
      }

      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.isOauth = token.isOauth ?? false;
        session.user.id = token.sub ?? "";
      }
      return session;
    },
  },
});
