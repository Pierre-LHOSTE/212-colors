import { ProjectIconType } from "@/src/types/project";
import { Draggable } from "react-beautiful-dnd";
import "./project-button.scss";

function ProjectButton({
  name,
  active,
  color,
  id,
  index,
}: ProjectIconType & { index: number }) {
  const initials = getInitials(name);

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
            style={{ backgroundColor: color }}
            className="icon-hook"
          ></div>
          <button style={{ backgroundColor: color }}>
            <span>{initials}</span>
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
