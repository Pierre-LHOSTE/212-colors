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
