import { create } from "zustand";
import { ColorType, ThemeColorType } from "../types/color";
import { ThemeColumnType, ThemeType } from "../types/theme";

type SetStateFunction<T> = (state: T) => void;

interface ModalStateType {
  id: string;
  mode: "add" | "edit";
  editData?: ColorType | ThemeType | ThemeColumnType | ThemeColorType;
  updateLocalState?: (arg: any) => void;
  data?: {
    colorType?: ColorType["type"];
    themeId?: string;
    themeColumnId?: string;
  };
}

interface ModalStoreType {
  modalState: ModalStateType;
  setModalState: SetStateFunction<Partial<ModalStateType>>;
}

export const useModalStore = create<ModalStoreType>((set) => ({
  modalState: {
    id: "",
    mode: "add",
  },
  setModalState: (ModalState: Partial<ModalStateType>) =>
    set((state) => ({
      modalState: {
        ...state.modalState,
        ...ModalState,
      },
    })),
}));
