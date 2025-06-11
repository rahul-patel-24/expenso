import pool from '../db/pool.js' // your PostgreSQL pool connection

//  Find user by email
export async function getUserByEmail(email) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email])
  return result.rows[0] || null
}

//  Create a new user
export async function createUser({ name, email, password }) {
  const result = await pool.query(
    `INSERT INTO users (name, email, password) 
     VALUES ($1, $2, $3) 
     RETURNING id, name, email, created_at`,
    [name, email, password]
  )
  return result.rows[0]
}

//  Optional: Get user by ID
export async function getUserById(id) {
  const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1 LIMIT 1', [id])
  console.log(result.rows[0])
  return result.rows[0] || null
}
