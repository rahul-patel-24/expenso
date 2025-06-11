import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryForm } from "./CategoryForm";
import { useCategoryForm } from "@/hooks/auth/useCategoryForm";
import type { CategoryModalProps } from "@/types/category";

/**
 * CategoryFormModal Component
 *
 * A modal dialog for creating or editing a category. It wraps the `CategoryForm` component inside a UI Dialog.
 *
 * Parent Component
 *  CategoryList
 *
 * Child Component
 *  CategoryForm
 */

export default function CategoryFormModal({
  open,
  onClose,
  category,
}: CategoryModalProps) {
  const { name, icon, setName, setIcon, handleSubmit, isEditing } =
    useCategoryForm(category, onClose);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit" : "Create"} Category</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the details of your category."
              : "Fill out the form to create a new category."}
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          name={name}
          icon={icon}
          setName={setName}
          setIcon={setIcon}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
        />
      </DialogContent>
    </Dialog>
  );
}
