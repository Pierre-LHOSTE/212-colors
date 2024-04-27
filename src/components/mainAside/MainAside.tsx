import { ProjectIconsType } from "@/src/types/project";
import "./main-aside.scss";
import ProfileSection from "./profileSection/ProfileSection";
import ProjectIconList from "./projectList/ProjectList";

function MainAside({ projects }: { projects: ProjectIconsType[] }) {
  return (
    <div id="main-aside">
      <ProfileSection />
      <ProjectIconList projects={projects} />
    </div>
  );
}

export default MainAside;