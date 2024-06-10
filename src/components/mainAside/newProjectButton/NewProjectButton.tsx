import { useModalStore } from "@/src/store/modal";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "antd";
import "./new-project-button.scss";

function NewProjectButton({
  addProject,
}: {
  addProject: (projects: any) => void;
}) {
  const modalState = useModalStore((state) => state.modalState);
  const setModalState = useModalStore((state) => state.setModalState);

  function createProject() {
    setModalState({
      mode: "add",
      id: "project",
      updateLocalState: addProject,
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

export default NewProjectButton;
