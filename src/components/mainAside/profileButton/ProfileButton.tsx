import { IconUser } from "@tabler/icons-react";
import "./profile-button.scss";

function ProfileButton({ active = false }: { active?: boolean }) {
  return (
    <div style={{ backgroundColor: "#1E2126" }}>
      <div style={{ height: "36px" }} />
      <div id="profile-icon" className={active ? " active" : ""}>
        <button
          style={{
            backgroundColor: "#FF1818",
          }}
        >
          <IconUser strokeWidth={2.5} size={24} />
        </button>
      </div>
    </div>
  );
}

export default ProfileButton;
