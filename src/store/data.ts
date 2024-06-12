import { create } from "zustand";
import { ColorType, ThemeColorType } from "../types/color";
import { ProjectButtonType, ProjectType } from "../types/project";
import { ThemeColumnType, ThemeType } from "../types/theme";

type SetStateFunction<T> = (state: T | ((prevState: T) => T)) => void;

interface DataStateType {
  project: ProjectType;
  setProject: SetStateFunction<ProjectType>;
  setHiddenSections: SetStateFunction<string[]>;
  projectsList: ProjectButtonType[];
  setProjectsList: SetStateFunction<ProjectButtonType[]>;
  colors: ColorType[];
  setColors: SetStateFunction<ColorType[]>;
  themes: ThemeType[];
  setThemes: SetStateFunction<ThemeType[]>;
  themeColumns: ThemeColumnType[];
  setThemeColumns: SetStateFunction<ThemeColumnType[]>;
  themeColors: ThemeColorType[];
  setThemeColors: SetStateFunction<ThemeColorType[]>;
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
  setProject: (
    project: ProjectType | ((prevState: ProjectType) => ProjectType)
  ) =>
    set((state) => ({
      project: typeof project === "function" ? project(state.project) : project,
    })),
  setHiddenSections: (
    hiddenSections: string[] | ((prevState: string[]) => string[])
  ) =>
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
  setProjectsList: (
    projectsList:
      | ProjectButtonType[]
      | ((prevState: ProjectButtonType[]) => ProjectButtonType[])
  ) =>
    set((state) => ({
      projectsList:
        typeof projectsList === "function"
          ? projectsList(state.projectsList)
          : projectsList,
    })),
  colors: [],
  setColors: (
    colors: ColorType[] | ((prevState: ColorType[]) => ColorType[])
  ) =>
    set((state) => ({
      colors: typeof colors === "function" ? colors(state.colors) : colors,
    })),
  themes: [],
  setThemes: (
    themes: ThemeType[] | ((prevState: ThemeType[]) => ThemeType[])
  ) =>
    set((state) => ({
      themes: typeof themes === "function" ? themes(state.themes) : themes,
    })),
  themeColumns: [],
  setThemeColumns: (
    themeColumns:
      | ThemeColumnType[]
      | ((prevState: ThemeColumnType[]) => ThemeColumnType[])
  ) =>
    set((state) => ({
      themeColumns:
        typeof themeColumns === "function"
          ? themeColumns(state.themeColumns)
          : themeColumns,
    })),
  themeColors: [],
  setThemeColors: (
    themeColors:
      | ThemeColorType[]
      | ((prevState: ThemeColorType[]) => ThemeColorType[])
  ) =>
    set((state) => ({
      themeColors:
        typeof themeColors === "function"
          ? themeColors(state.themeColors)
          : themeColors,
    })),
}));
