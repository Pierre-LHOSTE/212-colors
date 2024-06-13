"use client";
import { useSettingsStore } from "@/src/store/settings";
import { notification as antdNotification } from "antd";
import { useEffect } from "react";

export default function Notification() {
  const [api, contextHolder] = antdNotification.useNotification();
  const notification = useSettingsStore((state) => state.notification);

  useEffect(() => {
    if (notification?.message) {
      api[notification.type || "info"]({
        message: notification.message,
        description: notification.description,
        type: notification.type,
      });
    }
  }, [notification, api]);

  return <>{contextHolder}</>;
}
