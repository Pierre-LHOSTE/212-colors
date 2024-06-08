import { MessageArgsProps, NotificationArgsProps } from "antd";
import { create } from "zustand";
import { ColorType, ColorTypeType } from "../types/color";
import { ThemeColumnType, ThemeType } from "../types/theme";

type SetStateFunction<T> = (state: T) => void;

interface createColorModalStateType {
  colorType: ColorTypeType;
  show: boolean;
  addColor?: (color: ColorType) => void;
}
interface createThemeModalStateType {
  show: boolean;
  addTheme?: (theme: ThemeType) => void;
}
interface createThemeColumnModalStateType {
  show: boolean;
  addThemeColumn?: (theme: ThemeColumnType) => void;
}

interface SettingsStoreType {
  createColorModalState: createColorModalStateType;
  setCreateColorModalState: SetStateFunction<
    Partial<createColorModalStateType>
  >;
  createThemeModalState: createThemeModalStateType;
  setCreateThemeModalState: SetStateFunction<
    Partial<createThemeModalStateType>
  >;
  createThemeColumnModalState: createThemeColumnModalStateType;
  setCreateThemeColumnModalState: SetStateFunction<
    Partial<createThemeColumnModalStateType>
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
  createThemeModalState: {
    show: false,
  },
  setCreateThemeModalState: (
    createThemeModalState: Partial<createThemeModalStateType>
  ) =>
    set((state) => ({
      createThemeModalState: {
        ...state.createThemeModalState,
        ...createThemeModalState,
      },
    })),
  createThemeColumnModalState: {
    show: false,
  },
  setCreateThemeColumnModalState: (
    createThemeColumnModalState: Partial<createThemeColumnModalStateType>
  ) =>
    set((state) => ({
      createThemeColumnModalState: {
        ...state.createThemeColumnModalState,
        ...createThemeColumnModalState,
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
