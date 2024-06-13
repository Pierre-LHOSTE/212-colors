import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export interface PropsType {
  title?: string;
  children: React.ReactNode;
  createAction?: () => void;
  showEditAction?: () => void;
  deleteAction?: () => void;
  dndAction?: SyntheticListenerMap;
}
