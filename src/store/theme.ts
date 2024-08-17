import { create } from "zustand";

type SetStateFunction<T> = (state: T) => void;

interface ThemeStoreType {
  primaryColor: string | null;
  setPrimaryColor: SetStateFunction<ThemeStoreType["primaryColor"]>;
  backgroundColor: string | null;
  setBackgroundColor: SetStateFunction<ThemeStoreType["backgroundColor"]>;
  contentColor: string | null;
  setContentColor: SetStateFunction<ThemeStoreType["contentColor"]>;
  extraColor: string | null;
  setExtraColor: SetStateFunction<ThemeStoreType["extraColor"]>;
}

export const useThemeStore = create<ThemeStoreType>((set) => ({
  primaryColor: null,
  setPrimaryColor: (primaryColor: ThemeStoreType["primaryColor"]) =>
    set({ primaryColor }),
  backgroundColor: null,
  setBackgroundColor: (backgroundColor: ThemeStoreType["backgroundColor"]) =>
    set({ backgroundColor }),
  contentColor: null,
  setContentColor: (contentColor: ThemeStoreType["contentColor"]) =>
    set({ contentColor }),
  extraColor: null,
  setExtraColor: (extraColor: ThemeStoreType["extraColor"]) =>
    set({ extraColor }),
}));
