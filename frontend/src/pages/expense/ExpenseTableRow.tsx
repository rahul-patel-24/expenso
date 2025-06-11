import { TableRow, TableCell } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import type { ExpensesTableRowProps } from "@/types/expenses";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import type { Category } from "@/types/category";
import { getIconByName } from "../category/iconMap";

/**
 * ExpenseTableRow Component
 *
 * Renders a single row in the expenses table with the following:
 * - Expense title, amount (formatted), category with icon, description, and date
 * - Action buttons for edit and delete with tooltips
 *
 * Props:
 * - expense: The expense object containing all its details
 * - onEdit: Callback to trigger editing this expense
 * - onDelete: Callback to trigger deletion of this expense
 *
 * Features:
 * - Uses RTK state to fetch categories for display and icon mapping
 * - Formats amount using `toLocaleString` for INR
 * - Formats date in "DD MMM YYYY" (en-IN)
 * - Displays a fallback if data is missing (e.g., title, description)
 * - Includes Lucide icons with ShadCN UI Tooltips for actions
 * 
 * Parent Component:
 * -ExpensesTable
 */


const ExpenseTableRow = ({
  expense,
  onEdit,
  onDelete,
}: ExpensesTableRowProps) => {
  const categories: Category[] = useSelector(
    (state: RootState) => state.categories.categories
  );

  const selectedCategory = categories?.find(
    (cat) => cat.id === expense.category_id
  );

  const Icon = getIconByName(selectedCategory?.name);

  return (
    <TableRow
      key={expense.id}
      className="hover:bg-muted/50 even:bg-muted/20 transition-colors"
    >
      <TableCell>{expense.title ?? "—"}</TableCell>
      <TableCell>
        ₹
        {Number(expense.amount).toLocaleString("en-IN", {
          maximumFractionDigits: 2,
        })}
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        {selectedCategory?.name ?? "Uncategorized"}
      </TableCell>
      <TableCell>{expense.description ?? "—"}</TableCell>
      <TableCell>
        {new Date(expense.date).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </TableCell>
      <TableCell className="space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                onClick={() => onEdit(expense)}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => onDelete(expense.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  );
};

export default ExpenseTableRow;
