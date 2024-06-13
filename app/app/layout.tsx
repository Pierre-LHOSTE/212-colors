"use client";
import { getProjectList } from "@/src/api/project";
import MainAside from "@/src/components/mainAside/MainAside";
import { useDataStore } from "@/src/store/data";
import "overlayscrollbars/overlayscrollbars.css";
import { useEffect } from "react";
import "./layout.scss";
import { handleError } from "@/src/lib/utils";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setProjectsList = useDataStore((state) => state.setProjectsList);

  useEffect(() => {
    async function fetchProjects() {
      const projects = await getProjectList();
      if ("error" in projects) {
        return handleError(projects, "Failed to fetch projects");
      }
      setProjectsList(projects);
    }

    fetchProjects();
  }, [setProjectsList]);

  return (
    <div id="app-window">
      <MainAside />
      {children}
    </div>
  );
}
