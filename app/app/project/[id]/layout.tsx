"use client";
import { fetchAllData } from "@/src/api/all";
import Header from "@/src/components/header/Header";
import CreateThemeColumnModal from "@/src/components/modal/CreateThemeColumnModal/CreateThemeColumnModal";
import CreateColorModal from "@/src/components/modal/createColor/CreateColorModal";
import CreateThemeModal from "@/src/components/modal/createTheme/CreateThemeModal";
import CreateThemeColorModal from "@/src/components/modal/createThemeColor/CreateThemeColorModal";
import NavProjectAside from "@/src/components/navAside/NavProjectAside";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useEffect, useTransition } from "react";

export default function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const setProject = useDataStore((state) => state.setProject);
  const setColors = useDataStore((state) => state.setColors);
  const setThemeColors = useDataStore((state) => state.setThemeColors);
  const setThemeColumns = useDataStore((state) => state.setThemeColumns);
  const setThemes = useDataStore((state) => state.setThemes);
  const [isPending, startTransition] = useTransition();
  const setLoading = useDataStore((state) => state.setLoading);

  useEffect(() => {
    async function fetchProjects() {
      const project = await fetchAllData(params.id);
      if (!project) {
        return handleError({
          error: true,
          message: "Project not found",
        });
      }
      if ("error" in project) {
        return handleError(project, "Failed to fetch project");
      }
      setProject(project.project);
      setColors(project.colors);
      setThemes(project.themes);
      setThemeColors(project.themeColors);
      setThemeColumns(project.themeColumns);
    }
    startTransition(() => fetchProjects());
  }, [params.id, setProject]);

  useEffect(() => {
    setLoading(isPending);
  }, [isPending]);

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
