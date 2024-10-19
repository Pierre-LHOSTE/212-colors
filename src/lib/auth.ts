import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { UserType } from "../types/user";
import authConfig from "./auth.config";
import prisma from "./prisma";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as UserType).role || "user";
      }
      return token;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      } as any;
    },
  },
  ...authConfig,
});
