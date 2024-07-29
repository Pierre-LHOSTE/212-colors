import type { MessageArgsProps, NotificationArgsProps } from "antd";
import { create } from "zustand";
import type { ThemeType } from "../types/settings";

type SetStateFunction<T> = (state: T) => void;

interface SettingsStoreType {
  theme: ThemeType;
  setTheme: SetStateFunction<ThemeType>;
  language: string;
  setLanguage: SetStateFunction<string>;
  localLanguage: string;
  setLocalLanguage: SetStateFunction<string>;
  message: MessageArgsProps;
  setMessage: SetStateFunction<MessageArgsProps>;
  notification: NotificationArgsProps;
  setNotification: SetStateFunction<NotificationArgsProps>;
  activeSection: string;
  setActiveSection: SetStateFunction<string>;
}

export const useSettingsStore = create<SettingsStoreType>((set) => ({
  theme: "auto",
  setTheme: (theme: ThemeType) => set({ theme }),
  language: "en",
  setLanguage: (language: string) => set({ language }),
  localLanguage: "en",
  setLocalLanguage: (localLanguage: string) => set({ localLanguage }),
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
