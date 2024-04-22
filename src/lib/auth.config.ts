import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { getUserByEmail } from "../api/user";
import { LoginSchema } from "../schemas/LoginSchema";

export default {
  providers: [
    Github,
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;
        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;
        const matchedPassword = await compare(password, user.password);
        if (!matchedPassword) return null;
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
