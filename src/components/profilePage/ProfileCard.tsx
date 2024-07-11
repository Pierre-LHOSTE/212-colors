"use client"
import type { UserType } from "@/src/types/user";
import MainCard from "../card/MainCard";
import "./profile.scss";
import { Image } from "antd";
import { useI18nContext } from '@/src/i18n/i18n-react'

export default function ProfileCard({ user }: { user: UserType }) {
  const { LL } = useI18nContext();

  return (
    <>
      <MainCard
        id="profile-card"
        sections={[
          {
            title: LL.profile.display.name(),
            children: user.name,
          },
          {
            title: LL.profile.display.avatar(),
            children: <Image src={user.image} alt={user.name} />,
          },
          {
            title: LL.profile.display.email(),
            children: user.email,
          },
        ]}
      />
    </>
  );
}
