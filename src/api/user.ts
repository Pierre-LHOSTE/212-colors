"use server";
import prisma from "@/src/lib/prisma";
import { handleServerError } from "../lib/utils";
import { signOut } from "../lib/auth";
import { AUTH_ROUTES } from "../lib/routes";

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
