"use server";
import prisma from "@/src/lib/prisma";
import { revalidateTag } from "next/cache";
import { auth } from "../lib/auth";
import { handleServerError } from "../lib/utils";
import type { ProjectType } from "../types/project";

export async function createProject({ name }: { name: string }) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: true, message: "User not found" };
  }
  try {
    const maxPosition = await prisma.project.findFirst({
      select: {
        position: true,
      },
      orderBy: {
        position: "desc",
      },
    });
    const res = await prisma.project.create({
      data: {
        name,
        position: maxPosition ? maxPosition.position + 1 : 0,
        ownerId: session.user.id,
      },
    });
    revalidateTag("prisma-project");
    return res;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function getProjectById(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        position: true,
        hiddenSections: true,
        createdAt: true,
        updatedAt: true,
        ownerId: true,
      },
    });
    return project;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function getProjectList() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: true, message: "User not found" };
  }
  try {
    const project = await prisma.project.findMany({
      where: {
        ownerId: session.user.id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        colors: {
          where: { type: "primary" },
          orderBy: {
            position: "asc",
          },
          take: 1,
          select: { color: true },
        },
        position: true,
      },
      orderBy: {
        position: "asc",
      },
    });
    return project;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function updateProject(project: ProjectType) {
  try {
    const res = await prisma.project.update({
      where: { id: project.id },
      data: {
        name: project.name,
        description: project.description,
        updatedAt: new Date(),
      },
    });
    revalidateTag("prisma-project");
    return res;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function updateSection({
  id,
  sections,
}: {
  id: string;
  sections: string[];
}) {
  try {
    const res = await prisma.project.update({
      where: { id },
      data: {
        hiddenSections: {
          set: sections,
        },
        updatedAt: new Date(),
      },
    });
    revalidateTag("prisma-project");
    return res;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function deleteProject(id: string) {
  try {
    const res = await prisma.project.delete({
      where: { id },
    });
    revalidateTag("prisma-project");
    return res;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

export async function getHiddenSections(id: string) {
  try {
    const project = (await prisma.project.findUnique({
      where: { id },
      select: {
        hiddenSections: true,
      },
    })) || { hiddenSections: [] };
    return project.hiddenSections;
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
