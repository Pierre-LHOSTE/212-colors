"use client";
import { getProjectById } from "@/src/api/project";
import { ProjectType } from "@/src/types/project";
import { useEffect, useState } from "react";

function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<ProjectType | null>(null);

  useEffect(() => {
    (async () => {
      const project = await getProjectById(params.id);
      if (!project) {
        console.log("Project not found");
        return;
      }
      setProject(project as ProjectType);
    })();
  }, [params.id]);

  return <>Project {project?.id ?? "Not found"}</>;
}

export default ProjectPage;
