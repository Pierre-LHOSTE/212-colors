import { isVeryLightColor } from "@/src/lib/utils";
import { useSettingsStore } from "@/src/store/settings";
import type { ProjectButtonType } from "@/src/types/project";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import "./project-button.scss";
import type { PropsType } from "./props";

export default function ProjectButton(props: PropsType) {
  const { project, active } = props;
  const { id, name, colors } = project;
  const color = colors && colors.length > 0 ? colors[0].color : "#000";
  const initials = getInitials(name);

  const activeSection = useSettingsStore((state) => state.activeSection);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const elementColor = isVeryLightColor(color) ? "dark" : "light";

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.2 : undefined,
  };

  return (
    <div
      className={`project-icon${active ? " active" : ""}`}
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <div
        {...listeners}
        className={`icon-hook ${elementColor}`}
        style={{ backgroundColor: color }}
      />
      <Link
        href={`/app/project/${id}/${activeSection}`}
        style={{ backgroundColor: color }}
      >
        <span className={elementColor}>{initials}</span>
      </Link>
    </div>
  );
}

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
