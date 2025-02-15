import { db } from "@/lib/db/db";
import { schema } from "@/lib/db/schema";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { encode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";

const adapter = PrismaAdapter(db);

export const { auth, handlers, signIn, signOut } = NextAuth({
  //adapter,
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
            password: validateCredential.password,
          },
        });

        //console.log("User:", user);

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  //adapter: PrismaAdapter(db),
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.crdentials = true;
      }
      return token;
    },
  },

  //   jwt: {
  //     encode: async function (params) {
  //       if (params.token?.credentials) {
  //         const sessionToken = uuid();
  //         if (!params.token.sub) {
  //           throw new Error("No sub");
  //         }
  //         const createdSession = await adapter?.createSession?.({
  //           userId: params.token.sub,
  //           expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  //           sessionToken: sessionToken,
  //         });
  //         if (!createdSession) {
  //           throw new Error("No session created");
  //         }
  //         return sessionToken;
  //       }
  //       return encode(params);
  //     },
  //   },
});
