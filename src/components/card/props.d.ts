import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export interface MainCardSectionType {
  title: string;
  children: React.ReactNode;
  createAction?: () => void;
  showEditAction?: () => void;
}
interface MainCardBasicType {
  title?: string;
  children?: React.ReactNode;
  createAction?: () => void;
  showEditAction?: () => void;
  deleteAction?: () => void;
  dndAction?: SyntheticListenerMap;
}

export interface MainCardProps extends MainCardBasicType {
  sections?: MainCardSectionType[];
  noPadding?: boolean;
  noScroll?: boolean;
  id?: string;
  className?: string;
  direction?: "horizontal" | "vertical";
}
