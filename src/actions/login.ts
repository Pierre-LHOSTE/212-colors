"use server";

import { signIn } from "@/src/lib/auth";
import { LoginSchema } from "@/src/schemas/LoginSchema";
import { AuthError } from "next-auth";
import { z } from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "../lib/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      redirect: true,
    });
  } catch (error) {
    console.log("🚀 ~ error!:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          };

        default:
          return {
            error: "An error occurred",
          };
      }
    }
    throw error;
  }
};
