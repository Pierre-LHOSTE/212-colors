"use client";
import { getProjectById } from "@/src/api/project";
import Header from "@/src/components/header/Header";
import CreateThemeColumnModal from "@/src/components/modal/CreateThemeColumnModal/CreateThemeColumnModal";
import CreateColorModal from "@/src/components/modal/createColor/CreateColorModal";
import CreateThemeModal from "@/src/components/modal/createTheme/CreateThemeModal";
import CreateThemeColorModal from "@/src/components/modal/createThemeColor/CreateThemeColorModal";
import NavProjectAside from "@/src/components/navAside/NavProjectAside";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useEffect } from "react";

export default function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const setProject = useDataStore((state) => state.setProject);

  useEffect(() => {
    async function fetchProjects() {
      const project = await getProjectById(params.id);
      if (!project) {
        return handleError({
          error: true,
          message: "Project not found",
        });
      }
      if ("error" in project) {
        return handleError(project, "Failed to fetch project");
      }
      setProject(project);
    }
    fetchProjects();
  }, [params.id, setProject]);

  return (
    <>
      <NavProjectAside />
      <div id="content">
        <Header />
        <main id="main">{children}</main>
        <>
          <CreateColorModal />
          <CreateThemeModal />
          <CreateThemeColumnModal />
          <CreateThemeColorModal />
        </>
      </div>
    </>
  );
}
