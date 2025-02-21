import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  isOauth: boolean;
};

declare module "next-auth" {
  interface session {
    user: ExtendedUser;
  }
}
