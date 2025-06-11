import { StatCard } from "./StatsCard";
import { useGetMonthlyExpenditureChangeQuery } from "@/features/expense/expenseAPI";

/**
 * MonthlyExpenditureCard Component
 *
 * Displays the current month's total expenses along with a percentage change
 * compared to the previous month. Uses a reusable `StatCard` component to show:
 * - Total amount spent this month
 * - Percent change from last month
 * - Trend direction
 * - Loading and error states
 *
 * Data Source:
 * - Fetched using RTK Query hook `useGetMonthlyExpenditureChangeQuery`.
 *
 * Parent Component
 *  Dashboard
 *
 */

export const MonthlyExpenditureCard = () => {
  const { data, isLoading, isError } = useGetMonthlyExpenditureChangeQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  return (
    <StatCard
      title="Monthly Expenses"
      value={data?.current_month_total ?? 0}
      percentChange={data?.percent_change ?? null}
      trendLabel={
        data?.percent_change !== null
          ? (data?.percent_change ?? 0) > 0
            ? "Trending up this month"
            : "Trending down this month"
          : undefined
      }
      footerNote="Compared to previous month"
      isLoading={isLoading}
      isError={isError}
    />
  );
};
