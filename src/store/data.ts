import { create } from "zustand";
import type { ColorType, ThemeColorType } from "../types/color";
import type { ProjectButtonType, ProjectType } from "../types/project";
import type { ThemeColumnType, ThemeType } from "../types/theme";
import type { Dispatch, SetStateAction } from "react";

interface DataStateType {
  project: ProjectType;
  setProject: Dispatch<SetStateAction<ProjectType>>;
  setHiddenSections: Dispatch<SetStateAction<string[]>>;
  projectsList: ProjectButtonType[];
  setProjectsList: Dispatch<SetStateAction<ProjectButtonType[]>>;
  colors: ColorType[];
  setColors: Dispatch<SetStateAction<ColorType[]>>;
  themes: ThemeType[];
  setThemes: Dispatch<SetStateAction<ThemeType[]>>;
  themeColumns: ThemeColumnType[];
  setThemeColumns: Dispatch<SetStateAction<ThemeColumnType[]>>;
  themeColors: ThemeColorType[];
  setThemeColors: Dispatch<SetStateAction<ThemeColorType[]>>;
}

export const useDataStore = create<DataStateType>((set) => ({
  project: {
    id: "",
    name: "",
    description: "",
    hiddenSections: [],
    position: 0,
    ownerId: "",
    createdAt: new Date(),
    updatedAt: null,
  },
  setProject: (project: SetStateAction<ProjectType>) =>
    set((state) => ({
      project: typeof project === "function" ? project(state.project) : project,
    })),
  setHiddenSections: (hiddenSections: SetStateAction<string[]>) =>
    set((state) => ({
      project: {
        ...state.project,
        hiddenSections:
          typeof hiddenSections === "function"
            ? hiddenSections(state.project.hiddenSections)
            : hiddenSections,
      },
    })),
  projectsList: [],
  setProjectsList: (projectsList: SetStateAction<ProjectButtonType[]>) =>
    set((state) => ({
      projectsList:
        typeof projectsList === "function"
          ? projectsList(state.projectsList)
          : projectsList,
    })),
  colors: [],
  setColors: (colors: SetStateAction<ColorType[]>) =>
    set((state) => ({
      colors: typeof colors === "function" ? colors(state.colors) : colors,
    })),
  themes: [],
  setThemes: (themes: SetStateAction<ThemeType[]>) =>
    set((state) => ({
      themes: typeof themes === "function" ? themes(state.themes) : themes,
    })),
  themeColumns: [],
  setThemeColumns: (themeColumns: SetStateAction<ThemeColumnType[]>) =>
    set((state) => ({
      themeColumns:
        typeof themeColumns === "function"
          ? themeColumns(state.themeColumns)
          : themeColumns,
    })),
  themeColors: [],
  setThemeColors: (themeColors: SetStateAction<ThemeColorType[]>) =>
    set((state) => ({
      themeColors:
        typeof themeColors === "function"
          ? themeColors(state.themeColors)
          : themeColors,
    })),
}));
