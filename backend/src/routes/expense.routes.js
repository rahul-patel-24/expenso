import { Router } from 'express';
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getUserTopThreeDays,
  getUserMonthlyExpenditureChange,
  getPredictedNextMonthExpenditure
} from '../controllers/expense.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();


//@desc    Get all expenses
//@route   GET /api/expenses
//@access  Private
//@returns {Array} List of expenses
router.get('/', protect, getExpenses);

//@desc    Create a new expense
//@route   POST /api/expenses
//@access  Private
//@returns {Object} Created expense
router.post('/', protect, createExpense);


//@desc    Update an expense
//@route   PUT /api/expenses/:id
//@access  Private
//@returns {Object} Updated expense
router.put('/:id', protect, updateExpense);


//@desc    Delete an expense
//@route   DELETE /api/expenses/:id
//@access  Private
//@returns {Object} Confirmation of deletion
router.delete('/:id', protect, deleteExpense);

//@desc    Get user's top three days with highest expenses
//@route   GET /api/expenses/top-three-days
//@access  Private
//@returns {Object} Top three days with highest expenses
router.get('/top-three-days', protect, getUserTopThreeDays);

//@desc    Get monthly expenditure change based on previous month
//@route   GET /api/expenses/monthly-compare
//@access  Private
//@returns {Object} Monthly expenditure change
router.get('/monthly-compare', protect, getUserMonthlyExpenditureChange);


//@desc    Predict next month's expenditure based on historical data
//@route   GET /api/expenses/predict-next-month
//@access  Private
//@returns {Object} Predicted expenditure for next month
router.get('/predict-next-month', protect, getPredictedNextMonthExpenditure);

export default router;