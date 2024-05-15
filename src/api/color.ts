"use server";
import prisma from "@/src/lib/prisma";
import { auth } from "../lib/auth";
import { ColorType } from "../types/color";

export async function createColor({
  color,
  ownerId,
  projectId,
}: {
  color: ColorType;
  ownerId: string;
  projectId: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: true, message: "User not found" };
  }
  try {
    const { name, description, type } = color;
    console.log({
      color,
      ownerId,
      projectId,
    });

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
    return res;
  } catch (error: any) {
    console.log(error);
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
    return colors as ColorType[];
  } catch (error: any) {
    console.error(error);
    return { error: true, message: error.message };
  }
}
