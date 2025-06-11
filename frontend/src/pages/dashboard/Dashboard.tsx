import TopThreeDaysTable from "./TopThreeDays";
import { MonthlyExpenditureCard } from "./MonthlyExpenditureCard";
import { PredictedExpenditureCard } from "./PredictedExpenditureCard";

/**
 * Dashboard Component [Main component for show stats]
 *
 * - `MonthlyExpenditureCard`: Displays total expenses for the current month and the percentage change compared to the previous month.
 * - `PredictedExpenditureCard`: Shows predicted expenditure for the next month based on the last 3 months of data.
 * - `TopThreeDaysTable`: Lists the top 3 days with the highest spending.
 */

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
        <MonthlyExpenditureCard />
        <PredictedExpenditureCard />
      </div>
      <TopThreeDaysTable />
    </div>
  );
};

export default Dashboard;
