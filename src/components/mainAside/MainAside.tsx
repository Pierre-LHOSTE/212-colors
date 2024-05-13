"use client";
import "./main-aside.scss";
import ProfileSection from "./profileSection/ProfileSection";
import ProjectIconList from "./projectList/ProjectList";

function MainAside() {
  return (
    <div id="main-aside">
      <ProfileSection />
      <ProjectIconList />
    </div>
  );
}

export default MainAside;
