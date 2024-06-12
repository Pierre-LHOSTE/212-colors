export interface ProjectLiteType {
  id: string;
  name: string;
  position: number;
}

export interface ProjectButtonType extends ProjectLiteType {
  colors: {
    color: string;
  }[];
}

export interface ProjectType extends ProjectLiteType {
  description: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  ownerId: string;
  hiddenSections: string[];
}
