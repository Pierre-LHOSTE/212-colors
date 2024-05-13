import { isVeryLightColor } from "@/src/lib/utils";
import { ProjectButtonType } from "@/src/types/project";
import { Draggable } from "@hello-pangea/dnd";
import Link from "next/link";
import "./project-button.scss";

function ProjectButton({
  project,
  index,
  active,
}: {
  project: ProjectButtonType;
  index: number;
  active: boolean;
}) {
  const { id, name, colors } = project;
  const color = colors[0].color;
  const initials = getInitials(name);

  const elementColor = isVeryLightColor(color) ? "dark" : "light";

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`project-icon${active ? " active" : ""}`}
        >
          <div
            {...provided.dragHandleProps}
            className={`icon-hook ${elementColor}`}
            style={{ backgroundColor: color }}
          ></div>
          <Link href={"/app/project/" + id} style={{ backgroundColor: color }}>
            <span className={elementColor}>{initials}</span>
          </Link>
        </div>
      )}
    </Draggable>
  );
}

export default ProjectButton;

function getInitials(name: string): string {
  let initials = "";

  if (name.split(" ").length > 1) {
    initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
  } else if (name.split(/(?=[A-Z])/).length > 1) {
    initials = name
      .split(/(?=[A-Z])/)
      .map((word) => word[0])
      .join("");
  } else {
    initials = name.slice(0, 2);
  }

  initials = initials.slice(0, 3);

  return initials;
}
