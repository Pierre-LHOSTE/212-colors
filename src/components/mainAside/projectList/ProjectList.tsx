import { getProjectList } from "@/src/api/project";
import { ProjectButtonType, ProjectType } from "@/src/types/project";
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
  const [projects, setProjects] = useState<ProjectButtonType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getProjectList();
      if ("error" in res) {
        return console.error(res.message);
      }
      setProjects(res);
    }
    fetchData();
  }, []);

  function addProject(newProject: ProjectType) {
    setProjects([...projects, newProject]);
  }

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
                      active={pathname.startsWith(`/app/project/${project.id}`)}
                    />
                  ))
              : null}
            {provided.placeholder}
            <NewProjectButton addProject={addProject} />
          </nav>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ProjectList;
