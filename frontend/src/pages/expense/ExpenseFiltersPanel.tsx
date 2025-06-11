import type { FilterProps } from "@/types/expenses";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLocalFilters } from "@/hooks/expense/useLocalFilters";
import type { Category } from "@/types/category";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

/**
 * ExpenseFiltersPanel Component
 *
 * Renders UI inputs to filter expense records:
 * - Text search by title
 * - Category dropdown (from Redux store)
 * - Date range (start and end)
 * - Amount range (min and max)
 *
 * Actions:
 * - Apply filters to trigger refetch
 * - Clear all filters
 * 
 * Custom Hook:
 * useLocalFilters
 *
 * Parent Component:
 * - ExpensesTable
 */

const ExpenseFiltersPanel = ({ filters, setFilters, setPage }: FilterProps) => {
  const {
    localFilters,
    handleChange,
    handleSelectChange,
    applyFilters,
    clearFilters,
  } = useLocalFilters(filters, setFilters, setPage);

  const categories: Category[] = useSelector(
    (state: RootState) => state.categories.categories
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="search">Search</Label>
        <Input
          type="text"
          name="search"
          id="search"
          placeholder="Search by title"
          value={localFilters.search || ""}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2 min-w-full">
        <Label htmlFor="category_id">Category</Label>
        <Select
          value={localFilters.category_id || ""}
          onValueChange={(val) =>
            handleSelectChange("category_id", val === "all" ? "" : val)
          }
        >
          <SelectTrigger id="category_id">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="start_date">Start Date</Label>
        <Input
          type="date"
          name="start_date"
          id="start_date"
          value={localFilters.start_date || ""}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="end_date">End Date</Label>
        <Input
          type="date"
          name="end_date"
          id="end_date"
          value={localFilters.end_date || ""}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="min_amount">Min ₹</Label>
        <Input
          type="number"
          name="min_amount"
          id="min_amount"
          placeholder="Min ₹"
          value={localFilters.min_amount || ""}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="max_amount">Max ₹</Label>
        <Input
          type="number"
          name="max_amount"
          id="max_amount"
          placeholder="Max ₹"
          value={localFilters.max_amount || ""}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex items-end">
        <Button className="w-full" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>

      <div className="col-span-2 md:col-span-1 flex items-end">
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default ExpenseFiltersPanel;
