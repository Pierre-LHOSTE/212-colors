import { ProjectIconsType } from "@/src/types/project";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import NewProjectButton from "../newProjectButton/NewProjectButton";
import ProjectIcon from "../projectIcon/ProjectIcon";
import "./project-icon-list.scss";

function ProjectIconList({ projects }: { projects: ProjectIconsType[] }) {
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
            id="project-icon-list"
          >
            {projects
              .sort((a, b) => a.position - b.position)
              .map((project, i) => (
                <ProjectIcon
                  key={project.id}
                  name={project.name}
                  active={project.active}
                  color={project.color}
                  id={project.id}
                  index={i}
                />
              ))}
            {provided.placeholder}
            <NewProjectButton />
          </nav>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ProjectIconList;
