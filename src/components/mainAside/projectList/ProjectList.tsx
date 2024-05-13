import { getProjectList } from "@/src/api/project";
import { ProjectButtonType } from "@/src/types/project";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./project-list.scss";

import NewProjectButton from "../newProjectButton/NewProjectButton";
import ProjectButton from "../projectButton/ProjectButton";

function ProjectList() {
  const pathname = usePathname();

  function handleDragEnd(params: any) {
    console.log(params);
  }
  const [projects, setProjects] = useState<ProjectButtonType[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const p: ProjectButtonType[] | null = await getProjectList();
      setProjects(p);
    }
    fetchData();
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="projects-list">
        {(provided) => (
          <nav
            ref={provided.innerRef}
            {...provided.droppableProps}
            id="projects-list"
          >
            {projects
              ? projects
                  .sort((a, b) => a.position - b.position)
                  .map((project, i) => (
                    <ProjectButton
                      key={i}
                      project={project}
                      index={i}
                      active={pathname === `/app/project/${project.id}`}
                    />
                  ))
              : null}
            {provided.placeholder}
            <NewProjectButton />
          </nav>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ProjectList;
