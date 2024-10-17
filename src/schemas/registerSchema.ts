import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({
      message: "Email must be a valid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
