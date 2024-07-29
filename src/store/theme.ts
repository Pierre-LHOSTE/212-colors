import { create } from "zustand";

type SetStateFunction<T> = (state: T) => void;

interface ThemeStoreType {
  primaryColor: string | null;
  setPrimaryColor: SetStateFunction<ThemeStoreType["primaryColor"]>;
}

export const useThemeStore = create<ThemeStoreType>((set) => ({
  primaryColor: null,
  setPrimaryColor: (primaryColor: ThemeStoreType["primaryColor"]) =>
    set({ primaryColor }),
}));
