"use client";
import { useSettingsStore } from "@/src/store/settings";
import { message as antdMessage } from "antd";
import { useEffect } from "react";

export default function Message() {
  const [messageApi, contextHolder] = antdMessage.useMessage();
  const message = useSettingsStore((state) => state.message);

  useEffect(() => {
    if (message?.content) {
      messageApi[message.type || "info"](
        message.content,
        message.duration,
        message.onClose
      );
    }
  }, [message, messageApi]);

  return <>{contextHolder}</>;
}
