import type { ProjectButtonType } from "@/src/types/project";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "./project-list.scss";

import { reOrder } from "@/src/api/color";
import { useDataStore } from "@/src/store/data";
import {
  DndContext,
  type DragEndEvent,
  type DragMoveEvent,
  DragOverlay,
  type DragStartEvent,
  type UniqueIdentifier,
  closestCorners,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import NewProjectButton from "../newProjectButton/NewProjectButton";
import ProjectButton from "../projectButton/ProjectButton";
import { useCustomSensors } from "@/src/lib/utils";

function ProjectList() {
  const projectsList = useDataStore((state) => state.projectsList);
  const setProjectsList = useDataStore((state) => state.setProjectsList);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const pathname = usePathname();

  const sensors = useCustomSensors();

  function updateProjectPosition(event: DragMoveEvent | DragEndEvent) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const activeItemIndex = projectsList.findIndex(
        (item) => item.id === active.id
      );
      const overItemIndex = projectsList.findIndex(
        (item) => item.id === over.id
      );

      const newArray = arrayMove(projectsList, activeItemIndex, overItemIndex);

      reOrder(newArray, "project");
      setProjectsList(newArray);
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
    const item = projectsList.find((item) => item.id === id);
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
        <SortableContext items={projectsList.map((i) => i.id)}>
          {projectsList
            ? projectsList.map((project, i) => (
                <ProjectButton
                  key={project.id}
                  project={project}
                  index={i}
                  active={pathname.startsWith(`/app/project/${project.id}`)}
                />
              ))
            : null}
        </SortableContext>
        <NewProjectButton />
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
