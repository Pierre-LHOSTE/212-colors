export interface PropsType {
  name: string | null;
  handleDelete?: () => void;
  handleEdit?: () => void;
  listeners?: unknown;
}
