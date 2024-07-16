export interface PropsType {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  submitForm: () => void;
  title: string;
  mode: "add" | "edit";
  loading?: boolean;
}
