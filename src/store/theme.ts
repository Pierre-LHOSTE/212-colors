import { create } from "zustand";

type SetStateFunction<T> = (state: T) => void;

interface ThemeStoreType {
  primaryColor: string | null;
  setPrimaryColor: SetStateFunction<ThemeStoreType["primaryColor"]>;
  backgroundColor: string | null;
  setBackgroundColor: SetStateFunction<ThemeStoreType["backgroundColor"]>;
  contentColor: string | null;
  setContentColor: SetStateFunction<ThemeStoreType["contentColor"]>;
  highlightColor: string | null;
  setHighlightColor: SetStateFunction<ThemeStoreType["highlightColor"]>;
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
  highlightColor: null,
  setHighlightColor: (highlightColor: ThemeStoreType["highlightColor"]) =>
    set({ highlightColor }),
}));
