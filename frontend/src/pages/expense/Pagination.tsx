import { Button } from "@/components/ui/button";
import type { PaginationProps } from "@/types/expenses";

/**
 * Pagination Component
 *
 * A  UI component that provides navigation between paginated data.
 *
 * Features:
 * - Displays "Prev" and "Next" buttons with proper disabling logic.
 * - Shows current page and total page info.
 * 
 * Parent Component
 *  ExpenseTable
 */

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="mt-4 flex justify-center items-center gap-4">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
