export interface ProjectLiteType {
  id: string;
  name: string;
}

export interface ProjectButtonType extends ProjectLiteType {
  colors: {
    color: string;
  }[];
  position: number;
}

export interface ProjectType extends ProjectLiteType {
  description: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  // owner: UserType;
  ownerId: string;
  // colors: ColorType[];
  // themeColors: ThemeColorType[];
  // themeColumns: ThemeColumnType[];
  // themes: ThemeType[];
  position: number;
  hiddenSections: string[];
}
