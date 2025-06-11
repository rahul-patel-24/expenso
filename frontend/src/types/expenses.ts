export type SortOrder = "ASC" | "DESC";

export interface Expense {
  id: string;
  title: string;
  description?: string;
  amount: number;
  category_id: number;
  category_name?: string;
  date: string;
  created_at: string;
  updated_at: string;
  // category?: Category;
}

export type GetExpensesQueryParams = {
  page?: number;
  limit?: number;
  sort_by?: string; // or: "date" | "amount" | "title"
  sort_order?: string; // or: "ASC" | "DESC"
  search?: string;
  category_id?: string;
  start_date?: string; // ISO date format
  end_date?: string;
  min_amount?: string;
  max_amount?: string;
};

export interface Category {
  id: string;
  name: string;
  color?: string;
}

export interface ExpenseFilters {
  page?: number;
  limit?: number;
  search?: string;
  category_id?: string;
  start_date?: string;
  end_date?: string;
  min_amount?: string;
  max_amount?: string;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}

export interface ExpenseResponse {
  data: Expense[];
  total: number;
  page: number;
  totalPages: number;
  perPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface CreateExpenseRequest {
  title: string;
  description?: string;
  amount: number;
  category_id: string;
  date: string;
}

export interface UpdateExpenseRequest extends Partial<CreateExpenseRequest> {
  id: string;
}

export interface ExpenseFormData {
  title: string;
  description: string;
  amount: string;
  category_id: string;
  date: string;
}

export interface SortConfig {
  key: keyof Expense;
  direction: "ASC" | "DESC";
}

export interface TopDay {
  rank: number;
  date: string;
  total_expenditure: number;
}

export interface GetTopDaysResponse {
  message: string;
  user_id: string;
  data: TopDay[];
}

export type StatCardProps = {
  title: string;
  value: number | string;
  percentChange?: number | null;
  trendLabel?: string;
  footerNote?: string;
  isLoading?: boolean;
  isError?: boolean;
};

export type FilterProps = {
  filters: ExpenseFilters;
  setFilters: (filters: ExpenseFilters) => void;
  setPage: (page: number) => void;
};

export type ExpensesFormProps = {
  open: boolean;
  onClose: () => void;
  defaultValues?: Expense | null;
};

export type TableHeaderProps = {
  sortBy: string;
  sortOrder: SortOrder;
  onSort: (key: string) => void;
};

export type ExpensesTableRowProps = {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
};

export type ExpensesToolbarProps = {
  showFilters: boolean;
  filtersCount: number;
  onToggleFilters: () => void;
  onAdd: () => void;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};


export type TableSortProps = {
  label: string;
  sortKey: string;
  sortBy: string;
  sortOrder: string;
  onSort: (column: string) => void;
};
