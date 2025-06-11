import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { getIconByName } from "./iconMap";
import type { CardEditDeleteProps } from "@/types/category";

/**
 * CategoryCard Component
 *
 * Renders a single category card with the category's icon and name, along with edit and delete actions.
 *
 * Props:
 * - `category`: The category object containing `id`, `name`, and `icon` properties.
 * - `onEdit`: Callback invoked when the edit button is clicked. Receives the full category object.
 * - `onDelete`: Callback invoked when the delete button is clicked. Receives the category's `id`.
 *
 *  Parent Component
 *  CategoryList
 */

export const CategoryCard = ({
  category,
  onEdit,
  onDelete,
}: CardEditDeleteProps) => {
  const Icon = getIconByName(category.icon);

  return (
    <li className="flex justify-between items-center border p-4 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <Icon size={24} className="text-primary" />
        <span className="font-medium">{category.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost" onClick={() => onEdit(category)}>
          <Pencil size={18} />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onDelete(category.id!)}
        >
          <Trash2 size={18} className="text-red-500" />
        </Button>
      </div>
    </li>
  );
};
