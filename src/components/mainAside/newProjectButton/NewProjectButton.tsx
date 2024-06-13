import { useDataStore } from "@/src/store/data";
import { useModalStore } from "@/src/store/modal";
import type { ProjectButtonType } from "@/src/types/project";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "antd";
import "./new-project-button.scss";

export default function NewProjectButton() {
  const setModalState = useModalStore((state) => state.setModalState);
  const setProjectsList = useDataStore((state) => state.setProjectsList);

  function createProject() {
    setModalState({
      mode: "add",
      id: "project",
      updateStateCallBack: (newProject: ProjectButtonType) =>
        setProjectsList((prevProjectsList) => [
          ...prevProjectsList,
          newProject,
        ]),
    });
  }

  return (
    <div className="project-icon">
      <Button
        id="new-project"
        type="text"
        icon={<IconPlus size={24} />}
        onClick={createProject}
      />
    </div>
  );
}
