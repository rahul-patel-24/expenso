import { useEffect, useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/features/category/categoryAPI";

export type Category = {
  id?: string | number;
  name?: string;
  icon?: string;
};

export const useCategoryForm = (category?: Category, onClose?: () => void) => {
  const [name, setName] = useState(category?.name || "");
  const [icon, setIcon] = useState(category?.icon || "Folder");

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setIcon(category.icon || "Folder");
    }
  }, [category]);

  const handleSubmit = async () => {
    const payload = { name, icon };
    if (category) {
      await updateCategory({ id: category.id!, ...payload });
    } else {
      await createCategory(payload);
    }
    onClose?.();
    setName("");
    setIcon("Folder");
  };

  return {
    name,
    icon,
    setName,
    setIcon,
    handleSubmit,
    isEditing: !!category,
  };
};
