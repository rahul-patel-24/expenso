import { StatCard } from "./StatsCard";
import { usePredictNextMonthExpenditureQuery } from "@/features/expense/expenseAPI";

/**
 * PredictedExpenditureCard Component
 *
 * Displays an estimate of next month's expenditure based on historical trends[using average of previous 3 months],
 * using data predicted from the past 3 months. Utilizes a reusable `StatCard` component
 *
 * Data Source:
 * - Retrieved via RTK Query hook `usePredictNextMonthExpenditureQuery`.
 *
 * Parent Component
 *  Dashboard
 */

export const PredictedExpenditureCard = () => {
  const { data, isLoading, isError } = usePredictNextMonthExpenditureQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  return (
    <StatCard
      title="Predicted Next Month"
      value={data?.predicted_next_month_total ?? 0}
      trendLabel="Based on last 3 months"
      footerNote="Estimated expenditure"
      isLoading={isLoading}
      isError={isError}
    />
  );
};
