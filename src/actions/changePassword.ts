"use server";

import { getUserByEmail } from "@/src/api/user";
import prisma from "@/src/lib/prisma";
import { compareSync, hash } from "bcryptjs";
import type { z } from "zod";
import { ChangePasswordSchema } from "../components/profilePwd/ChangePasswordSchema";
import { auth } from "../lib/auth";

export const changePassword = async (
  values: z.infer<typeof ChangePasswordSchema>,
) => {
  const session = await auth();
  const validatedFields = ChangePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: true, message: "Invalid fields" };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  const email = session?.user?.email;

  if (!email) {
    return { error: true, message: "User not found" };
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: true, message: "User not found" };
  }

  if (!user.password) {
    return { error: true, message: "User has no password" };
  }

  const isPasswordValid = compareSync(currentPassword, user.password);

  if (!isPasswordValid) {
    return { error: true, message: "Invalid old password" };
  }

  const hashedNewPassword = await hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedNewPassword },
  });

  return { success: true, message: "Password changed successfully" };
};
