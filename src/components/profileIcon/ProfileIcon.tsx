import { IconUser } from "@tabler/icons-react";
import "./profile-icon.scss";

function ProfileIcon({ active = false }: { active?: boolean }) {
  return (
    <button
      id="profile-icon"
      className={active ? " active" : ""}
      style={{
        backgroundColor: "#FF1818",
      }}
    >
      <IconUser strokeWidth={2.5} color="white" size={24} />
    </button>
  );
}

export default ProfileIcon;
