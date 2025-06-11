import pool from "../db/pool.js";
import {
  getTopThreeSpendingDays,
  getMonthlyExpenditureChange,
  predictNextMonthExpenditure,
} from "../services/expenseAnalytics.service.js";
import logger from "../utils/logger.js";

// Fetch expenses with filtering, sorting, and pagination
export const getExpenses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      category_id,
      start_date,
      end_date,
      min_amount,
      max_amount,
      sort_by = 'date',
      sort_order = 'DESC',
    } = req.query;

    const offset = (page - 1) * limit;
    const values = [req.user.id];
    let conditions = ['e.user_id = $1'];
    let index = 2;

    if (search.trim()) {
      conditions.push(`(e.description ILIKE $${index} OR e.title ILIKE $${index})`);
      values.push(`%${search}%`);
      index++;
    }
    if (category_id) {
      conditions.push(`e.category_id = $${index}`);
      values.push(category_id);
      index++;
    }
    if (start_date) {
      conditions.push(`e.date >= $${index}`);
      values.push(start_date);
      index++;
    }
    if (end_date) {
      conditions.push(`e.date <= $${index}`);
      values.push(end_date);
      index++;
    }
    if (min_amount) {
      conditions.push(`e.amount >= $${index}`);
      values.push(min_amount);
      index++;
    }
    if (max_amount) {
      conditions.push(`e.amount <= $${index}`);
      values.push(max_amount);
      index++;
    }

    const validSort = ['date', 'title', 'amount', 'description', 'created_at'];
    const sortColumn = validSort.includes(sort_by) ? sort_by : 'date';
    const sortDirection = sort_order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    values.push(limit, offset);

    const query = `
      SELECT
        e.id, e.title, e.amount, e.description, e.date, e.created_at,
        c.id as category_id,
        COUNT(*) OVER() AS total_count
      FROM expenses e
      LEFT JOIN categories c ON e.category_id = c.id
      WHERE ${conditions.join(' AND ')}
      ORDER BY e.${sortColumn} ${sortDirection}
      LIMIT $${index} OFFSET $${index + 1}
    `;

    const result = await pool.query(query, values);
    const total = result.rows.length ? Number(result.rows[0].total_count) : 0;
    const totalPages = Math.ceil(total / limit);

    logger.info(`Expenses fetched for user ${req.user.id}`);

    res.status(200).json({
      data: result.rows,
      total,
      totalPages,
      page: Number(page),
      perPage: Number(limit),
      hasNext: page < totalPages,
      hasPrev: page > 1,
    });
  } catch (err) {
    logger.error("Error fetching expenses", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create new expense
export const createExpense = async (req, res) => {
  const { title, category_id, amount, description, date } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO expenses (user_id, title, category_id, amount, description, date)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.user.id, title, category_id, amount, description, date]
    );

    logger.info(`Expense created by user ${req.user.id}`);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    logger.error("Error creating expense", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update existing expense
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, category_id, amount, description, date } = req.body;

  try {
    const result = await pool.query(
      `UPDATE expenses
       SET title = $1, category_id = $2, amount = $3, description = $4, date = $5
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [title, category_id, amount, description, date, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Expense not found or not authorized' });
    }

    logger.info(`Expense ${id} updated by user ${req.user.id}`);
    res.json(result.rows[0]);
  } catch (err) {
    logger.error("Error updating expense", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      `DELETE FROM expenses WHERE id = $1 AND user_id = $2`,
      [id, req.user.id]
    );

    logger.info(`Expense ${id} deleted by user ${req.user.id}`);
    res.status(204).send();
  } catch (err) {
    logger.error("Error deleting expense", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get top 3 spending days
export const getUserTopThreeDays = async (req, res) => {
  try {
    const userId = req.user.id;
    const topDays = await getTopThreeSpendingDays(userId);

    logger.info(`Top 3 days fetched for user ${userId}`);
    res.status(200).json({
      message: "Top 3 expenditure days",
      user_id: userId,
      data: topDays,
    });
  } catch (err) {
    logger.error("Error fetching top 3 spending days", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get monthly expenditure change
export const getUserMonthlyExpenditureChange = async (req, res) => {
  try {
    const userId = req.user.id;
    const change = await getMonthlyExpenditureChange(userId);

    if (!change) {
      logger.warn(`Not enough data for monthly change (user ${userId})`);
      return res.status(200).json({
        message: "Not enough data to calculate change",
        current_month_total: 0,
        previous_month_total: 0,
        percent_change: null,
      });
    }

    logger.info(`Monthly change calculated for user ${userId}`);
    res.status(200).json({
      message: "Monthly expenditure change",
      ...change,
    });
  } catch (err) {
    logger.error("Error calculating monthly change", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Predict next month’s expenditure
export const getPredictedNextMonthExpenditure = async (req, res) => {
  try {
    const userId = req.user.id;
    const prediction = await predictNextMonthExpenditure(userId);

    logger.info(`Prediction fetched for user ${userId}`);
    res.status(200).json({
      message: "Predicted expenditure for next month",
      predicted_next_month_total: prediction,
    });
  } catch (err) {
    logger.error("Error predicting next month expenditure", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
