import { Divider } from "antd";
import ProfileButton from "../profileButton/ProfileButton";
import "./profile-section.scss";

export default function ProfileSection() {
  return (
    <div id="profile-section">
      <div style={{ height: "36px" }} />
      <ProfileButton />
      <Divider />
    </div>
  );
}
