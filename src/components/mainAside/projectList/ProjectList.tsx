import { getProjectList } from "@/src/api/project";
import { ProjectButtonType, ProjectType } from "@/src/types/project";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./project-list.scss";

import { reOrder } from "@/src/api/color";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import NewProjectButton from "../newProjectButton/NewProjectButton";
import ProjectButton from "../projectButton/ProjectButton";

function ProjectList() {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const pathname = usePathname();
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function updateProjectPosition(event: DragMoveEvent | DragEndEvent) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const activeItemIndex = projects.findIndex(
        (item) => item.id === active.id
      );
      const overItemIndex = projects.findIndex((item) => item.id === over.id);

      const newArray = arrayMove(projects, activeItemIndex, overItemIndex);

      reOrder(newArray, "project");
      setProjects(newArray);
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  function findProjectData(
    id: UniqueIdentifier | undefined
  ): ProjectButtonType {
    const item = projects.find((item) => item.id === id);
    if (!item)
      return {
        id: "",
        name: "",
        position: 0,
        colors: [],
      };
    return item;
  }

  function handleDragEnd(event: DragEndEvent) {
    updateProjectPosition(event);
    setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <nav id="projects-list">
        <SortableContext items={projects.map((i) => i.id)}>
          {projects
            ? projects.map((project, i) => (
                <ProjectButton
                  key={project.id}
                  project={project}
                  index={i}
                  active={pathname.startsWith(`/app/project/${project.id}`)}
                />
              ))
            : null}
        </SortableContext>
        <NewProjectButton addProject={addProject} />
      </nav>
      <DragOverlay adjustScale={false}>
        {activeId ? (
          <>
            {
              <ProjectButton
                project={findProjectData(activeId)}
                index={0}
                active={pathname.startsWith(`/app/project/${activeId}`)}
              />
            }
          </>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default ProjectList;
