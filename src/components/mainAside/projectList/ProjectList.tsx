import { ProjectButtonType } from "@/src/types/project";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import NewProjectButton from "../newProjectButton/NewProjectButton";
import ProjectButton from "../projectButton/ProjectButton";
import "./project-list.scss";

function ProjectList({ projects }: { projects: ProjectButtonType[] }) {
  function handleDragEnd(params: any) {
    console.log(params);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="projects-list">
        {(provided) => (
          <nav
            ref={provided.innerRef}
            {...provided.droppableProps}
            id="project-list"
          >
            {projects
              .sort((a, b) => a.position - b.position)
              .map((project, i) => (
                <ProjectButton project={project} index={i} />
              ))}
            {provided.placeholder}
            <NewProjectButton />
          </nav>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ProjectList;
