import { MessageArgsProps, NotificationArgsProps } from "antd";
import { create } from "zustand";

type SetStateFunction<T> = (state: T) => void;

interface SettingsStoreType {
  message: MessageArgsProps;
  setMessage: SetStateFunction<MessageArgsProps>;
  notification: NotificationArgsProps;
  setNotification: SetStateFunction<NotificationArgsProps>;
  activeSection: string;
  setActiveSection: SetStateFunction<string>;
}

export const useSettingsStore = create<SettingsStoreType>((set) => ({
  message: {
    type: "info",
    content: "",
  },
  setMessage: (message: MessageArgsProps) => set({ message }),
  notification: {
    message: "",
    description: "",
    type: "info",
  },
  setNotification: (notification: NotificationArgsProps) =>
    set({ notification }),
  activeSection: "overview",
  setActiveSection: (activeSection: string) => set({ activeSection }),
}));
