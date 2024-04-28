"use client";
import { ProjectButtonType } from "@/src/types/project";
import MainAside from "../mainAside/MainAside";
import NavAside from "../navAside/NavAside";
import "./app.scss";
import Header from "./header/Header";

function ProjectLayout({
  projects,
  children,
}: {
  projects: ProjectButtonType[];
  children: React.ReactNode;
}) {
  return (
    <>
      <MainAside projects={projects} />
      <NavAside />
      <div id="content">
        <Header />
        <main id="main">{children}</main>
      </div>
    </>
  );
}

export default ProjectLayout;
