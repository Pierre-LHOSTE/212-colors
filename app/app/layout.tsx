"use client";
import { getProjectList } from "@/src/api/project";
import { getSettings } from "@/src/api/settings";
import MainAside from "@/src/components/mainAside/MainAside";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useSettingsStore } from "@/src/store/settings";
import "overlayscrollbars/overlayscrollbars.css";
import { useEffect } from "react";
import { AntdConfig } from "./AntdConfig";
import BackgroundLayout from "./BackgroundLayout";
import "./layout.scss";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setProjectsList = useDataStore((state) => state.setProjectsList);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const setLanguage = useSettingsStore((state) => state.setLanguage);

  useEffect(() => {
    async function fetchProjects() {
      const projects = await getProjectList();
      if ("error" in projects) {
        return handleError(projects, "Failed to fetch projects");
      }
      setProjectsList(projects);
    }

    async function fetchSettings() {
      const settings = await getSettings();
      if ("error" in settings) {
        return handleError(settings, "Failed to fetch settings");
      }
      setLanguage(settings.language);
      setTheme(settings.theme);
    }

    fetchSettings();
    fetchProjects();
  }, [setProjectsList]);

  return (
    <AntdConfig>
      <BackgroundLayout>
        <MainAside />
        {children}
      </BackgroundLayout>
    </AntdConfig>
  );
}
