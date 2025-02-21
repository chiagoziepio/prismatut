import GitHub from "next-auth/providers/github";

import { db } from "@/lib/db/db";
import { schema } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    GitHub,

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
} satisfies NextAuthConfig;
