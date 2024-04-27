import { ProjectButtonType } from "@/src/types/project";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import { Draggable } from "react-beautiful-dnd";
import "./project-button.scss";

extend([a11yPlugin]);

function ProjectButton({
  project,
}: {
  project: ProjectButtonType & { index: number };
}) {
  const { id, name, color, active, index } = project;
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
          <button style={{ backgroundColor: color }}>
            <span className={elementColor}>{initials}</span>
          </button>
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

function isVeryLightColor(color: string): boolean {
  const c = colord(color);

  if (c.luminance() >= 0.5) {
    return true;
  }

  return false;
}
