import { Divider, theme } from "antd";
import ProfileButton from "../profileButton/ProfileButton";
import "./profile-section.scss";

const { useToken } = theme;

export default function ProfileSection() {
  const { token } = useToken();

  return (
    <div
      id="profile-section"
      style={{
        backgroundColor: token.colorBgElevated,
      }}
    >
      <div style={{ height: "36px" }} />
      <ProfileButton />
      <Divider />
    </div>
  );
}
