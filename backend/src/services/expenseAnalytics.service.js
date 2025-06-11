import pool from "../db/pool.js";

export const getTopThreeSpendingDays = async (userId) => {
  const query = `
    SELECT 
      date,
      SUM(amount) AS total_expenditure
    FROM expenses
    WHERE user_id = $1
    GROUP BY date
    ORDER BY total_expenditure DESC
    LIMIT 3;
  `;
  const { rows } = await pool.query(query, [userId]);

  return rows.map((row, index) => ({
    rank: index + 1,
    date: row.date,
    total_expenditure: parseFloat(row.total_expenditure),
  }));
};

export const getMonthlyExpenditureChange = async (userId) => {
  const query = `
    -- Calculate total monthly expenses per user
    WITH monthly_totals AS (
      SELECT
        DATE_TRUNC('month', date) AS month,
        SUM(amount) AS total
      FROM expenses
      WHERE user_id = $1
      GROUP BY DATE_TRUNC('month', date)
    ),

    -- Extract totals for the current and previous months
    curr_month AS (
      SELECT total FROM monthly_totals 
      WHERE month = DATE_TRUNC('month', CURRENT_DATE)
    ),
    prev_month AS (
      SELECT total FROM monthly_totals 
      WHERE month = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
    )

    -- Compute percentage change between current and previous month
    SELECT
      curr_month.total AS current_month_total,
      prev_month.total AS previous_month_total,
      CASE 
        WHEN prev_month.total = 0 THEN NULL
        ELSE ROUND(((curr_month.total - prev_month.total) / prev_month.total) * 100, 2)
      END AS percent_change
    FROM curr_month, prev_month;
  `;

  const { rows } = await pool.query(query, [userId]);
  return rows[0] || null;
};


export const predictNextMonthExpenditure = async (userId) => {
  const query = `
    -- Calculate the total expenditure per month for the last 3 full months
    WITH monthly_totals AS (
      SELECT
        DATE_TRUNC('month', date) AS month,
        SUM(amount) AS total
      FROM expenses
      WHERE user_id = $1
        AND date < DATE_TRUNC('month', CURRENT_DATE)
      GROUP BY DATE_TRUNC('month', date)
      ORDER BY month DESC
      LIMIT 3
    )
    -- Predict next month's spending by averaging the last 3 months
    SELECT 
      ROUND(AVG(total), 2) AS predicted_next_month_total
    FROM monthly_totals;
  `;

  const { rows } = await pool.query(query, [userId]);
  return parseFloat(rows[0]?.predicted_next_month_total || 0);
};

