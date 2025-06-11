import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CategoryFormModal from "./CategoryFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { CategoryCard } from "./CategoryCard";
import { useCategoryList } from "@/hooks/category/useCategoryList";

/**
 * CategoryList  [Main component for category]
 *
 * Displays a searchable and interactive list of user-defined categories.
 * Provides options to add, edit, and delete categories using modals.
 *
 * Hook Used
 *  useCategoryList
 *
 * Child
 *  CategoryFormModal
 *  DeleteConfirmModal
 *  CategoryCard
 */

export default function CategoryList() {
  const {
    search,
    setSearch,
    modalOpen,
    setModalOpen,
    deleteId,
    setDeleteId,
    editData,
    setEditData,
    categories,
    isLoading,
  } = useCategoryList();

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button
          onClick={() => {
            setModalOpen(true);
            setEditData(undefined);
          }}
          className="w-full sm:w-auto"
        >
          + Add
        </Button>
      </div>

      {isLoading ? (
        <p className="text-center text-muted-foreground">
          Loading categories...
        </p>
      ) : categories?.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No categories found.
        </p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories?.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onEdit={(c) => {
                setEditData(c);
                setModalOpen(true);
              }}
              onDelete={(id) => setDeleteId(id)}
            />
          ))}
        </ul>
      )}

      <CategoryFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        category={editData}
      />

      <DeleteConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        id={deleteId ?? ""}
      />
    </div>
  );
}
