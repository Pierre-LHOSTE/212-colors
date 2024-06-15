import { z } from "zod";

const MIN_LENGTH = 3;

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(3),
    newPassword: z.string().min(3),
    confirmNewPassword: z.string().min(3),
  })
  .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
