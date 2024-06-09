"use client";
import CreateProjectModal from "../modal/createProject/CreateProjectModal";
import "./main-aside.scss";
import ProfileSection from "./profileSection/ProfileSection";
import ProjectList from "./projectList/ProjectList";

function MainAside() {
  return (
    <div id="main-aside">
      <ProfileSection />
      <ProjectList />
      <CreateProjectModal />
    </div>
  );
}

export default MainAside;
