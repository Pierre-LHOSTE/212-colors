"use client";
import { getProjectById } from "@/src/api/project";
import ColorApp from "@/src/components/app/colorApp/ColorApp";
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

  return (
    <>
      <ColorApp />
    </>
  );
}

export default ProjectPage;
