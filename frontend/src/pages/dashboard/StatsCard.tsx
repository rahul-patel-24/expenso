import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { StatCardProps } from "@/types/expenses";

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentChange,
  trendLabel,
  footerNote,
  isLoading = false,
  isError = false,
}) => {
  const isPositive =
    percentChange !== undefined && percentChange !== null && percentChange >= 0;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {isLoading
            ? "Loading..."
            : isError
            ? "Error"
            : typeof value === "number"
            ? value.toLocaleString("en-IN", { minimumFractionDigits: 2 })
            : Number(value)?.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              }) || "--"}
        </CardTitle>
        {percentChange != null && !isLoading && !isError && (
          <Badge variant="outline" className="gap-1">
            {isPositive ? (
              <TrendingUp className="size-4" />
            ) : (
              <TrendingDown className="size-4" />
            )}
            {percentChange > 0
              ? `+${percentChange ?? 0}%`
              : `${percentChange ?? 0}%`}
          </Badge>
        )}
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        {trendLabel && (
          <div className="line-clamp-1 flex gap-2 font-medium">
            {trendLabel}
            {isPositive ? (
              <TrendingUp className="size-4" />
            ) : (
              <TrendingDown className="size-4" />
            )}
          </div>
        )}
        {footerNote && (
          <div className="text-muted-foreground">{footerNote}</div>
        )}
      </CardFooter>
    </Card>
  );
};
