import { z } from "zod";

const MIN_LENGTH = 3;

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(3),
    newPassword: z.string().min(3),
    confirmNewPassword: z.string().min(3),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });
