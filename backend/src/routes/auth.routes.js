import { Router } from 'express'
import { login, signup, logout, refresh, me } from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'
const router = Router()

// Authentication routes
//@desc    Signup a new user
//@route   POST /api/auth/signup
//@access  Public
router.post('/signup', signup)

//@desc    Login a user
//@route   POST /api/auth/login
//@access  Public
router.post('/login', login)

//@desc    Logout a user
//@route   POST /api/auth/logout
//@access  Private
router.post('/logout', protect, logout)

//@desc    Refresh access token
//@route   POST /api/auth/refresh
//@access  Private
router.post('/refresh', protect, refresh)

//@desc    Get current user details
//@route   GET /api/auth/me
//@access  Private
router.get('/me', protect, me)

export default router