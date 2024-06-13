import { create } from "zustand";
import type { ColorType } from "../types/color";

type SetStateFunction<T> = (state: T) => void;

interface ModalStateType {
  id: string;
  mode: "add" | "edit";
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  editItem?: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  updateStateCallBack?: (arg: any) => void;
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
