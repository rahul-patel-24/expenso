import { useGetTopThreeDaysQuery } from "@/features/expense/expenseAPI";

/**
 * useTopThreeExpenseDays Hook
 *
 * Custom hook to fetch the top 3 dates with the highest total expenditure.
 * - Makes an API call (RTK Query)
 * - Returns loading, error, and result data
 */

export const useTopThreeExpenseDays = () => {
  const query = useGetTopThreeDaysQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
