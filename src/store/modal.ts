import { create } from "zustand";
import { ColorType } from "../types/color";

type SetStateFunction<T> = (state: T) => void;

interface ModalStateType {
  id: string;
  mode: "add" | "edit";
  editItem?: any;
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
