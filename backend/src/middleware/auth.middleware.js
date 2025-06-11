import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { getUserById } from '../services/user.service.js';
import logger from '../utils/logger.js';

export async function protect(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = verify(token, process.env.JWT_ACCESS_SECRET);
    if (!decoded?.id) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    const user = await getUserById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    logger.warn('JWT verification failed', err);
    res.status(403).json({ message: 'Access token expired or invalid' });
  }
}
