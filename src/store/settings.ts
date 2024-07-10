import type { MessageArgsProps, NotificationArgsProps } from "antd";
import { create } from "zustand";
import type { themeType } from "../types/settings";

type SetStateFunction<T> = (state: T) => void;

interface SettingsStoreType {
  theme: themeType;
  setTheme: SetStateFunction<themeType>;
  language: string;
  setLanguage: SetStateFunction<string>;
  message: MessageArgsProps;
  setMessage: SetStateFunction<MessageArgsProps>;
  notification: NotificationArgsProps;
  setNotification: SetStateFunction<NotificationArgsProps>;
  activeSection: string;
  setActiveSection: SetStateFunction<string>;
}

export const useSettingsStore = create<SettingsStoreType>((set) => ({
  theme: "auto",
  setTheme: (theme: themeType) => set({ theme }),
  language: "en",
  setLanguage: (language: string) => set({ language }),
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
