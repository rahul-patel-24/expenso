import { useTopThreeExpenseDays } from "@/hooks/expense/useTopThreeExpenseDays";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * TopThreeDaysTable Component
 *
 * Displays the top 3 days with the highest total expenses.
 * - Fetches data via `useTopThreeExpenseDays` hook
 * - Renders a table with: Rank, Date, and Total Spent (₹)
 */

const TopThreeDaysTable = () => {
  const { data, isLoading, isError } = useTopThreeExpenseDays();

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Top 3 Expenditure Days</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Error loading data.</p>
        ) : data.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Total Spent (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((day) => (
                <TableRow key={day.rank}>
                  <TableCell>{day.rank}</TableCell>
                  <TableCell>
                    {new Date(day.date).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ₹
                    {day.total_expenditure.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground">No data available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TopThreeDaysTable;
