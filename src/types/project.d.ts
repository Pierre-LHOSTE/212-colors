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
  hiddenSections: string[];
  createdAt: Date;
  updatedAt: Date | null;
  ownerId: string;
  generalPrompt: string | null;
  namePrompt: string | null;
  descriptionPrompt: string | null;
  colorPrompt: string | null;
}
