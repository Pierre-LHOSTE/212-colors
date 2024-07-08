"use client";

import { logout } from "@/src/actions/login";
import { Button } from "antd";
import MainCard from "../card/MainCard";
import "./profile-action.scss";

export default function ProfileAction() {
  async function handleLogout() {
    await logout();
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
