import { Button } from "@/components/ui/button";
import type { ExpensesToolbarProps } from "@/types/expenses";
import { ChevronDown, ChevronUp, FilterIcon } from "lucide-react";

/**
 * ExpenseToolbar Component
 *
 * Displays a toolbar above the expenses table with the following:
 * - Toggle button to show/hide filters
 * - Filter count badge (if filters are applied)
 * - "+ Add" button to trigger adding a new expense
 *
 * Parent Component
 *  ExpensesTable
 */

const ExpenseToolbar = ({
  showFilters,
  filtersCount,
  onToggleFilters,
  onAdd,
}: ExpensesToolbarProps) => (
  <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
    <Button
      variant="outline"
      onClick={onToggleFilters}
      className="flex items-center gap-2"
    >
      <FilterIcon className="h-4 w-4" />
      {showFilters ? "Hide Filters" : "Show Filters"}
      {filtersCount > 0 && (
        <span className="ml-1 text-xs bg-blue-100 text-blue-600 rounded-full px-2">
          {filtersCount}
        </span>
      )}
      {showFilters ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
    </Button>
    <Button onClick={onAdd}>+ Add</Button>
  </div>
);

export default ExpenseToolbar;
