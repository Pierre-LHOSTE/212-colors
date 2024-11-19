"use client";
import { Layout, theme } from "antd";
import CreateProjectModal from "../modal/createProject/CreateProjectModal";
import "./main-aside.scss";
import ProfileSection from "./profileSection/ProfileSection";
import ProjectList from "./projectList/ProjectList";

const { useToken } = theme;

export default function MainAside() {
  const { token } = useToken();
  console.log(theme);

  return (
    <Layout.Sider
      id="main-aside"
      width={80}
      style={{
        backgroundColor: token.colorBgElevated,
      }}
    >
      <ProfileSection />
      <ProjectList />
      <CreateProjectModal />
    </Layout.Sider>
  );
}
