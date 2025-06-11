import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ICON_OPTIONS } from "./iconMap";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CategoryFormProps } from "@/types/category";

/**
 * CategoryForm Component
 *
 * Renders a form for creating or editing a category with fields for the category name and icon.
 *
 * Parent Component
 *  CategoryFormModal
 */


export const CategoryForm = ({
  name,
  icon,
  setName,
  setIcon,
  handleSubmit,
  isEditing,
}: CategoryFormProps) => (
  <>
    <Input
      placeholder="Category name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="mb-2"
      required
      autoFocus
      aria-label="Category Name"
    />

    <Select value={icon} onValueChange={(val) => setIcon(val)}>
      <SelectTrigger className="mb-4">
        <SelectValue placeholder="Select Icon" />
      </SelectTrigger>
      <SelectContent>
        {ICON_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            <div className="flex items-center gap-2">
              <opt.Icon size={16} />
              {opt.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Button onClick={handleSubmit} className="w-full">
      {isEditing ? "Update" : "Create"}
    </Button>
  </>
);
