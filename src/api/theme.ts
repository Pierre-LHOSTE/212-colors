"use server";
import prisma from "@/src/lib/prisma";
import { auth } from "../lib/auth";
import { handleServerError } from "../lib/utils";
import type {
  ThemeColumnType,
  ThemeType,
  ThemeWithColorsType,
} from "../types/theme";

export async function createTheme({
  theme,
  projectId,
}: {
  theme: ThemeType;
  projectId: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: true, message: "User not found" };
  }
  try {
    const { name, description, type } = theme;
    const maxPosition = await prisma.theme.findFirst({
      where: {
        type,
      },
      select: {
        position: true,
      },
      orderBy: {
        position: "desc",
      },
    });
    const res = await prisma.theme.create({
      data: {
        name,
        description,
        type,
        position: maxPosition ? maxPosition.position + 1 : 0,
        ownerId: session.user.id,
        projectId,
      },
    });
    return res;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function getThemes(projectId: string) {
  try {
    const themes = await prisma.theme.findMany({
      where: {
        projectId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        position: true,
        type: true,
      },
      orderBy: {
        position: "asc",
      },
    });
    return themes as ThemeType[];
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function getThemesWithColors(projectId: string) {
  try {
    const themes = await prisma.theme.findMany({
      where: {
        projectId,
      },
      select: {
        name: true,
        description: true,
        type: true,
        colors: {
          select: {
            name: true,
            description: true,
            color: true,
            themeColumn: {
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
      },
      orderBy: {
        position: "asc",
      },
    });
    return themes as ThemeWithColorsType[];
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function createThemeColumn({
  themeColumn,
  projectId,
}: {
  themeColumn: ThemeColumnType;
  projectId: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: true, message: "User not found" };
  }
  try {
    const { name, description, type } = themeColumn;
    const maxPosition = await prisma.themeColumn.findFirst({
      select: {
        position: true,
      },
      orderBy: {
        position: "desc",
      },
    });
    const position = maxPosition ? maxPosition.position + 1 : 0;
    const res = await prisma.themeColumn.create({
      data: {
        name,
        description,
        position,
        ownerId: session.user.id,
        projectId,
        type,
      },
    });
    return res;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function getThemeColumns(projectId: string) {
  try {
    const themeColumns = await prisma.themeColumn.findMany({
      where: {
        projectId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        position: true,
      },
      orderBy: {
        position: "asc",
      },
    });
    return themeColumns as ThemeColumnType[];
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function getThemeColors(projectId: string) {
  try {
    const themeColors = await prisma.themeColor.findMany({
      where: {
        projectId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        color: true,
        themeId: true,
        themeColumnId: true,
      },
    });
    return themeColors;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
export async function deleteThemeColumn(id: string) {
  try {
    await prisma.themeColumn.delete({
      where: {
        id,
      },
    });
    return { success: true };
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
export async function updateThemeColumn(themeColumn: ThemeColumnType) {
  try {
    const { id, name, description, type } = themeColumn;
    const res = await prisma.themeColumn.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        type,
        updatedAt: new Date(),
      },
    });
    return res;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
export async function updateTheme(theme: ThemeType) {
  try {
    const { id, name, description, type } = theme;
    const res = await prisma.theme.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        type,
        updatedAt: new Date(),
      },
    });
    return res;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
export async function deleteTheme(id: string) {
  try {
    await prisma.theme.delete({
      where: {
        id,
      },
    });
    return { success: true };
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
