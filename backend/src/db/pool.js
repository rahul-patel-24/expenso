
import pg from 'pg';
import dotenv from 'dotenv';
import  logger  from '../utils/logger.js';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  logger.error('Unexpected error on connectiong database', err);
  process.exit(-1);
});

export default pool;