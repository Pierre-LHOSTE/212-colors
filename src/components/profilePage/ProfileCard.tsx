import type { UserType } from "@/src/types/user";
import MainCard from "../card/MainCard";
import "./profile.scss";
import { Image } from "antd";

export default function ProfileCard({ user }: { user: UserType }) {
  return (
    <>
      <MainCard
        id="profile-card"
        sections={[
          {
            title: "Name",
            children: user.name,
          },
          {
            title: "Avatar",
            children: <Image src={user.image} alt={user.name} />,
          },
          {
            title: "Email",
            children: user.email,
          },
        ]}
      />
    </>
  );
}
