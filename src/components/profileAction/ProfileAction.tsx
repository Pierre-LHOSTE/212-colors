"use client";
import { logout } from "@/src/actions/login";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { AUTH_ROUTES } from "@/src/lib/routes";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import MainCard from "../card/MainCard";
import "./profile-action.scss";

export default function ProfileAction() {
  const router = useRouter();
  const { LL } = useI18nContext();

  async function handleLogout() {
    await logout();
    router.replace(AUTH_ROUTES[0]);
  }

  return (
    <MainCard title={LL.profile.action.title()}>
      <div id="profile-actions">
        <Button type="primary" onClick={handleLogout}>
          {LL.profile.action.logout()}
        </Button>
        <Button danger type="default" onClick={handleLogout}>
          {LL.profile.action.deleteAccount()}
        </Button>
      </div>
    </MainCard>
  );
}
