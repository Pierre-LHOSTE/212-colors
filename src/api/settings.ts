"use server";
import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";
import { handleServerError } from "../lib/utils";
import type { ThemeType } from "../types/settings";

export async function updateSettings(settings: {
  theme?: ThemeType;
  dynamicTheme?: boolean;
  language?: string;
}) {
  const session = await auth();
  try {
    if (!session?.user?.id) {
      return { error: true, message: "User not found" };
    }
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        settings: true,
      },
    });
    if (!user || !user.settings) {
      return { error: true, message: "Settings not found" };
    }
    const res = await prisma.settings.update({
      where: {
        id: user.settings.id,
      },
      data: {
        ...settings,
      },
    });
    return res;
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getSettings() {
  const session = await auth();
  try {
    if (!session?.user?.id) {
      return { error: true, message: "User not found" };
    }
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        settings: true,
      },
    });
    if (!user || !user.settings) {
      const res = await prisma.settings.create({
        data: {
          theme: "auto" as ThemeType,
          userId: session.user.id,
          dynamicTheme: false,
          language: "en",
        },
      });
      return {
        ...res,
        theme: res.theme as ThemeType,
      };
    }
    return {
      ...user.settings,
      theme: user.settings.theme as ThemeType,
    };
  } catch (error) {
    return handleServerError(error);
  }
}
