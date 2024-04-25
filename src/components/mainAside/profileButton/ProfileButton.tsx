import { IconUser } from "@tabler/icons-react";
import "./profile-button.scss";

function ProfileButton({ active = false }: { active?: boolean }) {
  return (
    <div id="profile-icon" className={active ? " active" : ""}>
      <button
        style={{
          backgroundColor: "#FF1818",
        }}
      >
        <IconUser strokeWidth={2.5} size={24} />
      </button>
    </div>
  );
}

export default ProfileButton;
