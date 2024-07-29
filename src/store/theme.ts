import { create } from "zustand";

type SetStateFunction<T> = (state: T) => void;

interface SettingsStoreType {
  primaryColor: string;
  setPrimaryColor: SetStateFunction<string>;
}

export const useSettingsStore = create<SettingsStoreType>((set) => ({
  primaryColor: "#000000",
  setPrimaryColor: (primaryColor: string) => set({ primaryColor }),
}));
