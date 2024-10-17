"use client";
import { fetchAllData } from "@/src/api/all";
import Header from "@/src/components/header/Header";
import CreateThemeColumnModal from "@/src/components/modal/CreateThemeColumnModal/CreateThemeColumnModal";
import CreateColorModal from "@/src/components/modal/createColor/CreateColorModal";
import CreateThemeModal from "@/src/components/modal/createTheme/CreateThemeModal";
import CreateThemeColorModal from "@/src/components/modal/createThemeColor/CreateThemeColorModal";
import NavProjectAside from "@/src/components/navAside/NavProjectAside";
import generatePrimaryColor from "@/src/lib/generatePrimaryColor";
import generateTheme from "@/src/lib/generateTheme";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useSettingsStore } from "@/src/store/settings";
import { useThemeStore } from "@/src/store/theme";
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
  const setPrimaryColor = useThemeStore((state) => state.setPrimaryColor);
  const colors = useDataStore((state) => state.colors);
  const themes = useDataStore((state) => state.themes);
  const themeColors = useDataStore((state) => state.themeColors);
  const setBackgroundColor = useThemeStore((state) => state.setBackgroundColor);
  const setContentColor = useThemeStore((state) => state.setContentColor);
  const setHighlightColor = useThemeStore((state) => state.setHighlightColor);
  const localTheme = useSettingsStore((state) => state.localTheme);

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

  useEffect(() => {
    const primaryColor = generatePrimaryColor(colors);
    if (!primaryColor) return;
    setPrimaryColor(primaryColor);
    document.body.style.setProperty("--primary-color", primaryColor);
  }, [colors]);

  useEffect(() => {
    if (!themeColors || !themes) return;
    const selectedTheme = themes.filter((t) => t.type === localTheme)[0];
    if (!selectedTheme) return;
    const selectedColors = themeColors.filter(
      (c) => c.themeId === selectedTheme.id
    );
    if (selectedColors.length <= 0) return;
    const theme = generateTheme(selectedColors, localTheme);
    console.log("🚀 ~ theme:", theme);
    if (theme.background) setBackgroundColor(theme.background);
    if (theme.content) {
      setContentColor(theme.content);
      document.body.style.setProperty("--content-color", theme.content);
    }
    if (theme.highlight) setHighlightColor(theme.highlight);
  }, [themes.length, themeColors.length]);

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
