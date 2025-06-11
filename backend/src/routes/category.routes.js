import { Router } from 'express'
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/category.controller.js";
import { protect } from '../middleware/auth.middleware.js'

const router = Router();

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
// @returns { Array<{ id: number, name: string, icon: string }> }
// @query   ?search=keyword
router.get("/", protect, getCategories);


// @desc    Create a new category
// @route   POST /api/categories
// @access  Private
// @body    { name: string, icon: string }
// @returns { id: number, name: string, icon: string }
router.post("/", protect, createCategory);


// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private
// @body    { name: string, icon: string }
// @params  id: number
router.put("/:id", protect, updateCategory);


// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private
// @params  id: number
router.delete("/:id", protect, deleteCategory);

export default router;