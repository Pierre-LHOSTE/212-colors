"use server";
import prisma from "@/src/lib/prisma";
import { revalidateTag } from "next/cache";
import { auth } from "../lib/auth";
import { handleServerError } from "../lib/utils";
import type { ColorType, ThemeColorType } from "../types/color";
import type { ProjectButtonType } from "../types/project";
import type { ThemeColumnType } from "../types/theme";

export async function createColor({
  color,
  projectId,
}: {
  color: ColorType;
  projectId: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: true, message: "User not found" };
  }
  try {
    const { name, description, type } = color;
    const maxPosition = await prisma.color.findFirst({
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
    const res = await prisma.color.create({
      data: {
        name,
        description,
        color: color.color,
        type,
        position: maxPosition ? maxPosition.position + 1 : 0,
        ownerId: session.user.id,
        projectId,
      },
    });
    revalidateTag("prisma-color");
    return res;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function getAllColors() {
  try {
    const colors = await prisma.color.findMany({
      include: {
        project: {
          select: {
            name: true,
            id: true,
          },
        },
        owner: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      orderBy: {
        position: "asc",
      },
    });
    revalidateTag("prisma-color");
    return colors as ColorType[];
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function getColors(projectId: string) {
  try {
    const colors = await prisma.color.findMany({
      where: {
        projectId,
      },
      select: {
        id: true,
        color: true,
        name: true,
        description: true,
        type: true,
        position: true,
      },
      orderBy: {
        position: "asc",
      },
    });
    revalidateTag("prisma-color");
    return colors as ColorType[];
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function reOrder(
  newArray: ColorType[] | ThemeColumnType[] | ProjectButtonType[],
  dataType: "color" | "themeColumn" | "project" | "theme"
) {
  try {
    const promises = newArray.map((item, index) => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return (prisma[dataType] as any).update({
        where: {
          id: item.id,
        },
        data: {
          position: index,
          updatedAt: new Date(),
        },
      });
    });
    await Promise.all(promises);
    revalidateTag("prisma-${dataType}");
    return { success: true };
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function deleteColor(id: string) {
  try {
    await prisma.color.delete({
      where: {
        id,
      },
    });
    revalidateTag("prisma-color");
    return { success: true };
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function createThemeColor({
  color,
  projectId,
}: {
  color: ThemeColorType;
  projectId: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: true, message: "User not found" };
  }
  try {
    const { name, description, themeId, themeColumnId } = color;
    const res = await prisma.themeColor.create({
      data: {
        name,
        description,
        color: color.color,
        ownerId: session.user.id,
        projectId,
        themeId,
        themeColumnId,
      },
    });
    revalidateTag("prisma-themeColor");
    return res;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function deleteThemeColor(id: string) {
  try {
    await prisma.themeColor.delete({
      where: {
        id,
      },
    });
    revalidateTag("prisma-themeColor");
    return { success: true };
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function updateColorHex({
  id,
  color,
  isThemeColor,
}: {
  id: string;
  color: string;
  isThemeColor?: boolean;
}) {
  try {
    if (isThemeColor) {
      await prisma.themeColor.update({
        where: {
          id,
        },
        data: {
          color,
          updatedAt: new Date(),
        },
      });
      revalidateTag("prisma-themeColor");
    } else {
      await prisma.color.update({
        where: {
          id,
        },
        data: {
          color,
          updatedAt: new Date(),
        },
      });
    }
    revalidateTag("prisma-color");
    return { success: true };
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function updateColor({
  color,
  isThemeColor,
}: {
  color: ColorType | ThemeColorType;
  isThemeColor?: boolean;
}) {
  try {
    if (isThemeColor) {
      const res = await prisma.themeColor.update({
        where: {
          id: color.id,
        },
        data: {
          name: color.name,
          description: color.description,
          color: color.color,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          name: true,
          description: true,
          color: true,
        },
      });
      revalidateTag("prisma-themeColor");
      return res;
    }
    const res = await prisma.color.update({
      where: {
        id: color.id,
      },
      data: {
        name: color.name,
        description: color.description,
        color: color.color,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        description: true,
        color: true,
      },
    });
    revalidateTag("prisma-color");
    return res;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
