import { useEffect, useState } from "react";
import {
  useGetExpensesQuery,
  useDeleteExpenseMutation,
} from "@/features/expense/expenseAPI";
import type {
  Expense,
  ExpenseFilters,
  ExpenseResponse,
  GetExpensesQueryParams,
  SortOrder,
} from "@/types/expenses";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useGetCategoriesQuery } from "@/features/category/categoryAPI";
import { setCategories } from "@/features/category/categorySlice";
import type { Category } from "@/types/category";

/**
 * useExpenseTable Hook
 *
 * Manages state and logic for the ExpensesTable component:
 * - Pagination, sorting, filtering, modal & edit states
 * - Fetches expenses and categories using RTK Query
 * - Dispatches category data to Redux store
 * - Provides handlers for sorting, editing, and deleting expenses
 */


export const useExpenseTable = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("DESC");
  const [filters, setFilters] = useState<ExpenseFilters>({});
  const [editExpense, setEditExpense] = useState<Expense | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const limit = 10;

  const dispatch = useDispatch();

  const queryParams: GetExpensesQueryParams = {
    page,
    limit,
    sort_by: sortBy,
    sort_order: sortOrder,
    ...filters,
  };

  const { data, isLoading, isError } = useGetExpensesQuery(queryParams, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  }) as {
    data: ExpenseResponse | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const { data: categories } = useGetCategoriesQuery("") as {
    data: Category[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  useEffect(() => {
    if (categories && categories.length > 0) {
      dispatch(setCategories(categories));
    }
  }, [categories, dispatch]);

  const [deleteExpense] = useDeleteExpenseMutation();

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortBy(column);
      setSortOrder("ASC");
    }
  };

  const handleDelete = async (id: string) => {
    await deleteExpense(id);
    toast.success("Expense deleted successfully");
  };

  const handleEdit = (expense: Expense) => {
    setEditExpense(expense);
    setShowModal(true);
  };

  return {
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
  };
};
