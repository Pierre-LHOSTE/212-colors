import { MessageArgsProps, NotificationArgsProps } from "antd";
import { create } from "zustand";
import { ColorType, ColorTypeType } from "../types/color";

type SetStateFunction<T> = (state: T) => void;

interface createColorModalStateType {
  colorType: ColorTypeType;
  show: boolean;
  addColor?: (color: ColorType) => void;
}

interface SettingsStoreType {
  createColorModalState: createColorModalStateType;
  setCreateColorModalState: SetStateFunction<
    Partial<createColorModalStateType>
  >;
  message: MessageArgsProps;
  setMessage: SetStateFunction<MessageArgsProps>;
  notification: NotificationArgsProps;
  setNotification: SetStateFunction<NotificationArgsProps>;
  activeSection: string;
  setActiveSection: SetStateFunction<string>;
}

export const useSettingsStore = create<SettingsStoreType>((set) => ({
  createColorModalState: {
    colorType: "primary",
    show: false,
  },
  setCreateColorModalState: (
    createColorModalState: Partial<createColorModalStateType>
  ) =>
    set((state) => ({
      createColorModalState: {
        ...state.createColorModalState,
        ...createColorModalState,
      },
    })),
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
