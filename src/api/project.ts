"use server";

import prisma from "@/src/lib/prisma";

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

export async function getProjectList() {
  try {
    const project = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    return project;
  } catch (error) {
    console.error(error);
    return null;
  }
}
