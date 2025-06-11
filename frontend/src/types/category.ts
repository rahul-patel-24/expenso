export type Category = {
  id: number | string;
  name?: string;
  icon?: string;
};

export type CategoryFormProps = {
  name: string;
  icon: string;
  setName: (val: string) => void;
  setIcon: (val: string) => void;
  handleSubmit: () => void;
  isEditing: boolean;
};

export type CardEditDeleteProps = {
  category: Category;
  onEdit: (cat: Category) => void;
  onDelete: (id: string | number) => void;
};

export type CategoryModalProps = {
  open: boolean;
  onClose: () => void;
  category?: Category;
};

export type DeleteCategoryProps = {
  open: boolean;
  onClose: () => void;
  id: number | string;
};


