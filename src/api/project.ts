"use server";

import prisma from "@/src/lib/prisma";
import { ProjectButtonType } from "../types/project";

export async function getProjectById(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    return project;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProjectList(): Promise<ProjectButtonType[] | null> {
  try {
    const project = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        colors: {
          where: { type: "primary" },
          take: 1,
          select: { color: true },
        },
        position: true,
      },
    });
    return project;
  } catch (error) {
    console.error(error);
    return null;
  }
}
