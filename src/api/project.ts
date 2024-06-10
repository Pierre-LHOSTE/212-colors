"use server";
import prisma from "@/src/lib/prisma";
import { revalidateTag } from "next/cache";
import { auth } from "../lib/auth";
import { SectionType } from "../types/section";

export async function createProject({ name }: { name: string }) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: true, message: "User not found" };
  }
  try {
    let maxPosition = await prisma.project.findFirst({
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
        colorSection: true,
        themeSection: true,
      },
    });
    revalidateTag("prisma-project");
    return res;
  } catch (error: any) {
    console.error(error);
    return { error: true, message: error.message };
  }
}

export async function getProjectById(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    return project;
  } catch (error: any) {
    console.error(error);
    return { error: true, message: error.message };
  }
}

export async function getProjectList() {
  try {
    const project = await prisma.project.findMany({
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
  } catch (error: any) {
    console.error(error);
    return { error: true, message: error.message };
  }
}

export async function updateProject(project: any) {
  try {
    const res = await prisma.project.update({
      where: { id: project.id },
      data: {
        name: project.name,
        description: project.description,
      },
    });
    revalidateTag("prisma-project");
    return res;
  } catch (error: any) {
    console.error(error);
    return { error: true, message: error.message };
  }
}

export async function updateSection({
  id,
  section,
}: {
  id: string;
  section: SectionType;
}) {
  try {
    const res = await prisma.project.update({
      where: { id },
      data: {
        [section.name]: section.active,
      },
    });
    revalidateTag("prisma-project");
    return res;
  } catch (error: any) {
    console.error(error);
    return { error: true, message: error.message };
  }
}

export async function deleteProject(id: string) {
  try {
    const res = await prisma.project.delete({
      where: { id },
    });
    revalidateTag("prisma-project");
    return res;
  } catch (error: any) {
    console.error(error);
    return { error: true, message: error.message };
  }
}
