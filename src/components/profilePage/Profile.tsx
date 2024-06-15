import type { UserType } from "@/src/types/user";
import ProfileCard from "./ProfileCard";
import ProfilePwd from "../profilePwd/ProfilePwd";
import ProfileAction from "../profileAction/ProfileAction";

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
