
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteCategoryMutation } from "@/features/category/categoryAPI";
import type { DeleteCategoryProps } from "@/types/category";

/**
 * 
 * DeleteConfirmModal
 * 
 * Used for delete confirmation for category delete
 * 
 * Parent Component
 *  CategoryList
 */

export default function DeleteConfirmModal({ open, onClose, id }: DeleteCategoryProps) {
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    await deleteCategory(id);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category?</DialogTitle>
        </DialogHeader>
        <p>This action cannot be undone.</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
