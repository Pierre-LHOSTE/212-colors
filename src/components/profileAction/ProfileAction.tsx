"use client";

import { logout } from "@/src/actions/login";
import { Button } from "antd";
import MainCard from "../card/MainCard";
import "./profile-action.scss";
import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/src/lib/routes";

export default function ProfileAction() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace(AUTH_ROUTES[0]);
  }

  return (
    <MainCard title="Actions">
      <div id="profile-actions">
        <Button type="primary" onClick={handleLogout}>
          Se déconnecter
        </Button>
        <Button danger type="default" onClick={handleLogout}>
          Supprimer le compte
        </Button>
      </div>
    </MainCard>
  );
}
