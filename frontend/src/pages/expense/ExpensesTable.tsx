import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useExpenseTable } from "@/hooks/expense/useExpenseTable";
import ExpenseFormModal from "./ExpenseFormModal";
import ExpenseFiltersPanel from "./ExpenseFiltersPanel";
import Pagination from "./Pagination";
import ExpenseToolbar from "./ExpenseToolbar";
import ExpenseTableHeader from "./ExpenseTableHeader";
import ExpenseTableRow from "./ExpenseTableRow";

/**
 * ExpenseTable Component {Main component of expenses}
 *
 * Displays a paginated and sortable expense table with CRUD operations.
 * - Shows loading/error states
 * - Supports filtering, sorting, and pagination
 * - Handles add/edit/delete via useExpenseTable hook
 *
 *  Children components:
 * - ExpenseToolbar: Toolbar for actions like adding expenses and toggling filters
 * - ExpenseFiltersPanel: Panel for filtering expenses
 * - ExpenseTableHeader: Header for the expense table with sorting functionality
 * - ExpenseTableRow: Row component for displaying individual expense items
 * - ExpenseFormModal: Modal for adding/editing expenses
 * - Pagination: Component for navigating through pages of expenses
 *
 */

const ExpenseTable = () => {
  const {
    data,
    isLoading,
    isError,
    page,
    setPage,
    sortBy,
    sortOrder,
    handleSort,
    filters,
    setFilters,
    showFilters,
    setShowFilters,
    showModal,
    setShowModal,
    editExpense,
    setEditExpense,
    handleEdit,
    handleDelete,
  } = useExpenseTable();

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error loading expenses.</div>;

  return (
    <div className="p-4">
      <ExpenseToolbar
        showFilters={showFilters}
        filtersCount={Object.keys(filters).length}
        onToggleFilters={() => setShowFilters((prev) => !prev)}
        onAdd={() => setShowModal(true)}
      />

      {showFilters && (
        <ExpenseFiltersPanel
          filters={filters}
          setFilters={setFilters}
          setPage={setPage}
        />
      )}

      <div className="border rounded-md overflow-hidden">
        <Table>
          <ExpenseTableHeader
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
          <TableBody>
            {data?.data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No expenses found.
                </TableCell>
              </TableRow>
            )}
            {data?.data?.map((expense) => (
              <ExpenseTableRow
                key={expense.id}
                expense={expense}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />

      <ExpenseFormModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditExpense(null);
        }}
        defaultValues={editExpense}
      />
    </div>
  );
};

export default ExpenseTable;
