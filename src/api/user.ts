"use server";
import prisma from "@/src/lib/prisma";
import { handleServerError } from "../lib/utils";
import { UserType } from "../types/user";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        premium: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
}

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

export async function updateUser(user: UserType) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        premium: user.premium,
      },
    });
    return updatedUser;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.project.deleteMany({
      where: { ownerId: id },
    });
    await prisma.settings.delete({
      where: { userId: id },
    });
    await prisma.user.delete({
      where: { id },
    });
    return { success: true };
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function createUser(user: UserType) {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        premium: user.premium,
      },
    });
    return newUser;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
