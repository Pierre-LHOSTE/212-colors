import { Divider } from "antd";
import ProfileButton from "../profileButton/ProfileButton";
import "./profile-section.scss";

function ProfileSection() {
  return (
    <div id="profile-section">
      <div style={{ height: "36px" }} />
      <ProfileButton />
      <Divider />
    </div>
  );
}

export default ProfileSection;
