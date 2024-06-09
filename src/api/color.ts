"use server";
import prisma from "@/src/lib/prisma";
import { revalidateTag } from "next/cache";
import { auth } from "../lib/auth";
import { ColorType, ThemeColorType } from "../types/color";
import { ThemeColumnType } from "../types/theme";

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
    let maxPosition = await prisma.color.findFirst({
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
  } catch (error: any) {
    console.error(error);
    return { error: true, message: error.message };
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
  } catch (error: any) {
    console.error(error);
    return { error: true, message: error.message };
  }
}

export async function reOrder(
  newArray: ColorType[] | ThemeColumnType[],
  dataType: "color" | "themeColumn"
) {
  try {
    console.log(`Reordering ${dataType}s`);

    const promises = newArray.map((item, index) => {
      return (prisma[dataType] as any).update({
        where: {
          id: item.id,
        },
        data: {
          position: index,
        },
      });
    });
    await Promise.all(promises);
    revalidateTag("prisma-${dataType}");
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { error: true, message: error.message };
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
  } catch (error: any) {
    console.error(error);
    return { error: true, message: error.message };
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
  } catch (error: any) {
    console.error(error);
    return { error: true, message: error.message };
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
  } catch (error: any) {
    console.error(error);
    return { error: true, message: error.message };
  }
}
