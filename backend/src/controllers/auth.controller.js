import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { hash, compare } from 'bcrypt';
import { getUserByEmail, createUser } from '../services/user.service.js';
import { signAccessToken, signRefreshToken } from '../utils/jwt.util.js';
import logger from '../utils/logger.js';
import { validateEmail, validatePassword } from '../utils/validateInput.js';


//  Signup a new user
export async function signup(req, res) {
  const { name, email, password } = req.body;

  //  Validate fields
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  if (!validateEmail(email))
    return res.status(400).json({ message: 'Invalid email format' });

  if (!validatePassword(password))
    return res.status(400).json({ message: 'Password must be at least 6 characters' });

  try {
    // Check for existing email
    const existing = await getUserByEmail(email);
    if (existing)
      return res.status(409).json({ message: 'Email already in use' });

    //  Hash password and create user
    const hashed = await hash(password, 10);
    const user = await createUser({ name, email, password: hashed });

    logger.info(`User registered: ${email}`);
    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    logger.error('Signup error:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

//  Login a user
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  try {
    const user = await getUserByEmail(email);
    const match = user && await compare(password, user.password);

    if (!match)
      return res.status(401).json({ message: 'Invalid credentials' });

    //  Generate tokens
    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);

    //  Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    logger.info(`User logged in: ${email}`);

    //  Send user details
    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        created_at: user.created_at
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

//  Logout user
export function logout(req, res) {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  logger.info('User logged out');
  return res.status(200).json({ message: 'Logout successful' });
}

//  Refresh access token
export function refresh(req, res) {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const payload = verify(token, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = signAccessToken(payload.id);

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000
    });

    logger.info(`Access token refreshed for user: ${payload.id}`);
    return res.json({ success: true });
  } catch (err) {
    logger.warn('Invalid refresh token');
    return res.sendStatus(403);
  }
}

//  Get current logged-in user
export function me(req, res) {
  const user = req.user;
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  return res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      created_at: user.created_at,
    },
  });
}
