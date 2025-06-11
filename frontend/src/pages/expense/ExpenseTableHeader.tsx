import { TableHead, TableRow, TableHeader } from "@/components/ui/table";
import SortHeader from "./SortHeader";
import type { TableHeaderProps } from "@/types/expenses";

/**
 * ExpenseTableHeader Component
 *
 * Renders the table header for the expense list with sortable columns.
 * - Supports sorting on: Title, Amount, Category, and Date
 * - Uses `SortHeader` for interactive sortable columns
 * - Includes static headers for Description and Actions
 *
 * Props:
 * - sortBy: Currently sorted column key
 * - sortOrder: ASC or DESC
 * - onSort: Callback to trigger sorting
 *
 * Parent Component:
 * ExpensesTable
 */

const ExpenseTableHeader = ({
  sortBy,
  sortOrder,
  onSort,
}: TableHeaderProps) => (
  <TableHeader>
    <TableRow>
      <SortHeader
        label="Title"
        sortKey="title"
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={onSort}
      />
      <SortHeader
        label="Amount"
        sortKey="amount"
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={onSort}
      />
      <SortHeader
        label="Category"
        sortKey="category"
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={onSort}
      />
      <TableHead>Description</TableHead>
      <SortHeader
        label="Date"
        sortKey="date"
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={onSort}
      />
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
);

export default ExpenseTableHeader;
