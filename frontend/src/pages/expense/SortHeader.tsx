
import { TableHead } from "@/components/ui/table";
import type { TableSortProps } from "@/types/expenses";
import { ArrowUpDown } from "lucide-react";

/**
 * SortHeader Component
 *
 * A table header cell that supports sorting behavior with a clickable label and icon indicator.
 *
 * Features:
 * - Highlights active sort column with directional icon.
 * - Visually indicates ascending or descending order.
 * 
 * Parent Component 
 *  Expenses Table
 * 
 */


const SortHeader = ({ label, sortKey, sortBy, sortOrder, onSort }: TableSortProps) => (
  <TableHead
    className="cursor-pointer select-none"
    onClick={() => onSort(sortKey)}
  >
    <div className="flex items-center gap-1">
      {label}
      {sortBy === sortKey && (
        <ArrowUpDown className={`h-4 w-4 ${sortOrder === "ASC" ? "rotate-180" : ""}`} />
      )}
    </div>
  </TableHead>
);

export default SortHeader;
