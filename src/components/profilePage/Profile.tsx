import type { UserType } from "@/src/types/user";
import ProfileAction from "../profileAction/ProfileAction";
import ProfilePwd from "../profilePwd/ProfilePwd";
import ProfileCard from "./ProfileCard";

export default function Profile({ user }: { user: UserType }) {
  return (
    <div className="flex-horizontal">
      <div className="flex-vertical">
        <ProfileCard user={user} />
      </div>
      <div className="flex-vertical">
        <ProfilePwd />
        <ProfileAction />
      </div>
    </div>
  );
}
