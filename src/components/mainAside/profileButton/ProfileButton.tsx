import { IconUser } from "@tabler/icons-react";
import Link from "next/link";
import "./profile-button.scss";

function ProfileButton({ active = false }: { active?: boolean }) {
  return (
    <div id="profile-icon" className={active ? " active" : ""}>
      <Link
        href="/app/profile"
        style={{
          backgroundColor: "#FF1818",
        }}
      >
        <IconUser strokeWidth={2.5} size={24} />
      </Link>
    </div>
  );
}

export default ProfileButton;
