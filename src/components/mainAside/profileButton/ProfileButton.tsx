import { IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./profile-button.scss";

export default function ProfileButton({
  active = false,
}: {
  active?: boolean;
}) {
  const pathname = usePathname();
  return (
    <div
      id="profile-icon"
      className={pathname.startsWith(`/app/profile`) ? "active" : ""}
    >
      <div className={"icon-hook"} />
      <Link href="/app/profile">
        <IconUser strokeWidth={2.5} size={24} />
      </Link>
    </div>
  );
}
