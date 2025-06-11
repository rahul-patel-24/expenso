import { useState } from "react";
import type { ExpenseFilters } from "@/types/expenses";

/**
 * useLocalFilters Hook
 * 
 * Custom hook to manage local filter state for expenses.
 *
 */


export const useLocalFilters = (
  initialFilters: ExpenseFilters,
  setFilters: (filters: ExpenseFilters) => void,
  setPage: (page: number) => void
) => {
  const [localFilters, setLocalFilters] = useState<ExpenseFilters>(initialFilters);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof ExpenseFilters, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setFilters(localFilters);
    setPage(1);
  };

  const clearFilters = () => {
    setLocalFilters({});
    setFilters({});
    setPage(1);
  };

  return {
    localFilters,
    handleChange,
    handleSelectChange,
    applyFilters,
    clearFilters,
  };
};
