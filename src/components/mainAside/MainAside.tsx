import { ProjectIconsType } from "@/src/types/project";
import "./main-aside.scss";
import ProfileIcon from "./profileButton/ProfileButton";
import ProjectIconList from "./projectList/ProjectList";

function MainAside({ projects }: { projects: ProjectIconsType[] }) {
  return (
    <div id="projects-list">
      <ProfileIcon />
      <ProjectIconList projects={projects} />
    </div>
  );
}

export default MainAside;
