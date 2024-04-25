import { IconPlus } from "@tabler/icons-react";
import { Button } from "antd";
import "./new-project-button.scss";

function NewProjectButton() {
  return (
    <div className="project-icon">
      <Button id="new-project" type="text" icon={<IconPlus size={24} />} />
    </div>
  );
}

export default NewProjectButton;
