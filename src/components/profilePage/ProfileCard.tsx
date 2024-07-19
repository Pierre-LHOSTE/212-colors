"use client";
import { useI18nContext } from "@/src/i18n/i18n-react";
import type { UserType } from "@/src/types/user";
import { IconX } from "@tabler/icons-react";
import { Image } from "antd";
import MainCard from "../card/MainCard";
import "./profile.scss";

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
            children: user.image ? (
              <Image src={user.image} alt={user.name} />
            ) : (
              <IconX size={24} />
            ),
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
