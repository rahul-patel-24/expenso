import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExpenseForm } from "@/hooks/expense/useExpenseForm";
import type { ExpensesFormProps } from "@/types/expenses";
import type { Category } from "@/types/category";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

/**
 * ExpenseFormModal Component
 *
 * A dialog-based form for creating and editing expenses.
 * - Dynamically shows "Add" or "Edit" mode
 * - Pre-fills data when editing
 * - Validates input using react-hook-form with Zod
 * - Integrates Redux category state
 * - Submits via RTK Query mutation
 * 
 * Custom hook useExpenseForm handles form logic
 * 
 * Parent : ExpensesTable.tsx
 */

const ExpenseFormModal = ({
  open,
  onClose,
  defaultValues,
}: ExpensesFormProps) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    setValue,
    category_id,
    errors,
    isSubmitting,
    isDirty,
  } = useExpenseForm(defaultValues, onClose);

  const categories: Category[] = useSelector(
    (state: RootState) => state.categories.categories
  );

  const selectedCategory = categories?.find(
    (cat) =>
      cat.id === (Array.isArray(category_id) ? category_id[0] : category_id)
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Edit Expense" : "Add Expense"}
          </DialogTitle>
          <DialogDescription>
            {defaultValues
              ? "Update the details of your expense record."
              : "Fill out the form to add a new expense."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="Amount"
              {...register("amount")}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 min-w-fit">
            <Label htmlFor="category">Category</Label>
            <Select
              value={
                category_id !== undefined && category_id !== null
                  ? category_id.toString()
                  : ""
              }
              onValueChange={(value) => setValue("category_id", Number(value))}
            >
              <SelectTrigger id="category">
                <SelectValue>
                  {selectedCategory?.name ?? "Select Category"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories?.length === 0 && (
                  <SelectItem disabled value="">
                    No categories available
                  </SelectItem>
                )}
                {categories?.map((option: Category) => (
                  <SelectItem key={option.id} value={option.id.toString()}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category_id && (
              <p className="text-sm text-red-500">
                {errors.category_id.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Description (optional)"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              {...register("date")}
              max={new Date().toISOString().split("T")[0]}
            />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isDirty || isSubmitting}
          >
            {isSubmitting ? "Saving..." : defaultValues ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseFormModal;
