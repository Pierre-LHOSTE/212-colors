import { ProjectIconsType } from "@/src/types/project";
import ProfileIcon from "../profileIcon/ProfileIcon";
import ProjectIconList from "../projectIconList/ProjectIconList";
import "./projects-list.scss";

function ProjectsList({ projects }: { projects: ProjectIconsType[] }) {
  return (
    <div id="projects-list">
      <ProfileIcon />
      <ProjectIconList projects={projects} />
    </div>
  );
}

export default ProjectsList;
